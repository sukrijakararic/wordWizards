const express = require("express");
const blogRouter = express.Router();
const { getBlogs } = require("../Model/blogModel");

blogRouter.get("/allBlogs", getBlogs);

module.exports = blogRouter;