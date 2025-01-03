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
  }, []); // Asegúrate de que las dependencias sean correctas

  useEffect(() => {
    console.log('ESTE ES EL USUARIO EN EL PRIME USE EFFECT, PREVIO A LA VERIFICACIÓN', user);
    if (user.isLogged === false) {
      console.log('El usuario no está logeado, se borra el usuario y se borra de localStorage el nombre de usuario');
      setUser({ username: '' });
      localStorage.removeItem('username');
    }
  }, [user]); // Dependencia en el estado del usuario

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
