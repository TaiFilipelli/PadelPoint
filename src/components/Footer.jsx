import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='w-full h-[20rem] bg-blue-600 text-white flex flex-wrap gap-7 bottom-0'>
      <div className='w-1/4 h-1/2 p-5'>
        <h1 className='text-lg mb-2 mt-4 font-semibold'>Conocé más acerca de nosotros</h1>
        <Link href='/about' className='underline'>Quiénes somos?</Link>
      </div>
      <div className='w-1/4 h-1/2 p-5'>
        <h2 className='text-gray-200 mb-2 mt-4 font-semibold text-lg'>Seguinos!</h2>
        <a href='https://www.instagram.com/_padelpoint/' target='_blank' className='underline'>Instagram</a>
      </div>
      <div className='w-1/4 h-1/2 p-5'>
        <h3 className='text-gray-200 mb-2 mt-4 font-semibold text-lg'>Aquí iran otros items a discutir!</h3>
        <a href='https://store.steampowered.com' target='_blank' className='underline'>Steam (porque si xd)</a>
      </div>
    </section>
  )
}

export default Footer
