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
      console.log('Chequeate la data de user que viene desde acá:', userData);
      if (userData.isLogged || userData.refreshTokenExists) {
        setUser({
          isLogged: true,
          isAdmin: userData.payload.roles.some(role => role.name === 'admin'),
          username: localStorage.getItem('username'),
        });
      } else {
        setUser({ isLogged: false, isAdmin: false, username: '' });
        localStorage.removeItem('username');
      }
    } catch (err) {
      console.error('Error initializing user:', err);
      setUser({ isLogged: false, isAdmin: false, username: '' });
      localStorage.removeItem('username');
    }
  };

  useEffect(() => {
    if (user.isLogged===false){
      setUser({username:''});
      localStorage.removeItem('username');
      initializeUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
