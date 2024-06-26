import { useState, useEffect } from "react";
import Filters from "../Filters";
import { getPaletas } from "../services/data";
import ProductsCard from '../ProductsCard';
/**
 * Componente que devuelve la página donde se van a mostrar todas las paletas
 * @component
 * @returns {JSX.Element} El componente de despliegue de productos
 */
const Productos = () => {
  /**
   * Estado para almacenar las paletas obtenidas de la API
   * @type {[{ id: number, name: string, price: number }[], function]}
   */
  const [paletas, setPaletas] = useState([]);

  /**
   * Función asincrónica para obtener las paletas de la API
   * @returns {Promise<void>}
   */
  const dataPaletas = async () => {
    try{
      const data = await getPaletas();
      setPaletas(data);
      console.log(data);
    }catch(error){
      console.error('ERROR ACÁ, EN PRODUCTOS.JSX:',error);
    }
  };
  useEffect(() => {
    dataPaletas();
  }, []);

  return (
    <section className='flex justify-center flex-col text-center'>
      <h1 className='text-4xl mb-4 mt-4 font-poppinsBold'>Productos</h1>
      <h3 className='text-2xl font-poppinsMedium'>Encontrá tu mejor compañera para la cancha.</h3>
      <Filters/>
      <section className='products-section'>
        <div className="products-container flex flex-wrap">
        {/* Mapea las paletas para renderizar las Cards de productos */}
        {paletas.map(paleta => (
          <ProductsCard key={paleta.id} nombre={paleta.model} image={paleta.image} precio={paleta.price} idProducto={paleta.id}/>
        ))}
        </div>
      </section>
    </section>
  );
};

export default Productos;
