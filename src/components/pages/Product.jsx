import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'wouter';
import { getOnePaleta } from '../services/data';
/**
 * Product - Página que muestra los detalles de un producto específico que viene de la lista de productos.
 *
 * @returns {JSX.Element} Como una cartita que muestra el nombre, imagen, marca y precio del producto. Nos hubiese gustado 
 * mucha más descripción, pero obviamente no contamos con una base de datos completa en ningún momento asi que fue medio improvisado.
 */
const Product = () => { 
  const { id } = useParams();
  //Esto usa el hook useParams de Wouter para determinar qué producto vino desde la lista de productos y su id se toma desde alli
  const [product, setProduct] = useState([]); 
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const dataPaleta = async() => {
    try{
        const parsedId = parseInt(id, 10);
        const paleta = await getOnePaleta(parsedId);
        setProduct(paleta);
        setLoading(false);
    } catch (error){
      console.error("Error acá, rey: ",error);
      setLoading(true);
    };
  }
    dataPaleta();
  },[id]);
  return (
    <section className='flex justify-center items-center flex-col'>
      {loading ? (
        <p>Cargando...</p>
        ) : (
          <section className='flex justify-center items-center text-center h-1/3 flex-col w-[70%] bg-[#575151] dark:bg-black dark:text-white rounded-lg mt-10 p-10 text-black'>
              <h1 className='font-poppinsBold text-4xl mt-10 mb-5'>{product.model}</h1>
              <img src={product.image} alt="Imagen de raqueta" className='h-full rounded-lg w-2/6'/>
              <div className='text-left w-1/2 mt-5'>
                <h1 className='font-poppinsMedium text-xl'>Marca: {product.brand}</h1>
                <p className='font-poppinsRegular text-xl mb-4'>US${product.price}</p>
                <Link to='/products' className='font-poppinsMedium text-xl hover:underline'>Volver atrás</Link>
              </div>
          </section>
        )}
      </section>
  )
}

export default Product
