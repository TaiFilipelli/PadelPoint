import React, { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { ShoppingBagOpen } from 'phosphor-react';
import { ConversorButton } from './ConversorButton';
import Skeleton from 'react-loading-skeleton';

const ProductsCard = ({nombre, image, brand, precio, idProducto, addToCart}) => {
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
          <img src={image} alt="Imagen paleta"/>
          <p className='font-poppinsRegular mt-4'>Marca: {brand}</p>
          <div className='w-full flex items-center justify-center mt-2'>
            <p className='text-lg font-poppinsMedium mr-4'>US${precio}</p>
            <ConversorButton valueToConvert={precio}/>
          </div>
          <div className='w-full flex flex-row items-center justify-center mt-2'>
            <button onClick={() => addToCart(idProducto)} className='bg-red-500 text-white p-2 mt-2 rounded font-poppinsRegular mr-7'>Añadir al carro</button>
            <Link to={`/productdetail/${idProducto}`} className='text-lg font-poppinsLight hover:text-red-500 transition-all'>Ver más</Link>
          </div>
        </section>
  )
}

export default ProductsCard
