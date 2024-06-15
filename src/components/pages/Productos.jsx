import React from 'react'
import ProductsCard from '../ProductsCard'
import { Dropdown, Radio, Label} from 'keep-react'
/**
 * Componente que devuelve la página donde se desplegarán los productos
 * @returns {JSX.Element} El componente de despliegue de productos
 */
const Productos = () => {
  return (
    <section className='flex justify-center flex-col text-center'>
      <h1 className='text-4xl mb-8 mt-4 font-poppinsBold'>Productos</h1>
      <h3 className='text-2xl font-poppinsMedium'>Encontrá tu mejor compañera para la cancha.</h3>
      <section className='text-white bg-transparent p-4 rounded-lg flex flex-wrap justify-start items-center ml-[20%] mr-[20%] mt-10'>
        <div>
          <h3 className='text-xl mb-1 ml-5 font-poppinsBold mr-8 text-black'>Filtrar por:</h3>
        </div>
        <form className='flex items-center gap-5'>
          <Dropdown action={<div className='p-2 hover:bg-black transition rounded-md text-black hover:text-white'><p className='text-lg mr-2 font-poppinsRegular'>Tipo de paleta</p></div>} actionClassName='border-none bg-transparent p-0' className='border-none'>
          <Dropdown.List className='p-0'>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="diamante" name="tipo"/>
                <Label htmlFor="diamante" className='font-poppinsRegular'>Diamante</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="redonda" name="tipo" />
                <Label htmlFor="redonda" className=' font-poppinsRegular'>Redonda</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2">
                <Radio variant='circle' id="hibrida" name="tipo" />
                <Label htmlFor="hibrida" className='font-poppinsRegular'>Híbrida</Label>
              </fieldset>
          </Dropdown.List>
          </Dropdown>
          <Dropdown action={<div className='p-2 hover:bg-black transition rounded-md text-black hover:text-white'><p className='text-lg mr-2 ml-[10%] font-poppinsRegular'>Marca</p></div>} actionClassName='border-none bg-transparent p-0' className='border-none'>
          <Dropdown.List className='p-0'>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="marca1" name="marca" className='' />
                <Label htmlFor="marca1" className=' font-poppinsRegular'>Marca 1</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="Nike" name="marca" />
                <Label htmlFor="Nike" className=' font-poppinsRegular'>Nike supongo</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2">
                <Radio variant='circle' id="Otras" name="marca" />
                <Label htmlFor="Otras" className='font-poppinsRegular'>Otros mas irán debajo</Label>
              </fieldset>
          </Dropdown.List>
          </Dropdown>
          
        </form>
      </section>
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
