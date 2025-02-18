export const addUser = async (user) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const login = async (user) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await fetch("/api/loggedIn");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await fetch("/api/allBlogs");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting all data:", error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await fetch(`/api/blogById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }); 
    const data = await response.json();
    return data;
  } catch (error) {
    }
}

export const createBlog = async (blog) => {
  try {
    const response = await fetch("/api/createBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const addTagToBlog = async (blog) => {
  try {
    const response = await fetch("/api/addTagToBlog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding tag to blog:", error);
    throw error;
  }
};

export const giveUpDootBlog = async (id) => {
  try {
    const response = await fetch(`/api/giveUpDootBlog`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error giving up doot:", error);
    throw error;
  }
};

export const giveDownDootBlog = async (id) => {
  try {
    const response = await fetch(`/api/giveDownDootBlog`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error giving down doot:", error);
    throw error;
  }
};

export const blogsByDoots = async () => {
  try {
    const response = await fetch("/api/blogsByDoots");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting blogs by doots:", error);
    throw error;
  }
};

export const getBlogByTagDoots = async (tags) => {
  try {
    const response = await fetch(`/api/blogsByTagsDoots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting blog by tag and doots:", error);
    throw error;
  }
};

export const getMyBlogs = async (blog) => {
  try {
    const response = await fetch(`/api/myBlogs`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting blog by tag and doots:", error);
    throw error;
  }
};

export const deleteBlog = async (id, title) => {
  try {
    const response = await fetch(`/api/deleteBlog`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const updateBlog = async (blog) => {
  try {
    const response = await fetch(`/api/updateBlog`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const createComment = async (comment) => {
  try {
    const response = await fetch(`/api/createComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getBlogComments = async (blog_id) => {
  try {
    const response = await fetch(`/api/commentsForBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blog_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting blog comments:", error);
    throw error;
  }
};
export const mostRecentComments = async (blog_id) => {
  try {
    const response = await fetch(`/api/commentsByCreated`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blog_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting most recent comments:", error);
    throw error;
  }
};

export const upDootComment = async (comment_id) => {
  try {
    const response = await fetch(`/api/commentUpDoot`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error up dooting comment:", error);
    throw error;
  }
};

export const downDootComment = async (comment_id) => {
  try {
    const response = await fetch(`/api/commentDownDoot`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error down dooting comment:", error);
    throw error;
  }
};

export const getMyComments = async () => {
  try {
    const response = await fetch(`/api/myComments`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting my comments:", error);
    throw error;
  }
};

export const deleteComment = async (comment_id) => {
  try {
    const response = await fetch(`/api/deleteComment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};