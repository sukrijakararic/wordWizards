import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { BlogsProvider } from "./BlogsContext";
import { SelectedBlogProvider } from "./SelectedBlogContext";
import { MyBlogsProvider } from "./MyBlogsContext";
export const ContextProviders = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <BlogsProvider>
          <SelectedBlogProvider>
            <MyBlogsProvider>
              <UserProvider>{children}</UserProvider>
            </MyBlogsProvider>
          </SelectedBlogProvider>
        </BlogsProvider>
      </AuthProvider>
    </div>
  );
};
