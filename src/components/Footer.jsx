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
        <a href='https://store.steampowered.com' className='hover:underline text-gray-200 mt-4'target='_blank'>STEAM JIJOOO</a>
      </div>
    </section>
  )
}

export default Footer
