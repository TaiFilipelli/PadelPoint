import React from 'react'
import { Link } from 'wouter'
import { Storefront, UsersThree, User, Moon, Sun } from 'phosphor-react'
/**
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isLogged - Estado que determina si el usuario está logeado o no.
 * @param {function} props.setIsLogged  - Función que cambia el estado de logeado de un usuario.
 * @param {boolean} props.isDarkMode - Estado que determina si la página esta en modo oscuro
 * @param {function} props.onToggleDarkMode - Evento que maneja cuando se togglea el modo oscuro desde el botón
 * @returns {JSX.Element} El componente NavBar
 */
const Navbar = ({isLogged, setIsLogged, isDarkMode, onToggleDarkMode}) => {
  /**
   * Handler que maneja un boton que cambia el estado a login/logout
   */
  const handleLoginButton=()=>{
    setIsLogged(!isLogged);
  }
  return (
    <nav className='bg-transparent flex flex-row p-4 w-full h-24 font-poppinsRegular'>
        <div className='container mx-auto flex justify-between gap-40 items-center text-black dark:text-white'>
            <div /*className='dark:bg-white dark:rounded-full dark:h-[11rem]' PREGUNTAR A LOS PIBES QUÉ PREFIEREN*/>
                {/* <img src="" alt="PadelPoint logo" /> */}
                <Link to='/'><img src="/public/LogoPadelPoint.png" alt="Logo Padel Point" className=' invert-on-dark h-[10rem] mb-2' /></Link>
            </div>
            <div className='space-x-4 flex gap-8'>
                <Link to='/products' className='flex flex-row text-xl'>Productos <Storefront size={30} className='ml-2'/></Link>
                <Link to='/about' className='flex flex-row text-xl'>About us <UsersThree size={30} className='ml-3'/></Link>
                <button onClick={handleLoginButton} className='flex flex-row text-xl'>{ isLogged? 'Usuario' : 'Invitado' }<User size={25} className='ml-2'/></button>
                <button onClick={onToggleDarkMode}>{isDarkMode? <Moon size={30} className='ml-2'/> : <Sun size={30} className='ml-2'/>}</button>
            </div> 
        </div>
        <style jsx='true'>{`
          .invert-on-dark {
            filter: invert(0);
          }
          .dark .invert-on-dark {
            filter: invert(1);
          }
        `}</style>
    </nav>
  )
}

export default Navbar;
