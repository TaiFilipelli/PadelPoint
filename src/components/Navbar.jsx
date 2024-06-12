import React from 'react'
import { Link } from 'wouter'
import { Storefront, UsersThree } from 'phosphor-react'

const Navbar = () => {
  return (
    <nav className='bg-transparent flex flex-row p-4 w-full h-20'>
        <div className='container mx-auto flex justify-between gap-40 items-center text-white'>
            <div className='text-white text-xl'>
                {/* <img src="" alt="PadelPoint logo" /> */}
                <Link to='/'>LOGO</Link>
            </div>

            <div className='space-x-4 flex gap-8'>
                <Link to='/products' className='flex flex-row text-base'>Productos <Storefront size={25} className='ml-2'/></Link>
                <Link to='/about' className='flex flex-row'>About us <UsersThree size={25} className='ml-2'/></Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
