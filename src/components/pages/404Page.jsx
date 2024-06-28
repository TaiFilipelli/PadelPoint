import React from 'react'
import { Link } from 'wouter'
/**
 * Error404 -Página que representa una página de error 404.
 *
 * @returns {JSX.Element} Un div centrado con un mensaje de error, una imagen y un enlace para volver al inicio.
 */
const Error404 = () => {
  return (
    <div className='flex justify-center text-center flex-col items-center text-black dark:text-white'>
      <h1 className='font-poppinsBlack text-5xl mt-16 mb-8'>ERROR 404: NOT FOUND</h1>
      <img
          src="https://staticmania.cdn.prismic.io/staticmania/ed90f683-c1df-4bad-afa4-65ce4c65287e_Property+1%3DSpaceship_+Property+2%3DMd.svg"
          height={234}
          width={350}
          alt="404"
          className='rounded-md bg-black dark:bg-transparent'
        />
        <h3 className='font-poppinsRegular text-2xl mt-10'>Ups! Parece que tanta calidad te llevó a un lugar donde no hay nada! No se encontró la pagina.</h3>
        <Link to='/' className='font-poppinsLight text-xl hover:underline hover:text-red-600 transition mt-10'>Volver al inicio</Link>
    </div>
  )
}

export default Error404
