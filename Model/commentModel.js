const DB = require("../DB/pool");

const getCommentsByBlog = async (req, res) => {
    const { blog_id } = req.body;
    if (!blog_id) {
        res.status(400).json({ message: "Please provide a blog_id" });
        return;
    }
    try {
        const result = await DB.query("SELECT comments.*, username, title FROM comments inner join users on comments.user_id = users.id inner join blogs on comments.blog_id = blogs.id WHERE blog_id = $1 ORDER BY comments.updoots DESC", [blog_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No comments found" });
            return;
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

const getMyComments = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Please log in to view your comments" });
        return;
    }
    const { id } = req.user;
    try {
        const result = await DB.query("SELECT comments.*, title, username FROM comments inner join blogs on comments.blog_id = blogs.id inner join users on comments.user_id = users.id WHERE comments.user_id = $1 ORDER BY comments.updoots DESC", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No comments found" });
            return;
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

const sortCommentsByCreated = async (req, res) => {
    const { blog_id } = req.body;
    if (!blog_id) {
        res.status(400).json({ message: "Please provide a blog_id" });
        return;
    }
    try {
        const result = await DB.query("SELECT comments.*, username FROM comments inner join users on comments.user_id = users.id WHERE blog_id = $1 ORDER BY comments.created_at DESC", [blog_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No comments found" });
            return;
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

const commentUpDoot = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Please log in to doot a comment" });
        return;
    }
    const { id } = req.user;
    const { comment_id } = req.body;
    if (!comment_id) {
        res.status(400).json({ message: "Please provide a comment_id" });
        return;
    }
    try {
        const result = await DB.query("UPDATE comments SET updoots = updoots + 1 WHERE id = $1 RETURNING *", [comment_id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

const createComment = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Please log in to create a comment" });
        return;
    }
    const { id } = req.user;
    const { content, blog_id } = req.body;
    if (!content || !blog_id) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const result = await DB.query("INSERT INTO comments (content, user_id, blog_id) VALUES ($1, $2, $3) RETURNING *", [content, id, blog_id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err, "Error creating comment");
    }
};

module.exports = {
    getCommentsByBlog,
    createComment,
    getMyComments,
    sortCommentsByCreated,
    commentUpDoot
}