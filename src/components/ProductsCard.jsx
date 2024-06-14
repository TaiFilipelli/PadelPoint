import React, { useState } from 'react'
import { Link } from 'wouter'

const ProductsCard = ({productName, /*urlImg,*/ price} /*OTRA MANERA ES TRAER TODO EL PRODUCTO CON productoSeleccionado*/) => {
    //const [isLoading, setIsLoading] = useState[true];
    //productoSeleccionado.title, .img, .price
    
  return (
    <section className='flex items-center justify-center p-6 flex-col w-1/5 bg-[#575151] border-black border-2 text-white rounded-lg ml-20 mt-16 dark:bg-black'>
        {/*<img src={urlImg} alt="Product image"/>*/}
        <h1 className='text-xl font-poppinsBold'>{productName}</h1><br /><br /><br /><br />
        <p className='text-lg font-poppinsMedium'>{price}</p>
        <Link to='/productdetail' className='text-lg font-poppinsLight hover:text-red-500 transition'>Ver más</Link>
    </section>
  )
}

export default ProductsCard
