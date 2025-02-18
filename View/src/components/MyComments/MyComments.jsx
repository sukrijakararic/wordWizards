import React, { useEffect, useState, useContext } from "react";
import styles from "./MyComments.module.css";
import { getMyComments, deleteComment, getBlogById } from "../../utils/services";
import Card from "react-bootstrap/Card";
import { upDootComment, downDootComment } from "../../utils/services";
import CloseButton from 'react-bootstrap/CloseButton';
import { SelectedBlogContext } from "../../context-api/SelectedBlogContext";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [commentUpDoot, setCommentUpDoot] = useState({});
  const [commentDownDoot, setCommentDownDoot] = useState({});
  const {setBlog } = useContext(SelectedBlogContext);
  const Navigate = useNavigate();

  const handleMyComments = async () => {
    try {
      const comments = await getMyComments();
      setComments(comments);
      console.log(comments);
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
        document.getElementById("responseStatusCommentDoot").style.color =
          "red";
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
        document.getElementById("responseStatusCommentDoot").style.color =
          "red";
        return;
      }
      setCommentDownDoot((prev) => ({ ...prev, [comment_id]: true }));
      setCommentUpDoot((prev) => ({ ...prev, [comment_id]: false }));
      handleMyComments();
    } catch (error) {
      console.error("Error down dooting comment:", error);
    }
  };

  const handleDeleteComment = async (comment_id) => {
    try {
      const response = await deleteComment(comment_id);
      if (response.message === "Please log in to delete a comment") {
        document.getElementById("responseStatusCommentDoot").innerHTML =
          "please log in to delete a comment";
        document.getElementById("responseStatusCommentDoot").style.color =
          "red";
        return;
      }
      handleMyComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSelectBlog = async (blog_id) => {
    try {
      const blog = await getBlogById(blog_id);
      setBlog(blog);
      Navigate("/selectedBlog");
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    handleMyComments();
  }, []);

  return (
    <div className={styles.myCommentsContainer}>
      {comments.message === "No comments found" ? (
        <h1 style={{ textAlign: "center" }}>No comments yet</h1>
      ) : (
        comments.map((comment) => (
          <Card key={comment.id} className={styles.myCommentCard}>
            <Card.Body>
              <Card.Title onClick={() => handleSelectBlog(comment.blog_id)} className={styles.myCommentTitle}>{comment.title}</Card.Title>
              <Card.Text>"{comment.content}"</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                - {comment.username}
              </Card.Subtitle>
              <Card.Subtitle
                style={{ marginLeft: "5px" }}
                className="mb-2 text-muted"
              >
                - {comment.updoots
                  ? "upDoots: " + comment.updoots
                  : "no upDoots yet"}
              </Card.Subtitle>
              <div className={styles.voteContainer}>
                <div>
              <img
                className={styles.voteIcon}
                alt="likeIcon"
                src="/likeicon.webp"
                onClick={(e) => {
                  if (!commentUpDoot[comment.id]) {
                    handleUpDootComment(comment.id);
                    e.currentTarget.style.pointerEvents = "none";
                    e.currentTarget.nextElementSibling.style.pointerEvents =
                      "auto";
                  }
                }}
              />
              <img
                className={styles.voteIcon}
                alt="likeIcon"
                src="/dislikev2.webp"
                onClick={(e) => {
                  if (!commentDownDoot[comment.id]) {
                    handleDownDootComment(comment.id);
                    e.currentTarget.style.pointerEvents = "none";
                    e.currentTarget.previousElementSibling.style.pointerEvents =
                      "auto";
                  }
                }}
              />
              </div>
              <div>
              <Button style={{marginRight: "1rem"}} variant="info">Edit</Button>
                <CloseButton onClick={() => handleDeleteComment(comment.id)}/>
                </div>
                </div>
              <h6 id="responseStatusCommentDoot"></h6>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};
