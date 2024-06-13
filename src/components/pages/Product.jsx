import React from 'react'

const Product = () => { 
  /*const {id} = useParams(); - Esto usa el useParams de Wouter para determinar qué producto vino desde la lista de productos y su id se toma desde alli
  const [product, setProduct] = useState([]); - toda la info del producto viene en un estado que toma el array con todos sus subdatos
  const [loading, setLoading] = useState(true); - Esto es un estado casi global para los skeletons y las cargas*/
  return (
    <section className='flex justify-center items-center flex-col'>
      <h1 className='font-poppinsBold text-3xl mb-8 mt-4'>Detalles del producto</h1>
      <section className='w-1/2 justify-center items-center h-1/3 flex-col'>

      </section>
    </section>
  )
}

export default Product
