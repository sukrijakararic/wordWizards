import React from "react";
import { Outlet } from "react-router-dom";
export const Root = () => {
  return (
    <>
      <Outlet />
      <p>Root</p>{" "}
    </>
  );
};
