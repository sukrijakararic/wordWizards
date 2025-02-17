import React, { useEffect, useState } from 'react';
import styles from "./MyComments.module.css";
import { getMyComments } from '../../utils/services';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { upDootComment, downDootComment } from "../../utils/services";

export const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [commentUpDoot, setCommentUpDoot] = useState({});
  const [commentDownDoot, setCommentDownDoot] = useState({});

  const handleMyComments = async () => {
    try {
      const comments = await getMyComments();
      setComments(comments);
      console.log(comments)
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleUpDootComment = async (comment_id) => {
    try {
      const response = await upDootComment(comment_id);
      if (response.message === "Please log in to upDoot a comment") {
        document.getElementById("responseStatusCommentDoot").innerHTML =
          "please log in to upDoot a comment";
        document.getElementById("responseStatusCommentDoot").style.color = "red";
        return;
      }
      setCommentUpDoot((prev) => ({ ...prev, [comment_id]: true }));
      setCommentDownDoot((prev) => ({ ...prev, [comment_id]: false }));
      handleMyComments();
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
        document.getElementById("responseStatusCommentDoot").style.color = "red";
        return;
      }
      setCommentDownDoot((prev) => ({ ...prev, [comment_id]: true }));
      setCommentUpDoot((prev) => ({ ...prev, [comment_id]: false }));
      handleMyComments();
    } catch (error) {
      console.error("Error down dooting comment:", error);
    }
  };

  useEffect(() => {
    handleMyComments();
  }, []);

  return (
    <div>
      {comments.message === "No comments found" ? (
        <h1 style={{ textAlign: "center" }}>No comments yet</h1>
      ) : (
        comments.map((comment) => (
          <Card style={{ width: "18rem", margin: "1rem" }} key={comment.id}>
            <Card.Body>
              <Card.Text>- {comment.content}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                {comment.username}
              </Card.Subtitle>
              <Card.Subtitle
                style={{ marginLeft: "5px" }}
                className="mb-2 text-muted"
              >
                {comment.updoots ? "upDoots: " + comment.updoots : "no upDoots yet"}
              </Card.Subtitle>
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
}

