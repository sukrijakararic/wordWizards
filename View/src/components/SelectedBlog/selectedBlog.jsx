import React, { useContext } from "react";
import { SelectedBlogContext } from "../../context-api/SelectedBlogContext";
import styles from "./SelectedBlog.module.css";
import { giveUpDootBlog, giveDownDootBlog } from "../../utils/services";

export const SelectedBlog = () => {
  const { blog } = useContext(SelectedBlogContext);

  const handleBlogUpdoot = async (id) => {
    try {
      
      const response = await giveUpDootBlog(id);
      
    } catch (error) {
      console.error("Error giving up doot:", error);
    }
  };

  const handleBlogDownDoot = async (id) => {  
    try {
      
      const response = await giveDownDootBlog(id);
    
    } catch (error) {
      console.error("Error giving down doot:", error);
    }
  }


  return (
    <div className={styles.selectedBlogPage}>
      <div className={styles.selectedBlogContainer}>
      <h1 style={{ color: "#333", textAlign: "center" }}>{blog.title}</h1>
      <h6>By: {blog.username}</h6>
      <h7>tags - <span style={{ color: "orange", fontWeight: "bold" }}>{blog.tags ? blog.tags.join(', ') : 'No tags'}</span></h7>
      <h6>Written on <span style={{ color: "green", fontWeight: "bold" }}> {new Date(blog.created_at).toLocaleDateString()}</span></h6>
      {blog.updoots !== 0 ? <h6><span style={{ color: "dodgerblue", fontWeight: "bold" }}>{blog.updoots} Updoots</span></h6> : <h6 style={{ color: "#666" }}>No Updoots yet</h6>}
      <hr style={{border: "1px solid #333", width: "90%" }}/>
      
      <p style={{textAlign: "center", width: "80%", margin: "0 auto"}}>{blog.content}</p>
      <button onClick={() => handleBlogUpdoot(blog.id)}>Give Up Doot</button>
      <button onClick={() => handleBlogDownDoot(blog.id)}>Give Down Doot</button>
      </div>
    </div>
  );
};
