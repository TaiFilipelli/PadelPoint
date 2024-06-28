import React, { useEffect, useState } from 'react'
import { useParams } from 'wouter';
import { getOnePaleta } from '../services/data';
const Product = () => { 
  const { id } = useParams();
  //Esto usa el useParams de Wouter para determinar qué producto vino desde la lista de productos y su id se toma desde alli
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
          <section className='flex justify-center items-center text-center h-1/3 flex-col w-[70%]'>
              <h1 className='font-poppinsBold text-4xl mt-10 mb-5'>{product.model}</h1>
              <img src={product.image} alt="Imagen de raqueta" className='h-full rounded-sm w-2/6'/>
              <div className='text-left w-1/2 mt-5'>
                <h1 className='font-poppinsMedium text-xl'>Marca: {product.brand}</h1>
                <p className='font-poppinsRegular text-xl'>US${product.price}</p>
              </div>
          </section>
        )}
      </section>
  )
}

export default Product
