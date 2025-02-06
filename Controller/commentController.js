const express = require("express");
const commentRouter = express.Router();
const { getCommentsByBlog, createComment, getMyComments, sortCommentsByCreated, commentUpDoot, commentDownDoot, editComment, deleteComment } = require("../Model/commentModel");

commentRouter.get("/commentsForBlog", getCommentsByBlog);
commentRouter.get("/myComments", getMyComments);
commentRouter.get("/commentsByCreated", sortCommentsByCreated);
commentRouter.put("/commentUpDoot", commentUpDoot)
commentRouter.put("/commentDownDoot", commentDownDoot)
commentRouter.post("/createComment", createComment);
commentRouter.put("/editComment", editComment);
commentRouter.delete("/deleteComment", deleteComment);


module.exports = commentRouter;