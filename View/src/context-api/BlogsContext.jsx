import React, { createContext, useState } from 'react'

export const BlogsContext = createContext()
export const BlogsProvider = ({ children }) => {

    const [allBlogs, setAllBlogs] = useState({});

  return (
    <div>
        <BlogsContext.Provider value={{allBlogs, setAllBlogs}}>
            {children}
        </BlogsContext.Provider>
    </div>
  )
}