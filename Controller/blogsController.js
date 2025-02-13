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
  //getBlogsByTagsOrderedByCreated,
} = require("../Model/blogModel");

blogRouter.get("/allBlogs", getAllBlogs); //done
blogRouter.get("/myBlogs", getMyBlogs); //done
blogRouter.get("/blogsByDoots", getBlogsByDoots); //done
// blogRouter.get("/blogsByTagsCreated", getBlogsByTagsOrderedByCreated);
blogRouter.post("/blogsByTagsDoots", getBlogsByTagsOrderedByDoots); //done
blogRouter.post("/createBlog", createBlog); //done
blogRouter.put("/giveUpDootBlog", giveUpDootBlog); // done
blogRouter.put("/giveDownDootBlog", giveDownDootBlog); //done
blogRouter.put("/updateBlog", updateBlogPost);
//blogRouter.put("/addTagToBlog", addTagToBlog);
blogRouter.delete("/deleteBlog", deleteBlogPost);

module.exports = blogRouter;
