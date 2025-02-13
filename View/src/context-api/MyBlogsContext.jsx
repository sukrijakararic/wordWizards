import React, { createContext, useState } from 'react'

export const MyBlogsContext = createContext()
export const MyBlogsProvider = ({ children }) => {

    const [myBlogs, setMyBlogs] = useState({});

  return (
    <div>
        <MyBlogsContext.Provider value={{myBlogs, setMyBlogs}}>
            {children}
        </MyBlogsContext.Provider>
    </div>
  )
}