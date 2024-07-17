import React from 'react'

const Footer = () => {
  return (
    <section className='w-full h-24 bg-blue-600 text-white flex flex-wrap text-center justify-center items-center gap-7 bottom-0'>
      <h1 className='text-lg'>ESTE ES EL FOOTER!</h1>
      <h2 className='text-medium'>ACÁ IRÁN METODOS DE CONTACTO, ETC.</h2>
      <a href='https://store.steampowered.com' className='hover:underline text-gray-200'target='_blank'>STEAM JIJOOO</a>
    </section>
  )
}

export default Footer
