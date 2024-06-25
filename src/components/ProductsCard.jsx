import React, { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { ConversorButton } from './ConversorButton';
import Skeleton from 'react-loading-skeleton';

const ProductsCard = ({nombre, img, precio, idProducto}) => {
    // const [Loading, setLoading] = useState(true);
    
    // useEffect(()=>{
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   },800);
    // });

  return (
        <section className='flex items-center justify-center p-6 flex-col w-1/5 bg-[#575151] border-black border-2 text-white rounded-lg ml-16 mt-16 dark:bg-black'>
          <h1 className='text-xl font-poppinsBold'>{nombre}</h1><br />
          <img src={img} alt="Imagen paleta"/>
          <div className='w-full flex items-center justify-center'>
            <p className='text-lg font-poppinsMedium mr-4'>US${precio}</p>
            <ConversorButton valueToConvert={precio}/>
          </div>
          <Link to={`/productdetail/${idProducto}`} className='text-lg font-poppinsLight hover:text-red-500 transition-all mt-5'>Ver más</Link>
        </section>
  )
}

export default ProductsCard
