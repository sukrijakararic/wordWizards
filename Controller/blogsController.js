const express = require("express");
const blogRouter = express.Router();
const { getBlogs, createBlog } = require("../Model/blogModel");

blogRouter.get("/allBlogs", getBlogs);
blogRouter.post("/createBlog", createBlog);

module.exports = blogRouter;