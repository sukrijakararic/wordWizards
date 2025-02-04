const db = require("../DB/pool");
const { getUserByEmail } = require("../Model/userModel");

const getAllBlogs = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT posts.*, users.username FROM posts inner join users on posts.user_id = users.id"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const getMyBlogs = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in to view your blog posts" });
    return;
  }
  const { id } = req.user;
  try {
    const result = await db.query(
      "SELECT posts.*, users.username FROM posts inner join users on posts.user_id = users.id WHERE posts.user_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "No blog posts found" });
      return;
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  if (!req.user) {
    res.status(401).json({ message: "Please log in to create a blog post" });
    return;
  }
  const { email, id } = req.user;
  if (!title || !content) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    const titleCheck = await db.query(
      "SELECT * FROM posts WHERE title = $1 AND user_id = $2",
      [title, id]
    );
    if (titleCheck.rows.length > 0) {
      res
        .status(400)
        .json({ message: "You already have a blog post with that title" });
      return;
    }
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

const updateBlogPost = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in to update a blog post" });
    return;
  }
  const { id } = req.user;
  const { title, content } = req.body;
  try {
    const titleCheck = await db.query(
      "SELECT * FROM posts WHERE title = $1 AND user_id = $2",
      [title, id]
    );
    if (titleCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const blogId = titleCheck.rows[0].id;

    const result = await db.query(
      "UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE user_id = $3 AND id = $4 RETURNING *",
      [title, content, id, blogId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const deleteBlogPost = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in to delete a blog post" });
    return;
  }
  const { id } = req.user;
  const { title } = req.body;
  try {
    const titleCheck = await db.query(
      "SELECT * FROM posts WHERE title = $1 AND user_id = $2",
      [title, id]
    );
    if (titleCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const result = await db.query(
      "DELETE FROM posts WHERE title = $1 AND user_id = $2 RETURNING *",
      [title, id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const giveUpDoot = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in to give an updoot" });
    return;
  }
  const { id } = req.body;
  try {
    const postCheck = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (postCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const result = await db.query(
      "UPDATE posts SET updoots = updoots + 1 WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllBlogs,
  getMyBlogs,
  createBlog,
  updateBlogPost,
  deleteBlogPost,
  giveUpDoot,
};
