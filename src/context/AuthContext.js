import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // When setting the user in localStorage
  console.log("Storing user in localStorage:", user);
  
  // When retrieving the user from localStorage
  const storedUser = localStorage.getItem('user');

useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Retrieved storedUser:", storedUser); // Log retrieved value
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
                setUser(parsedUser);
                setIsLoggedIn(true);
                console.log("Parsed User:", parsedUser); // Log parsed user
            } else {
                console.warn("Parsed user is null or undefined");
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Failed to parse user data', error);
            setIsLoggedIn(false);
        }
    } else {
        console.warn("No user in localStorage");
        setIsLoggedIn(false);
    }
}, []);


  const login = async (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLoggedIn(true);
    console.log("Logged in user:", user);
  };  

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
