import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='w-full bg-gray-600 text-white flex flex-row justify-center gap-7 bottom-0'>
      <div className='w-1/2 h-1/2 p-5 flex flex-col'>
        <h3 className='text-2xl max-[400px]:text-xl mb-2 mt-4 font-semibold'>Conocé más de nosotros</h3>
        <Link href='/about' className='underline text-lg mb-4'>¿Quiénes somos?</Link>
        <Link href='/about#faq' className='underline text-lg'>FAQ</Link>
      </div>
      <div className='w-1/2 h-1/2 p-5'>
        <h3 className='text-2xl max-[400px]:text-xl mb-2 mt-4 font-semibold'>Seguinos!</h3>
        <a href='https://www.instagram.com/_padelpoint/' target='_blank' className='underline text-lg'>Instagram</a>
      </div>
    </section>
  )
}

export default Footer
