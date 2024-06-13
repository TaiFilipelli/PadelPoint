import React, { useState } from 'react'

const ProductsCard = ({productName, urlImg, price}) => {
    const [isLoading, setIsLoading] = useState[true];
    
  return (
    <section className='flex items-center justify-center p-6'>
        <h1 className='text-xl'>{productName}</h1>
        <img src={urlImg} alt="Product image" />
        <p className='text-lg'>{price}</p>
    </section>
  )
}

export default ProductsCard
