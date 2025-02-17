import React, { createContext, useState } from "react";

export const BlogCommentsContext = createContext();

export const BlogCommentsProvider = ({ children }) => {
    const [blogComments, setBlogComments] = useState([]);

    return (
        <div>
            <BlogCommentsContext.Provider value={{ blogComments, setBlogComments }}>
                {children}
            </BlogCommentsContext.Provider>
        </div>
    );
};