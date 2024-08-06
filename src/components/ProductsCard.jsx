import Link from "next/link";
import { Skeleton } from "@nextui-org/react";

const ProductsCard = ({name, image, brand, price, idProducto, isLoading}) => {

    if (isLoading) {
      return (
        <section className='bg-default-100 text-black w-1/4 flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4'>
          <Skeleton className='mt-2 w-3/4 rounded-md'>
            <div className="bg-secondary-50 h-7"></div>
          </Skeleton>
          <Skeleton className="mt-6 w-5/6 rounded-md">
            <div className="bg-secondary-50 h-60"></div>
          </Skeleton>
          <Skeleton className='mt-4 w-2/5 rounded-md'>
            <div className="bg-secondary-50 h-7"></div>
          </Skeleton>
          <Skeleton className='mt-4 w-1/3 rounded-md'>
            <div className="bg-secondary-50 h-7"></div>
          </Skeleton>
          <Skeleton className="mt-4 w-2/5 rounded-md">
            <div className="bg-secondary-50 h-6"></div>
          </Skeleton>
        </section>
      );
    }
  const maxlength = 20;
  const limitedName = name.length > maxlength ? name.substring(0,maxlength) + '...' : name;
  return (
    <section className='bg-white dark:bg-gray-700 text-black w-[22%] flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4 mx-4'>
      <h1 className='mt-2 text-lg font-bold'>{limitedName}</h1>
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
