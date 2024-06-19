import React from 'react'
import ProductsCard from '../ProductsCard'
import { Dropdown, Radio, Label} from 'keep-react'
import Filters from '../Filters'
/**
 * Componente que devuelve la página donde se desplegarán los productos
 * @returns {JSX.Element} El componente de despliegue de productos
 */
const Productos = () => {
  return (
    <section className='flex justify-center flex-col text-center'>
      <h1 className='text-4xl mb-8 mt-4 font-poppinsBold'>Productos</h1>
      <h3 className='text-2xl font-poppinsMedium'>Encontrá tu mejor compañera para la cancha.</h3>
      <Filters/>
      <section className='flex flex-wrap'>
        <ProductsCard productName='Paleta redonda' price='US$500'/>
        <ProductsCard productName='Paleta diamante' price='US$350'/>
        <ProductsCard productName='Paleta hibrida' price='US$425'/>
        <ProductsCard productName='Paleta roja' price='US$10'/>
      </section>
    </section>
  )
}

export default Productos
