'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkUserState } from '../data/loginData';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogged: false,
    isAdmin: false,
    username: '',
  });

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userData = await checkUserState();
        console.log('Chequeate la data de user que viene desde acá:', userData);
        if (userData.isLogged === true || userData.refreshTokenExists === true) {
          console.log('Está bien, el usuario está logeado o tiene un token de refresco');
          setUser({
            isLogged: true,
            isAdmin: userData.payload.roles.some(role => role.name === 'admin'),
            username: localStorage.getItem('username'),
          });
          return user;
        } else {
          console.log('El usuario no está loggeado: eso o no se toma el token');
          setUser({ isLogged: false, isAdmin: false, username: '' });
          localStorage.removeItem('username');
        }
      } catch (err) {
        console.error('Error initializing user:', err);
        setUser({ isLogged: false, isAdmin: false, username: '' });
        localStorage.removeItem('username');
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    console.log('ESTE ES EL USUARIO EN EL PRIMER USE EFFECT, PREVIO A LA VERIFICACIÓN', user);
    if (user.isLogged === false) {
      console.log('El usuario no está logeado, acá no hay lógica a manejar.');
    }else{
      return user;
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
