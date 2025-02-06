const express = require("express");
const commentRouter = express.Router();
const { getCommentsByBlog, createComment, getMyComments } = require("../Model/commentModel");

commentRouter.get("/commentsForBlog", getCommentsByBlog);
commentRouter.get("/myComments", getMyComments);
commentRouter.post("/createComment", createComment);


module.exports = commentRouter;