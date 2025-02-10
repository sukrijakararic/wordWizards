import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn) {
      setLoggedIn(storedLoggedIn === 'true');
    }
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('loggedIn');
    });
    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('loggedIn', 'true');
    } else {
      localStorage.removeItem('loggedIn');
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
