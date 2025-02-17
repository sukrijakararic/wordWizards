import React, { useEffect, useState, useContext } from "react";
import { getBlogComments, createComment } from "../../utils/services";
import { SelectedBlogContext } from "../../context-api/SelectedBlogContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./BlogComments.module.css";
import { BlogCommentsContext } from "../../context-api/BlogCommentsContext";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const BlogComments = () => {
  const { blog } = useContext(SelectedBlogContext);
  const { blogComments, setBlogComments } = useContext(BlogCommentsContext);
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const Navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const comments = await getBlogComments(blog.id);
      setBlogComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCreateComment = async () => {
    if (!newComment) return;
    try {
      const comment = {
        content: newComment,
        blog_id: blog.id,
      };
      const response = await createComment(comment);
      setIsCommenting(false);
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.addComment}>
        <h2>Comments</h2>
        <Button variant="success" onClick={() => setIsCommenting(true)}>
          Add Comment
        </Button>
      </div>
      <hr></hr>
      {isCommenting && (
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Add your comment:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newComment}
                placeholder="I love this blog!"
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleCreateComment}>
            Save
          </Button>
        </div>
      )}
      {!blogComments.length ? (
        <p>No comments yet</p>
      ) : (
        blogComments.map((comment) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body key={comment.id}>
              <Card.Text>{comment.content}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.username}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.updoots
                  ? "upDoots" + comment.updoots
                  : "no updoots yet"}
              </Card.Subtitle>
              <Card.Link></Card.Link>
              <Button
                style={{ marginRight: "10px", padding: "5px" }}
                variant="success"
              >
                upDoot
              </Button>
              <Button style={{ padding: "5px" }} variant="danger">
                downDoot
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};
