const DB = require("../DB/pool");

const getCommentsByBlog = async (req, res) => {
    const { blog_id } = req.body;
    console.log(blog_id);
    try {
        const result = await DB.query("SELECT * FROM comments WHERE post_id = $1", [blog_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No comments found" });
            return;
        }
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

const createComment = async (req, res) => {
    const { id } = req.user;
    const { content, blog_id } = req.body;
    try {
        const result = await DB.query("INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *", [content, id, blog_id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getCommentsByBlog,
    createComment,
}