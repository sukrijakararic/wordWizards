import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { BlogsProvider } from "./BlogsContext";
import { SelectedBlogProvider } from "./SelectedBlogContext";
import { MyBlogsProvider } from "./MyBlogsContext";
import { MySelectedBlogProvider } from "./MySelectedBlogContext";
export const ContextProviders = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <BlogsProvider>
          <SelectedBlogProvider>
            <MyBlogsProvider>
              <MySelectedBlogProvider>
              <UserProvider>{children}</UserProvider>
              </MySelectedBlogProvider>
            </MyBlogsProvider>
          </SelectedBlogProvider>
        </BlogsProvider>
      </AuthProvider>
    </div>
  );
};
