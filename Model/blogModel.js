const db = require("../DB/pool");

const getBlogs = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM posts");
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { getBlogs };