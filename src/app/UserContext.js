'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkUserState } from '../data/loginData';

export const UserContext = createContext({
  user: {
    isLogged: false,
    isAdmin: false,
    username: '',
  },
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogged: false,
    isAdmin: false,
    username: '',
  });

  const initializeUser = async () => {
    try {
      const userData = await checkUserState();
      if (userData.status) {
        setUser({
          isLogged: true,
          isAdmin: userData.payload.roles.some(role => role.name === 'admin'),
          username: userData.username,
        });
      } else {
        setUser({ isLogged: false, isAdmin: false, username: '' });
      }
    } catch (err) {
      console.error('Error initializing user:', err);
      setUser({ isLogged: false, isAdmin: false, username: '' });
    }
  };

  useEffect(() => {
    if (user.isLogged) return;
      initializeUser();

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
