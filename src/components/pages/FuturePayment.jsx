import React from 'react'
import 'animate.css';
/**
 * FuturePayment - Página mas "meme" que representa una sección informativa sobre un método de pago en construcción. Lo pusimos para justificar el botón de "Comprar" en el carrito
 *
 * @returns {JSX.Element} Un elemento de sección con un mensaje de "método de pago en construcción", una breve explicación que justifica nuestras incapacidades para realizar pagos xd 
 * y un enlace para volver al inicio de la página.
 */
const FuturePayment = () => {
  return (
    <section className='absolute z-50 items-center justify-center text-center w-full mt-10'>
        <h1 className='font-poppinsBlack text-6xl animate__hinge animate__slower'>MÉTODO DE PAGO EN CONSTRUCCIÓN</h1>
        <h3 className='font-poppinsMedium mt-5 text-2xl mb-5'>El presupuesto dió hasta acá, en breves pondremos un sistema de pago funcional!</h3>
        <a href="/" className='text-red-600 font-poppinsBold text-xl hover:underline'>Volver al inicio</a>
        <div className='items-center flex justify-center w-full mt-10 rounded-sm flex-col'>
          <img src="/paymentWorking.jpg" alt="We working at the payment" />
          <p className='font-poppinsLight mt-4'>Live footage del Front developer trabajando duro para usted!</p>
        </div>
    </section>
  )
}

export default FuturePayment
