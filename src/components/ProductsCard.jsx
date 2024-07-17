import React from 'react'

const ProductsCard = ({model/*, brand, price, img*/}) => {
    const maxlength = 15;
    const limitedName = model.length > maxlength ? model.substring(0,maxlength) + '...' : model;
  return (
    <section className='bg-gray-400 dark:bg-gray-700 h-40 w-1/6 rounded-lg text-center'>
      <h1 className='mt-2 text-lg font-semibold'>{limitedName}</h1>
    </section>
  )
}

export default ProductsCard
