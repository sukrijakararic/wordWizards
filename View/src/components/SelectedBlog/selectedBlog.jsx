import React, { useContext } from "react";
import { SelectedBlogContext } from "../../context-api/SelectedBlogContext";
import styles from "./SelectedBlog.module.css";

export const SelectedBlog = () => {
  const { blog } = useContext(SelectedBlogContext);
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};
