import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { BlogsProvider } from "./BlogsContext";
export const ContextProviders = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <BlogsProvider>
          <UserProvider>{children}</UserProvider>
        </BlogsProvider>
      </AuthProvider>
    </div>
  );
};
