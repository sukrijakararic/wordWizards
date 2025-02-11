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
  