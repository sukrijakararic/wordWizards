const express = require("express");
const blogRouter = express.Router();
const { getAllBlogs, getMyBlogs, createBlog, updateBlogPost, deleteBlogPost, giveUpDootBlog, giveDownDootBlog, getBlogsByDoots } = require("../Model/blogModel");

blogRouter.get("/allBlogs", getAllBlogs);
blogRouter.get("/myBlogs", getMyBlogs);
blogRouter.get("/blogsByDoots", getBlogsByDoots);
blogRouter.post("/createBlog", createBlog);
blogRouter.put("/giveUpDootBlog", giveUpDootBlog);
blogRouter.put("/giveDownDootBlog", giveDownDootBlog);
blogRouter.put("/updateBlog", updateBlogPost);
blogRouter.delete("/deleteBlog", deleteBlogPost);

module.exports = blogRouter;