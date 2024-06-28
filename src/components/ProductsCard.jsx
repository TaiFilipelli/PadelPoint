import React, { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { ConversorButton } from './ConversorButton';
import Skeleton from 'react-loading-skeleton';
//Quedaron los Skeleton importados porque eran una adquisición importante...hasta que nos enteramos que era todo local.

/**
 * Componente para mostrar detalles de un producto en una tarjeta.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.nombre - Nombre del producto.
 * @param {string} props.image - URL de la imagen del producto.
 * @param {string} props.brand - Marca del producto.
 * @param {number} props.precio - Precio del producto.
 * @param {string} props.idProducto - ID único del producto.
 * @param {function} props.addToCart - Función para añadir el producto al carro.
 * @returns {JSX.Element} Elemento de tarjeta de producto.
 */
const ProductsCard = ({nombre, image, brand, precio, idProducto, addToCart}) => {
    // const [Loading, setLoading] = useState(true);
    
    // useEffect(()=>{
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   },800);
    // });
    //quedó acá la lógica para setear un timeout, un estado de carga y manejar con ello los skeletons
    const maxLength = 15;
    const limitedNombre= nombre.length > maxLength ? nombre.substring(0,maxLength) + '...' : nombre;

  return (
        <section className='flex items-center justify-center p-6 flex-col w-1/5 bg-[#575151] border-black border-2 text-white rounded-lg ml-16 mt-16 dark:bg-black max-[815px]:w-1/3 max-[600px]:w-full max-[600px]:h-full max-[600px]:mt-1'>
          <h1 className='text-xl font-poppinsBold max-[600px]:text-lg'>{limitedNombre}</h1><br />
          <img src={image} alt="Imagen paleta"/>
          <p className='font-poppinsRegular mt-4'>Marca: {brand}</p>
          <div className='w-full flex items-center justify-center mt-2'>
            <p className='text-lg font-poppinsMedium mr-4'>US${precio}</p>
            <ConversorButton valueToConvert={precio}/>
          </div>
          <div className='w-full flex flex-row items-center justify-center mt-2'>
            <button onClick={() => addToCart(idProducto)} className='bg-red-500 text-white p-2 mt-2 rounded font-poppinsRegular mr-7 hover:bg-red-300 transition'>Añadir al carro</button>
            <Link to={`/productdetail/${idProducto}`} className='text-lg font-poppinsLight hover:text-red-500 transition w-1/3'>Ver más</Link>
          </div>
        </section>
  )
}

export default ProductsCard
