import React from 'react'
import { Link } from 'wouter'

/**
 * Inicio - Componente que representa la página de inicio de PadelPoint.
 *
 * @returns {JSX.Element} Una section con un mensaje de bienvenida, imagen de paletas, y opciones para registrarse y seguir en Instagram.
 */
const Inicio = () => {

  return (
    <section className='flex justify-center flex-col items-center text-center'>
      <h1 className='font-poppinsBold text-4xl w-2/4 mt-10 max-[350px]:text-base'>Bienvenido a PadelPoint!</h1>
      <h3 className='font-poppinsMedium text-2xl w-1/2 mt-2 max-[350px]:text-sm mb-6'>Sólo las mejores, al mejor precio, para los mejores.</h3>
      <img src="/PadelStock2.png" alt="Paletas del About Us" className=' h-96' />
      {/* POSIBLE FUTURO SCROLL DE IMAGENES ACÁ */}
      <div className='mt-10 flex flex-row justify-center gap-20 w-1/2 items-center'>
        <Link to='/register' className='dark:bg-black text-white bg-[#575151] font-poppinsRegular text-xl p-3 rounded-md'>Unete a la familia</Link>
        <a href="https://www.instagram.com/_padelpoint?igsh=dmI0aTNxcjhtb3lz&utm_source=qr" target='_blank' className='dark:bg-black text-white bg-[#575151] font-poppinsRegular text-xl p-3 rounded-md'>Siguenos en Instagram</a>
      </div>
    </section>
  )
}

export default Inicio
