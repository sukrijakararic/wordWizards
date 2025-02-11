const express = require("express");
const blogRouter = express.Router();
const {
  getAllBlogs,
  getMyBlogs,
  createBlog,
  updateBlogPost,
  deleteBlogPost,
  giveUpDootBlog,
  giveDownDootBlog,
  getBlogsByDoots,
  // addTagToBlog,
  getBlogsByTagsOrderedByDoots,
  getBlogsByTagsOrderedByCreated,
} = require("../Model/blogModel");

blogRouter.get("/allBlogs", getAllBlogs); //done
blogRouter.get("/myBlogs", getMyBlogs);
blogRouter.get("/blogsByDoots", getBlogsByDoots);
blogRouter.get("/blogsByTagsDoots", getBlogsByTagsOrderedByDoots);
blogRouter.get("/blogsByTagsCreated", getBlogsByTagsOrderedByCreated);
blogRouter.post("/createBlog", createBlog); //done
blogRouter.put("/giveUpDootBlog", giveUpDootBlog);
blogRouter.put("/giveDownDootBlog", giveDownDootBlog);
blogRouter.put("/updateBlog", updateBlogPost);
//blogRouter.put("/addTagToBlog", addTagToBlog);
blogRouter.delete("/deleteBlog", deleteBlogPost);

module.exports = blogRouter;
