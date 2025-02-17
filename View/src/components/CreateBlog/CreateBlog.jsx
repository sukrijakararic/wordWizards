import React from "react";
import Form from "react-bootstrap/Form";
import styles from "./CreateBlog.module.css";
import Button from "react-bootstrap/Button";
import { createBlog } from "../../utils/services";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreateBlog = () => {
  const Navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const blog = {
      title: data.get("title"),
      content: data.get("content"),
      tag: `{${selectedTags.join(",")}}`,
    };
    const response = await createBlog(blog);
    event.target.reset();
    document.getElementById("responseStatusCreateBlog").textContent = response.message;
    if (response === "Blog post created") {
      Navigate("/profile");
    }
  };

  const handleTagChange = (event) => {
    const newSelectedTags = [...selectedTags];
    if (event.target.checked) {
      newSelectedTags.push(event.target.value);
    } else {
      const index = newSelectedTags.indexOf(event.target.value);
      if (index > -1) {
        newSelectedTags.splice(index, 1);
      }
    }
    setSelectedTags(newSelectedTags);
  };

  return (
    <div className={styles.createBlogContainer}>
      <h3>Create a new blog</h3>
      <h5 style={{ textAlign: "center" }}>
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
          <Form.Control as="textarea" name="content" rows={20} />
        </Form.Group>
        <Form.Group controlId="exampleForm.SelectMultiple">
          <Form.Label>Tags | Select as many that apply</Form.Label>
          <div className={styles.tags}>
            {["casual", "compSci", "funny", "food"].map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                label={tag}
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={handleTagChange}
                style={{ marginRight: "1rem" }}
              />
            ))}
          </div>
        </Form.Group>

        <Button style={{width: "15rem"}} variant="success" type="submit">
          Submit
        </Button>
        <p id="responseStatusCreateBlog"></p>
      </Form>
    </div>
  );
};
