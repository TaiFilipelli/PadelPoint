import React from 'react'
import { Link } from 'wouter'

const Navbar = () => {
  return (
    <nav className='bg-transparent flex justify-between'>
        <div>
            <img src="" alt="PadelPoint logo" />
        </div>
        <div className='gap-5 text-white'>
            <Link ></Link>
            <Link></Link>
            <Link></Link>
        </div>
    </nav>
  )
}

export default Navbar
