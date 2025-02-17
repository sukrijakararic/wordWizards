import React, { useEffect, useState, useContext } from "react";
import {
  getBlogComments,
  createComment,
  upDootComment,
  downDootComment,
} from "../../utils/services";
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
  const [commentUpDoot, setCommentUpDoot] = useState({});
  const [commentDownDoot, setCommentDownDoot] = useState({});
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
    if (!newComment) {
      document.getElementById("responseStatusComment").innerHTML =
        "Comment cannot be empty";
      document.getElementById("responseStatusComment").style.color = "red";
      return;
    }
    try {
      const comment = {
        content: newComment,
        blog_id: blog.id,
      };
      const response = await createComment(comment);
      if (response.message === "Please log in to create a comment") {
        document.getElementById("responseStatusComment").innerHTML =
          "please log in to comment";
        document.getElementById("responseStatusComment").style.color = "red";
        return;
      }
      setIsCommenting(false);
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleUpDootComment = async (comment_id) => {
    try {
      const response = await upDootComment(comment_id);
      if (response.message === "Please log in to upDoot a comment") {
        document.getElementById("responseStatusCommentDoot").innerHTML =
          "please log in to upDoot a comment";
        document.getElementById("responseStatusCommentDoot").style.color =
          "red";
        return;
      }
      setCommentUpDoot((prev) => ({ ...prev, [comment_id]: true }));
      setCommentDownDoot((prev) => ({ ...prev, [comment_id]: false }));
      fetchComments();
    } catch (error) {
      console.error("Error up dooting comment:", error);
    }
  };

  const handleDownDootComment = async (comment_id) => {
    try {
      const response = await downDootComment(comment_id);
      if (response.message === "Please log in to downDoot a comment") {
        document.getElementById("responseStatusCommentDoot").innerHTML =
          "please log in to downDoot a comment";
        document.getElementById("responseStatusCommentDoot").style.color =
          "red";
        return;
      }
      setCommentDownDoot((prev) => ({ ...prev, [comment_id]: true }));
      setCommentUpDoot((prev) => ({ ...prev, [comment_id]: false }));
      fetchComments();
    } catch (error) {
      console.error("Error down dooting comment:", error);
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.addComment}>
        <h2>Comments</h2>
        <Button variant="primary" onClick={() => setIsCommenting(true)}>
          Add Comment
        </Button>
      </div>
      <hr></hr>
      {isCommenting && (
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Add your comment:</Form.Label>
              <h6 id="responseStatusComment"></h6>
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
          <Card style={{ width: "18rem", margin: "1rem" }}>
            <Card.Body key={comment.id}>
              <Card.Text>- {comment.content}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.username}
              </Card.Subtitle>
              <Card.Subtitle
                style={{ marginLeft: "5px" }}
                className="mb-2 text-muted"
              >
                {comment.updoots
                  ? "upDoots: " + comment.updoots
                  : "no upDoots yet"}
              </Card.Subtitle>
              <Card.Link></Card.Link>
              <Button
                style={{ marginRight: "10px", padding: "5px" }}
                variant="success"
                onClick={() => handleUpDootComment(comment.id)}
                disabled={commentUpDoot[comment.id]}
              >
                upDoot
              </Button>
              <Button
                style={{ padding: "5px" }}
                variant="danger"
                onClick={() => handleDownDootComment(comment.id)}
                disabled={commentDownDoot[comment.id]}
              >
                downDoot
              </Button>
              <h6 id="responseStatusCommentDoot"></h6>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

