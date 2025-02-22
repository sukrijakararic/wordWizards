import React, { useEffect, useState, useContext } from "react";
import {
  getBlogComments,
  createComment,
  upDootComment,
  downDootComment,
  mostRecentComments,
} from "../../utils/services";
import { MySelectedBlogContext } from "../../context-api/MySelectedBlogContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./MyBlogComments.module.css";
import { BlogCommentsContext } from "../../context-api/BlogCommentsContext";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export const MyBlogComments = () => {
  const { mySelectedBlog } = useContext(MySelectedBlogContext);
  const { blogComments, setBlogComments } = useContext(BlogCommentsContext);
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentUpDoot, setCommentUpDoot] = useState({});
  const [commentDownDoot, setCommentDownDoot] = useState({});
  const [commmentSort, setCommmentSort] = useState("mostDooted");

  const fetchComments = async () => {
    try {
      const comments = await getBlogComments(mySelectedBlog.id);
      setBlogComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleMostRecentComments = async () => {
    try {
      const comments = await mostRecentComments(mySelectedBlog.id);
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
        blog_id: mySelectedBlog.id,
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
      if (commmentSort === "mostDooted") {
        fetchComments();
      } else if (commmentSort === "mostRecent") {
        handleMostRecentComments();
      }
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
      if (commmentSort === "mostDooted") {
        fetchComments();
      } else if (commmentSort === "mostRecent") {
        handleMostRecentComments();
      }
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
      if (commmentSort === "mostDooted") {
        fetchComments();
      } else if (commmentSort === "mostRecent") {
        handleMostRecentComments();
      }
    } catch (error) {
      console.error("Error down dooting comment:", error);
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.addComment}>
        <h2>Comments</h2>
        <Tabs
          defaultActiveKey="doots"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(key) => {
            if (key === "doots") {
              setCommmentSort("mostDooted");
              fetchComments();
            } else if (key === "recent") {
              setCommmentSort("mostRecent");
              handleMostRecentComments();
            }
          }}
        >
          <Tab eventKey="doots" title="Most dooted">
            Sorting comments by doots
          </Tab>
          <Tab eventKey="recent" title="Most recent">
            Sorting comments by most recent
          </Tab>
        </Tabs>
        <Button
          style={{ margin: "10px" }}
          variant="primary"
          onClick={() => setIsCommenting(true)}
        >
          Add Comment
        </Button>
        <h6 id="responseStatusCommentDoot"></h6>
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
                maxLength={300}
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
              <Card.Text>{comment.content}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">
                - {comment.username}
              </Card.Subtitle>
              <Card.Subtitle
                style={{ marginLeft: "5px" }}
                className="mb-2 text-muted"
              > - {comment.updoots
                  ? "upDoots: " + comment.updoots
                  : "no upDoots yet"}
              </Card.Subtitle>
              <img 
                className={styles.voteIcon}
                alt="likeIcon"
                src='/likeicon.webp'
                onClick={(e) => {
                  if (!commentUpDoot[comment.id]) {
                    handleUpDootComment(comment.id);
                    e.currentTarget.style.pointerEvents = 'none';
                    e.currentTarget.nextElementSibling.style.pointerEvents = 'auto';
                  }
                }}
              />
              <img 
                className={styles.voteIcon}
                alt="likeIcon"
                src='/dislikev2.webp'
                onClick={(e) => {
                  if (!commentDownDoot[comment.id]) {
                    handleDownDootComment(comment.id);
                    e.currentTarget.style.pointerEvents = 'none';
                    e.currentTarget.previousElementSibling.style.pointerEvents = 'auto';
                  }
                }}
              />
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};
