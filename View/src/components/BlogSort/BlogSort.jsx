import React, { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./BlogSort.module.css";
import { blogsByDoots, getAllBlogs, getBlogByTagDoots } from "../../utils/services";
import { BlogsContext } from "../../context-api/BlogsContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export const BlogSort = () => {
  const { setAllBlogs } = useContext(BlogsContext);
  const handleBlogsByDoots = async () => {
    try {
      const response = await blogsByDoots();
      setAllBlogs(response);
    } catch (error) {
      console.error("Error sorting blogs by doots:", error);
    }
  };

  const fetchAllBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setAllBlogs(response);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const handleBlogByTagDoots = async (tag) => {
    try {
      const response = await getBlogByTagDoots(tag);
      setAllBlogs(response);
    } catch (error) {
      console.error("Error getting blog by tag and doots:", error);
    }
  };

  return (
    <div>
      <DropdownButton
        id="dropdown-basic-button"
        variant="warning"
        title="Filter Blogs"
        size="sm"
      >
        <Dropdown.Item onClick={() => handleBlogsByDoots()}>
          Blogs by doots
        </Dropdown.Item>
        <Dropdown.Item onClick={() => fetchAllBlogs()}>
          Most Recent
        </Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item>
        <Dropdown.Divider />
        <FloatingLabel
          controlId="floatingInput"
          label="search any tag"
          className="mb-3"
          style={{ margin: "1rem" }}
        >
          <Form.Control type="text" onChange={(e) => handleBlogByTagDoots(e.target.value)} />
        </FloatingLabel>
      </DropdownButton>
    </div>
  );
};
