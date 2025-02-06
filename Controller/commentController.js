const express = require("express");
const commentRouter = express.Router();
const { getCommentsByBlog, createComment, getMyComments, sortCommentsByCreated, commentUpDoot } = require("../Model/commentModel");

commentRouter.get("/commentsForBlog", getCommentsByBlog);
commentRouter.get("/myComments", getMyComments);
commentRouter.get("/commentsByCreated", sortCommentsByCreated);
commentRouter.put("/commentUpDoot", commentUpDoot)
commentRouter.post("/createComment", createComment);


module.exports = commentRouter;