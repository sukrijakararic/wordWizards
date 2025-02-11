import React, { createContext, useState } from 'react'

export const SelectedBlogContext = createContext()
export const SelectedBlogProvider = ({ children }) => {

    const [blog, setBlog] = useState({});

  return (
    <div>
        <SelectedBlogContext.Provider value={{blog, setBlog}}>
            {children}
        </SelectedBlogContext.Provider>
    </div>
  )
}