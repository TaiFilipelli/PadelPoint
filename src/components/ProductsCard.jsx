import Link from "next/link";

const ProductsCard = ({name, image, brand, price, idProducto}) => {
    const maxlength = 15;
    // const limitedName = name.length > maxlength ? name.substring(0,maxlength) + '...' : name;
  return (
    <section className='bg-white dark:bg-gray-700 text-black w-1/4 flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4'>
      <h1 className='mt-2 text-lg font-bold'>{name}</h1>
      <img src={image} alt="Imagen paleta" className="h-[20rem]"/>
      <p className='font-semibold mt-2'>Marca: {brand}</p>
      <div className='w-full flex items-center justify-center mt-2'>
        <p className='text-lg font-poppinsMedium mr-4'>US${price}</p>
      </div>
      <Link key={idProducto} href={`/products/${idProducto}`} className="hover:underline">Ver más detalles</Link>
    </section>
  )
}

export default ProductsCard
