import React, { useContext, useState } from "react";
import { SelectedBlogContext } from "../../context-api/SelectedBlogContext";
import styles from "./SelectedBlog.module.css";
import { giveUpDootBlog, giveDownDootBlog } from "../../utils/services";
import Button from 'react-bootstrap/Button';
import { BlogComments } from "../BlogComments/BlogComments";

export const SelectedBlog = () => {
  const { blog } = useContext(SelectedBlogContext);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteType, setVoteType] = useState(null); // null, 'updoot', 'downdoot'

  const handleBlogUpdoot = async (id) => {
    if (hasVoted && voteType === 'updoot') return;
    try {
      const response = await giveUpDootBlog(id);
      if (response.message === "Please log in to give an updoot") {
        document.getElementById("responseStatus").innerHTML = "please log in to give an upDoot";
        document.getElementById("responseStatus").style.color = "red";
        return;
      }
      setHasVoted(true);
      setVoteType('updoot');
    } catch (error) {
      console.error("Error giving up doot:", error);
    }
  };

  const handleBlogDownDoot = async (id) => {
    if (hasVoted && voteType === 'downdoot') return;
    try {
      const response = await giveDownDootBlog(id);
      if (response.message === "Please log in to give a downDoot") {
        document.getElementById("responseStatus").innerHTML = response.message;
        document.getElementById("responseStatus").style.color = "red";
        return;
      }
      setHasVoted(true);
      setVoteType('downdoot');
    } catch (error) {
      console.error("Error giving down doot:", error);
    }
  };

  return (
    <div className={styles.selectedBlogPage}>
      <div className={styles.selectedBlogContainer}>
        <h1 style={{ color: "#333", textAlign: "center" }}>{blog.title}</h1>
        <h6>By: {blog.username}</h6>
        <h7>Tags: <span style={{ color: "orange", fontWeight: "bold" }}>{(!blog.tags || blog.tags.length === 0) ? 'No tags' : blog.tags.join(', ')}</span></h7>
        <h6>Written on <span style={{ color: "green", fontWeight: "bold" }}>{new Date(blog.created_at).toLocaleDateString()}</span></h6>
        {blog.updoots !== 0 ? <h6><span style={{ color: "dodgerblue", fontWeight: "bold" }}>{blog.updoots} upDoots</span></h6> : <h6 style={{ color: "#666" }}>No upDoots yet</h6>}
        <hr style={{border: "1px solid #333", width: "90%" }}/>
        <p className={styles.selectedBlogContent}>{blog.content}</p>
        <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
        <Button variant="success" onClick={() => handleBlogUpdoot(blog.id)} disabled={hasVoted && voteType === 'updoot'}>Give upDoot</Button>
        <Button variant="danger" onClick={() => handleBlogDownDoot(blog.id)} disabled={hasVoted && voteType === 'downdoot'}>Give downDoot</Button>
        </div>
        <h6 id="responseStatus"></h6>
      </div>
      <BlogComments />
    </div>
  );
};

