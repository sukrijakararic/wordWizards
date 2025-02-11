import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { BlogsProvider } from "./BlogsContext";
import { SelectedBlogProvider } from "./SelectedBlogContext";
export const ContextProviders = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <BlogsProvider>
          <SelectedBlogProvider>
            <UserProvider>{children}</UserProvider>
          </SelectedBlogProvider>
        </BlogsProvider>
      </AuthProvider>
    </div>
  );
};
