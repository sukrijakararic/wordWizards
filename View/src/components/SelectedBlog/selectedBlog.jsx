import React, { useContext } from "react";
import { SelectedBlogContext } from "../../context-api/SelectedBlogContext";
import styles from "./SelectedBlog.module.css";

export const SelectedBlog = () => {
  const { blog } = useContext(SelectedBlogContext);
  return <div>{blog.title}</div>;
};
