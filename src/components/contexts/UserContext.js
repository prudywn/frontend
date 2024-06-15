// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profilePic: '',
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const updateUser = (newData) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  const logout = () => {
    setUserData({ username: '', email: '', profilePic: '' });
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
