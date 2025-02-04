const express = require("express");
const blogRouter = express.Router();
const { getAllBlogs, getMyBlogs, createBlog, updateBlogPost, deleteBlogPost, giveUpDootBlog, giveDownDootBlog } = require("../Model/blogModel");

blogRouter.get("/allBlogs", getAllBlogs);
blogRouter.get("/myBlogs", getMyBlogs);
blogRouter.post("/createBlog", createBlog);
blogRouter.put("/giveUpDoot", giveUpDootBlog);
blogRouter.put("/giveDownDoot", giveDownDootBlog);
blogRouter.put("/updateBlog", updateBlogPost);
blogRouter.delete("/deleteBlog", deleteBlogPost);

module.exports = blogRouter;