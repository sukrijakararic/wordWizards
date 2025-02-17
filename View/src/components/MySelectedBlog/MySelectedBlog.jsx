import React, { useContext, useState } from "react";
import { MySelectedBlogContext } from "../../context-api/MySelectedBlogContext";
import styles from "./MySelectedBlog.module.css";
import { deleteBlog, updateBlog } from "../../utils/services";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { MyBlogComments } from "../MyBlogComments/MyBlogComments";

export const MySelectedBlog = () => {
  const { mySelectedBlog, setMySelectedBlog } = useContext(MySelectedBlogContext);
  const Navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(mySelectedBlog.content);

  const handleDeleteBlog = async (id, title) => {
    const result = await deleteBlog(id, title);
    console.log(result);
    Navigate("/profile");
  };

  const handleUpdateBlog = async (blog) => {
    const result = await updateBlog(blog);
    Navigate("/profile");
  };

  const handleSaveUpdate = () => {
    const updatedBlog = {
      id: mySelectedBlog.id,
      title: mySelectedBlog.title,
      content: newContent,
    };
    handleUpdateBlog(updatedBlog);
    setIsEditing(false);
  };

  return (
    <div className={styles.mySelectedBlogPage}>
      <div className={styles.editBlog}>
        {isEditing ? (
          <div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Editing blog post:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={20}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleSaveUpdate}>
              Save
            </Button>
          </div>
        ) : (
          <div className={styles.mySelectedBlogContainer}>
            <h1 style={{ color: "#333", textAlign: "center" }}>{mySelectedBlog.title}</h1>
            <h6>By: {mySelectedBlog.username}</h6>
            <h7>Tags: <span style={{ color: "orange", fontWeight: "bold" }}>{(!mySelectedBlog.tags || mySelectedBlog.tags.length === 0) ? 'No tags' : mySelectedBlog.tags.join(', ')}</span></h7>
            <h6>Written on <span style={{ color: "green", fontWeight: "bold" }}>{new Date(mySelectedBlog.created_at).toLocaleDateString()}</span></h6>
            {mySelectedBlog.updoots !== 0 ? <h6><span style={{ color: "dodgerblue", fontWeight: "bold" }}>{mySelectedBlog.updoots} upDoots</span></h6> : <h6 style={{ color: "#666" }}>No upDoots yet</h6>}
            <hr style={{border: "1px solid #333", width: "90%" }}/>
            <p className={styles.mySelectedBlogContent}>{mySelectedBlog.content}</p>
            <div style={{display: "flex", justifyContent: "center", gap: "10px"}}>
            <Button variant="success" onClick={() => setIsEditing(true)}>Edit Blog</Button>
            <Button variant="danger" onClick={() => handleDeleteBlog(mySelectedBlog.id, mySelectedBlog.title) }>Delete Blog</Button>
            </div>
          </div>
        )}
      </div>
      <MyBlogComments />
    </div>
  );
};

