import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='w-full h-[15rem] bg-gray-600 text-white flex flex-wrap gap-7 bottom-0'>
      <div className='w-1/4 h-1/2 p-5 flex flex-col'>
        <h3 className='text-2xl mb-2 mt-4 font-semibold'>Conocé más acerca de nosotros</h3>
        <Link href='/about' className='underline text-lg'>Quiénes somos?</Link>
        <Link href='/about' className='underline text-lg'>FAQ</Link>
      </div>
      <div className='w-1/4 h-1/2 p-5'>
        <h3 className='text-2xl mb-2 mt-4 font-semibold'>Seguinos!</h3>
        <a href='https://www.instagram.com/_padelpoint/' target='_blank' className='underline text-lg'>Instagram</a>
      </div>
      <div className='w-1/4 h-1/2 p-5'>
        <h3 className='text-2xl mb-2 mt-4 font-semibold'>Aquí iran otros items a discutir!</h3>
        <a href='https://store.steampowered.com' target='_blank' className='underline text-lg'>Steam (porque si xd)</a>
      </div>
    </section>
  )
}

export default Footer
