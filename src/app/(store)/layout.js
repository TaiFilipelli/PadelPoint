'use client';
import '../../../styles/globals.css'
import { Providers } from '../providers';
import Nav from '../../components/Navbar'
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(()=>{
    return localStorage.getItem('darkMode') ==='true';
  });
  
  const onToggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <html lang="es" className='dark'>
      <body className='h-screen w-screen bg-no-repeat bg-white text-black dark:bg-black dark:text-white pt-36'>
        <Providers>
          <Nav onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode}/>
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}