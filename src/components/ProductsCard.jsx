import Link from "next/link";

const ProductsCard = ({name, image, brand, price, idProducto}) => {
    const maxlength = 15;
    // const limitedName = name.length > maxlength ? name.substring(0,maxlength) + '...' : name;
  return (
    <section className='bg-white dark:bg-gray-700 text-black h-1/2 w-1/3 rounded-lg text-center border-3 border-gray-200 shadow-xl'>
      <h1 className='mt-2 text-lg font-bold'>{name}</h1>
      <img src={image} alt="Imagen paleta"/>
      <p className='font-semibold mt-4'>Marca: {brand}</p>
      <div className='w-full flex items-center justify-center mt-2'>
        <p className='text-lg font-poppinsMedium mr-4'>US${price}</p>
      </div>
      <Link key={idProducto} href={`/products/${idProducto}`} className="hover:underline">Ver más detalles</Link>
    </section>
  )
}

export default ProductsCard
