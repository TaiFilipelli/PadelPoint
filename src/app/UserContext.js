'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkUserState } from '../data/loginData';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    isLogged: false,
    isAdmin: false,
    username: '',
  });
  const [initialized, setInitialized] = useState(false);

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
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    if (!initialized) {
      initializeUser();
    }
  }, [initialized]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
