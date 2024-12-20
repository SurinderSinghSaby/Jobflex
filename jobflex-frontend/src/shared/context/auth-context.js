import React, { createContext, useState, useEffect } from 'react';

// Create the context with default values
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      setToken(storedData.token);
      setUserId(storedData.userId);
    }
  }, []);

  const login = (uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token }));
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  };

  const value = {
    isLoggedIn: !!token, // Computed dynamically
    userId,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
