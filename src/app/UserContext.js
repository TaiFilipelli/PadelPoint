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

  const initializeUser = async () => {
    try {
      const userData = await checkUserState();
      console.log('Chequeate la data de user que viene desde acá:', userData);
      if (userData.isLogged===true || userData.refreshTokenExists===true) {
        console.log('Está bien, el usuario está logeado o tiene un token de refresco');
        setUser({
          isLogged: true,
          isAdmin: userData.payload.roles.some(role => role.name === 'admin'),
          username: localStorage.getItem('username'),
        });
        console.log('El usuario está bien, se ha inicializado correctamente: Está loggeado?', user.isLogged,'; es admin? ', user.isAdmin,'; su nombre es ',user.username);
      } else {
        console.log('El usuario no está loggeado: eso o no se toma el token');
        setUser({ isLogged: false, isAdmin: false, username: '' });
        console.log('Se borró el usuario y ahora se borra de localStorage el nombre de usuario');
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
      console.log('El usuario no está logeado, se borra el usuario y se borra de localStorage el nombre de usuario');
      setUser({username:''});
      localStorage.removeItem('username');
      console.log('Se inicializa el usuario acá ');
      initializeUser();
    }else{
      return user;
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
