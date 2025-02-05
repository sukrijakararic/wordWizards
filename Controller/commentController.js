const express = require("express");
const commentRouter = express.Router();
const { getCommentsByBlog, createComment } = require("../Model/commentModel");

commentRouter.get("/commentsForBlog", getCommentsByBlog);
commentRouter.post("/createComment", createComment);


module.exports = commentRouter;