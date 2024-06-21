import React, { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { ConversorButton } from './ConversorButton';
import Skeleton from 'react-loading-skeleton';

const ProductsCard = ({productName, /*urlImg,*/ price} /*OTRA MANERA ES TRAER TODO EL PRODUCTO CON productoSeleccionado*/) => {
    // const [Loading, setLoading] = useState[true];
    //productoSeleccionado.title, .img, .price
    
    // useEffect(()=>{
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   },800);
    // });

  return (
        <section className='flex items-center justify-center p-6 flex-col w-1/5 bg-[#575151] border-black border-2 text-white rounded-lg ml-16 mt-16 dark:bg-black'>
        {/*<img src={urlImg} alt="Product image"/>*/}
          <h1 className='text-xl font-poppinsBold'>{productName}</h1><br /><br /><br /><br />
          <div className='w-full flex items-center justify-center'>
            <p className='text-lg font-poppinsMedium mr-4'>US${price}</p>
            <ConversorButton valueToConvert={price}/>
          </div>
          <Link to='/productdetail' className='text-lg font-poppinsLight hover:text-red-500 transition-all mt-5'>Ver más</Link>
        </section>
  )
}

export default ProductsCard
