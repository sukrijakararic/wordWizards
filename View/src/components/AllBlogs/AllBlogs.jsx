import React, { useEffect, useContext } from "react";
import styles from "./AllBlogs.module.css";
import { getAllBlogs } from "../../utils/services";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BlogsContext } from "../../context-api/BlogsContext";

export const AllBlogs = () => {
  const { allBlogs, setAllBlogs } = useContext(BlogsContext);

  const fetchAllBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setAllBlogs(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className={styles.allBlogsContainer}>
      {allBlogs.length > 0 ? (
        allBlogs.map((blog) => (
          <Card key={blog.id} style={{ width: "18rem", height: "15rem" }}>
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>UpDoots: {blog.updoots}</Card.Text>
              <Card.Text>Tags: {blog.tags}</Card.Text>
              <Button variant="primary">Read More</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};
