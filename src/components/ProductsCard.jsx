import React, { useState } from 'react'

const ProductsCard = ({productName, /*urlImg,*/ price}) => {
    //const [isLoading, setIsLoading] = useState[true];
    
  return (
    <section className='flex items-center justify-center p-6 flex-col w-1/5 bg-black rounded-lg ml-20 mt-16'>
        {/*<img src={urlImg} alt="Product image"/>*/}
        <h1 className='text-xl font-poppinsBold'>{productName}</h1><br /><br /><br /><br />
        <p className='text-lg font-poppinsMedium'>{price}</p>
        <a href='/productdetail' className='text-lg font-poppinsLight hover:text-red-500 transition'>Ver más</a>
    </section>
  )
}

export default ProductsCard
