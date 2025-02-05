const db = require("../DB/pool");
const { getUserByEmail } = require("../Model/userModel");

const getAllBlogs = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT blogs.*, users.username FROM blogs inner join users on blogs.user_id = users.id order by blogs.created_at desc"
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
      "SELECT blogs.*, users.username FROM blogs inner join users on blogs.user_id = users.id WHERE blogs.user_id = $1",
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

const getBlogsByDoots = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT blogs.*, users.username FROM blogs inner join users on blogs.user_id = users.id ORDER BY updoots DESC"
    );
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
      "SELECT * FROM blogs WHERE title = $1 AND user_id = $2",
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
      "INSERT INTO blogs (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
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
      "SELECT * FROM blogs WHERE title = $1 AND user_id = $2",
      [title, id]
    );
    if (titleCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const blogId = titleCheck.rows[0].id;

    const result = await db.query(
      "UPDATE blogs SET title = $1, content = $2, updated_at = NOW() WHERE user_id = $3 AND id = $4 RETURNING *",
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
      "SELECT * FROM blogs WHERE title = $1 AND user_id = $2",
      [title, id]
    );
    if (titleCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const result = await db.query(
      "DELETE FROM blogs WHERE title = $1 AND user_id = $2 RETURNING *",
      [title, id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const giveUpDootBlog = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in to give an updoot" });
    return;
  }
  const { id } = req.body;
  try {
    const postCheck = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
    if (postCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const result = await db.query(
      "UPDATE blogs SET updoots = updoots + 1 WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const giveDownDootBlog = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in to give an updoot" });
    return;
  }
  const { id } = req.body;
  try {
    const postCheck = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
    if (postCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const result = await db.query(
      "UPDATE blogs SET updoots = updoots - 1 WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};


// In the request body for tags, be sure to use curly braces to surround the tags in the JSON. For ex, {tags: "{tag1", "tag2}"}
const addTagToBlog = async (req, res) => {
  if (!req.user) { 
    res.status(401).json({ message: "Please log in to add a tag" });
    return;
  }
  const { id, tags } = req.body;
  try {
    const postCheck = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);
    if (postCheck.rows.length === 0) {
      res.status(404).json({ message: "Blog post not found, check spelling." });
      return;
    }

    const result = await db.query(
      "UPDATE blogs SET tags = $1 WHERE id = $2 RETURNING *",
      [tags, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "There are no blogs with those tags." });
      return;
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const getBlogsByTagsOrderedByDoots = async (req, res) => {
  const { tags } = req.body;
  console.log(tags);
  try {
    const result = await db.query(
      "SELECT blogs.*, users.username FROM blogs inner join users on blogs.user_id = users.id WHERE $1 = ANY(blogs.tags) ORDER BY blogs.updoots DESC",
      [tags]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "There are no blogs with those tags." });
      return;
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

const getBlogsByTagsOrderedByCreated = async (req, res) => {
  const { tags } = req.body;
  console.log(tags);
  try {
    const result = await db.query(
      "SELECT blogs.*, users.username FROM postblogs inner join users on blogs.user_id = users.id WHERE $1 = ANY(blogs.tags) ORDER BY blogs.created_at DESC",
      [tags]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "There are no blogs with those tags." });
      return;
    }
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllBlogs,
  getMyBlogs,
  getBlogsByDoots,
  createBlog,
  updateBlogPost,
  deleteBlogPost,
  giveUpDootBlog,
  giveDownDootBlog,
  addTagToBlog,
  getBlogsByTagsOrderedByDoots,
  getBlogsByTagsOrderedByCreated,
};
