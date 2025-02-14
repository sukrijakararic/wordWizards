import React, { createContext, useState } from 'react'

export const MySelectedBlogContext = createContext()
export const MySelectedBlogProvider = ({ children }) => {

    const [mySelectedBlog, setMySelectedBlog] = useState({});

  return (
    <div>
        <MySelectedBlogContext.Provider value={{ mySelectedBlog, setMySelectedBlog }}>
            {children}
        </MySelectedBlogContext.Provider>
    </div>
  )
}