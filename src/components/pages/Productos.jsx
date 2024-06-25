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

  useEffect(() => {
    /**
     * Función asincrónica para obtener las paletas de la API
     * @returns {Promise<void>}
     */
    const dataPaletas = async () => {
      const data = await getPaletas();
      setPaletas(data);
      console.log(data);
    };
    dataPaletas();
  }, []);

  return (
    <section className='flex justify-center flex-col text-center'>
      <h1 className='text-4xl mb-8 mt-4 font-poppinsBold'>Productos</h1>
      <h3 className='text-2xl font-poppinsMedium'>Encontrá tu mejor compañera para la cancha.</h3>
      <Filters/>
      <section className='flex flex-wrap'>
        {/* Mapea las paletas para renderizar las Cards de productos */}
        {paletas.map(paleta => (
          <ProductsCard key={paleta.id} nombre={paleta.name} precio={paleta.price}/>
        ))}
      </section>
    </section>
  );
};

export default Productos;
