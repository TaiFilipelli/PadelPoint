import React from 'react'
import { Link } from 'wouter'
import { Storefront, UsersThree, User } from 'phosphor-react'
/**
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isLogged - Estado que determina si el usuario está logeado o no.
 * @param {function} props.setIsLogged  - Función que cambia el estado de logeado de un usuario.
 * @returns {JSX.Element} El componente NavBar
 */
const Navbar = ({isLogged, setIsLogged}) => {
  /**
   * Handler que maneja un boton que cambia el estado a login/logout
   */

  const handleLoginButton=()=>{
    setIsLogged(!isLogged);
  }
  return (
    <nav className='bg-transparent flex flex-row p-4 w-full h-20'>
        <div className='container mx-auto flex justify-between gap-40 items-center text-white'>
            <div className='text-white text-xl'>
                {/* <img src="" alt="PadelPoint logo" /> */}
                <Link to='/'>LOGO</Link>
            </div>
            <div className='space-x-4 flex gap-8'>
                <Link to='/products' className='flex flex-row text-xl'>Productos <Storefront size={35} className='ml-2'/></Link>
                <Link to='/about' className='flex flex-row text-xl'>About us <UsersThree size={35} className='ml-2'/></Link>
                <button onClick={handleLoginButton} className='flex flex-row text-xl'>{ isLogged? 'Usuario' : 'Invitado' }<User size={25} className='ml-2'/></button>
            </div> 
        </div>
    </nav>
  )
}

export default Navbar;
