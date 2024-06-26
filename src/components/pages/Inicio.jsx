import React from 'react'
import toast, {Toaster} from 'react-hot-toast'

const Inicio = () => {
  const notify =()=> toast.success('Efectivamente, esto funciona.');

  return (
    <section className='flex justify-center flex-col items-center'>
      <h1 className='text-5xl mt-5 font-poppinsBold'>PadelPoint</h1>
      {/* <img src="/PadelStock1.png" alt="Paletas Stock 1" className='rounded-md w-full' /> Por algún motivo que desconozo, siento que se ve horrible */} 
      <h3 className='font-poppinsRegular text-lg w-2/4 mt-10 max-[350px]:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, 
      maxime dolores modi sed temporibus id? Officia impedit at atque, nam dolore laudantium perspiciatis amet nisi 
      distinctio est molestias iste quas!</h3>
      <button className='mt-10 bg-black text-white' onClick={notify}>A VER SI FUNCA ESTO?</button>
      <Toaster/>
    </section>
  )
}

export default Inicio
