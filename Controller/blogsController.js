const express = require("express");
const blogRouter = express.Router();
const {
  getAllBlogs,
  getBlogById,
  getMyBlogs,
  createBlog,
  updateBlogPost,
  deleteBlogPost,
  giveUpDootBlog,
  giveDownDootBlog,
  getBlogsByDoots,
  // addTagToBlog,
  getBlogsByTagsOrderedByDoots,
  //getBlogsByTagsOrderedByCreated,
} = require("../Model/blogModel");

blogRouter.get("/allBlogs", getAllBlogs);
blogRouter.post("/blogById", getBlogById);
blogRouter.get("/myBlogs", getMyBlogs);
blogRouter.get("/blogsByDoots", getBlogsByDoots);
// blogRouter.get("/blogsByTagsCreated", getBlogsByTagsOrderedByCreated);
blogRouter.post("/blogsByTagsDoots", getBlogsByTagsOrderedByDoots);
blogRouter.post("/createBlog", createBlog);
blogRouter.put("/giveUpDootBlog", giveUpDootBlog);
blogRouter.put("/giveDownDootBlog", giveDownDootBlog);
blogRouter.put("/updateBlog", updateBlogPost);
//blogRouter.put("/addTagToBlog", addTagToBlog);
blogRouter.delete("/deleteBlog", deleteBlogPost);

module.exports = blogRouter;

