const db = require("../DB/pool");
const { getUserByEmail } = require("../Model/userModel");

const getBlogs = async (req, res) => {
    try {
        const result = await db.query("SELECT posts.*, users.username FROM posts inner join users on posts.user_id = users.id");
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

const createBlog = async (req, res) => {
    const { title, content } = req.body;
    const { email } = req.user;
    if (!req.user) {
        res.status(401).json({ message: "Please log in to create a blog post" });
        return;
    }
    if (!title || !content) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const user = await getUserByEmail(email);
        const result = await db.query(
            "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
            [title, content, user.id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getBlogs, createBlog };