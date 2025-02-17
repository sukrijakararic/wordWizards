import React, { useEffect, useContext } from "react";
import styles from "./AllBlogs.module.css";
import { getAllBlogs } from "../../utils/services";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BlogsContext } from "../../context-api/BlogsContext";
import { SelectedBlogContext } from "../../context-api/SelectedBlogContext";
import { useNavigate } from "react-router-dom";
import { BlogSort } from "../BlogSort/BlogSort";

export const AllBlogs = () => {
  const { allBlogs, setAllBlogs } = useContext(BlogsContext);
  const {setBlog } = useContext(SelectedBlogContext);
  const Navigate = useNavigate();

  const handleBlogSet = (blog) => {
    setBlog(blog);
    Navigate("/selectedBlog");
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setAllBlogs(response);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className={styles.allBlogsPage}>
    <BlogSort />
    <div className={styles.allBlogsContainer}>
      {allBlogs.length > 0 ? (
        allBlogs.map((blog) => (
          <Card className={styles.blogCard} key={blog.id}>
            <Card.Body>
              <Card.Title style={{ }}>{blog.title}</Card.Title>
              <Card.Text >By <span style={{ color: "green", fontWeight: "bold" }}>{blog.username}</span></Card.Text>
              <Card.Text>{blog.updoots !== 0 ? <h6><span style={{ color: "dodgerblue", fontWeight: "bold" }}>{blog.updoots} upDoots</span></h6> : <h6 style={{ color: "#666" }}>No upDoots yet</h6>}</Card.Text>
              <Card.Text>Tags: <span style={{ color: "orange", fontWeight: "bold" }}>
                {(!blog.tags || blog.tags.length === 0) ? 'No tags' : blog.tags.join(', ')}
                </span>
                </Card.Text>
              <Button variant="success" onClick={() => handleBlogSet(blog)}>Read More</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
    </div>
  );
};

