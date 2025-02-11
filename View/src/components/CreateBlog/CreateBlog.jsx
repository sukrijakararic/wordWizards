import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./CreateBlog.module.css";
import Button from "react-bootstrap/Button";
import { createBlog } from "../../utils/services";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const Navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const blog = {
      title: data.get("title"),
      content: data.get("content"),
    };
    console.log(blog);
    const response = await createBlog(blog);
    event.target.reset();
    document.getElementById("responseStatus").textContent = response.message;
    if (response === "Blog post created") {
      Navigate("/blogs");
    }
  };
  return (
    <div className={styles.createBlogContainer}>
      <h3>Create a new blog</h3>
      <h5>
        What's been on your mind lately? Write a blog post about it and share it
        with the world!
      </h5>

      <Form className={styles.createBlogForm} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="The best blog post ever"
            name="title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content" rows={3} />
        </Form.Group>
        <Form.Select aria-label="Default select example">
          <option>Tag</option>
          <option value="casual">Casual</option>
          <option value="compSci">compSci</option>
          <option value="funny">funny</option>
        </Form.Select>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p id="responseStatus"></p>
      </Form>
    </div>
  );
};
