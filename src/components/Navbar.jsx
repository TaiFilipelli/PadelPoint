import React, { useState } from 'react';
import { Link } from 'wouter';
import { Storefront, UsersThree, User, Moon, Sun, List } from 'phosphor-react';
import LoginOrUser from './LoginOrUser';

/**
 * Componente Navbar que muestra un menú de navegación.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isLogged - Estado que determina si el usuario está logeado o no.
 * @param {boolean} props.isDarkMode - Estado que determina si la página está en modo oscuro.
 * @param {function} props.onToggleDarkMode - Evento que maneja cuando se cambia el modo oscuro.
 * @returns {JSX.Element} El componente Navbar.
 */
const Navbar = ({ isLogged, setIsLogged, isDarkMode, onToggleDarkMode }) => {
  // Estado para controlar si el menú desplegable de la navbar está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Handler que alterna el estado del menú desplegable en pantallas chicas de la navbar.
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent flex flex-row p-4 w-full h-24 font-poppinsRegular">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/LogoPadelPoint.png"
              alt="Logo Padel Point"
              className="h-[11rem] invert-on-dark"
            />
          </Link>
        </div>
        {/* Navbar normal para pantallas grandes */}
        <div className="hidden gap-7 lg:flex space-x-4 items-center text-black dark:text-white">
          <Link to="/products" className="flex flex-row text-xl">
            Productos <Storefront size={30} className="ml-2" />
          </Link>
          <Link to="/about" className="flex flex-row text-xl">
            About us <UsersThree size={30} className="ml-3" />
          </Link>
          <LoginOrUser/>
          <button onClick={onToggleDarkMode}>
            {isDarkMode ? <Moon size={30} className="ml-2" /> : <Sun size={30} className="ml-2" />}
          </button>
        </div>
        {/* Botón de hamburguesa para pantallas pequeñas */}
        <div className="lg:hidden relative">
          <button onClick={toggleMenu} className="text-black dark:text-white">
            <List size={30} />
          </button>
        </div>
      </div>
      {/* Navbar desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <div className="absolute right-0 top-12 lg:hidden rounded-md bg-white dark:bg-gray-800 text-black dark:text-white flex flex-col items-center space-y-4 p-4 mt-2 shadow-lg">
          <Link to="/products" className="flex flex-row text-xl">
            Productos <Storefront size={30} className="ml-2" />
          </Link>
          <Link to="/about" className="flex flex-row text-xl">
            About us <UsersThree size={30} className="ml-3" />
          </Link>
          <LoginOrUser/>
          <button onClick={onToggleDarkMode}>
            {isDarkMode ? <Moon size={30} className="ml-2" /> : <Sun size={30} className="ml-2" />}
          </button>
        </div>
      )}
      {/* Estilos específicos de Tailwind CSS para invertir el Logo, únicamente está ahi por eso.*/}
      <style jsx='true'>{`
        .invert-on-dark {
          filter: invert(0);
        }
        .dark .invert-on-dark {
          filter: invert(1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
