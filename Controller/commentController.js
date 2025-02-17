const express = require("express");
const commentRouter = express.Router();
const { getCommentsByBlog, createComment, getMyComments, sortCommentsByCreated, commentUpDoot, commentDownDoot, editComment, deleteComment } = require("../Model/commentModel");

commentRouter.post("/commentsForBlog", getCommentsByBlog); //done
commentRouter.get("/myComments", getMyComments);
commentRouter.post("/commentsByCreated", sortCommentsByCreated);
commentRouter.put("/commentUpDoot", commentUpDoot); //done
commentRouter.put("/commentDownDoot", commentDownDoot); //done
commentRouter.post("/createComment", createComment); //done
commentRouter.put("/editComment", editComment);
commentRouter.delete("/deleteComment", deleteComment);


module.exports = commentRouter;