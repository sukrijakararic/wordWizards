import React, { useEffect, useContext } from "react";
import { getMyBlogs } from "../../utils/services";
import { MyBlogsContext } from "../../context-api/MyBlogsContext";
import styles from "./MyBlogs.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MySelectedBlogContext } from "../../context-api/MySelectedBlogContext";
import { useNavigate } from "react-router-dom";


export const MyBlogs = () => {
  const { myBlogs, setMyBlogs } = useContext(MyBlogsContext);
const Navigate = useNavigate();
  const { setMySelectedBlog } = useContext(MySelectedBlogContext);

  const handleMyBlogs = async () => {
    try {
      const response = await getMyBlogs();
      setMyBlogs(response);
    } catch (error) {
      console.error("Error getting my blogs:", error);
    }
  };

  const handleBlogSet = (blog) => {
    setMySelectedBlog(blog);
    Navigate("/MySelectedBlog");
  };


  useEffect(() => {
    handleMyBlogs();
  }, []);

  return (
  
    <div className={styles.myBlogsContainer}>
      {myBlogs.length > 0 ? (
        myBlogs.map((blog) => (
          <Card style={{ width: '18rem' }} key={blog.id} className={styles.myBlogCard}>
          <Card.Body>
            <Card.Title className={styles.myBlogTitle}>{blog.title}</Card.Title>
            <Card.Text className={styles.myBlogAuthor}>{blog.username}</Card.Text>
            <Card.Text>{blog.updoots !== 0 ? <h6><span style={{ color: "dodgerblue", fontWeight: "bold" }}>{blog.updoots} Updoots</span></h6> : <h6 style={{ color: "#666" }}>No Updoots yet</h6>}</Card.Text>
            <Card.Text>Tags: <span className={styles.myBlogTags}>{(!blog.tags || blog.tags.length === 0) ? 'No tags' : blog.tags.join(', ')}</span></Card.Text>

            <Button variant="primary" onClick={() => handleBlogSet(blog)}>View your blog</Button>
          </Card.Body>
        </Card>
        ))
      ) : (
        <p>No blogs found.</p>
      )}    
    </div>
  )
};
