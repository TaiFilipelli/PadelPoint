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
      <section className=' text-center justify-center items-center h-1/3 flex-col w-[70%]'>
      {loading ? (
          <p>Cargando...</p>
        ) : (
          <h1 className='font-poppinsBold text-4xl mt-10'>{product.name}</h1>
          
        )}
      </section>
    </section>
  )
}

export default Product
