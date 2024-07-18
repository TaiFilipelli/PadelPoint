import Link from "next/link";

const ProductsCard = ({name, image, brand, price, idProducto}) => {
    const maxlength = 15;
    // const limitedName = name.length > maxlength ? name.substring(0,maxlength) + '...' : name;
  return (
    <section className='bg-gray-400 dark:bg-gray-700 h-60 w-1/6 rounded-lg text-center'>
      <h1 className='mt-2 text-lg font-bold'>{name}</h1>
      <img src={image} alt="Imagen paleta"/>
      <p className='font-semibold mt-4'>Marca: {brand}</p>
      <div className='w-full flex items-center justify-center mt-2'>
        <p className='text-lg font-poppinsMedium mr-4'>US${price}</p>
      </div>
      <Link key={idProducto} href={`/products/${idProducto}`}>Ver nás detalles</Link>
    </section>
  )
}

export default ProductsCard
