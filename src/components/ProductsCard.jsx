import Link from "next/link";
import { Skeleton, Button } from "@nextui-org/react";
import { useCartStore } from "src/data/useCartStore";

const ProductsCard = ({name, image, brand, price, idProducto, isLoading}) => {
  const addToCart = useCartStore((state) => state.addToCart);

    if (isLoading) {
      return (
        <section className='bg-default-100 text-black w-[22%] flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4 mx-4'>
          <Skeleton className='mt-2 w-3/4 rounded-md'>
            <div className="bg-secondary-50 h-7"></div>
          </Skeleton>
          <Skeleton className="mt-6 w-5/6 rounded-md">
            <div className="bg-secondary-50 h-72"></div>
          </Skeleton>
          <Skeleton className='mt-3 w-2/5 rounded-md'>
            <div className="bg-secondary-50 h-5"></div>
          </Skeleton>
          <Skeleton className='mt-3 w-1/3 rounded-md'>
            <div className="bg-secondary-50 h-6"></div>
          </Skeleton>
          <Skeleton className="mt-3 w-2/5 rounded-md">
            <div className="bg-secondary-50 h-5"></div>
          </Skeleton>
        </section>
      );
    }
  const maxlength = 20;
  const limitedName = name.length > maxlength ? name.substring(0,maxlength) + '...' : name;
  return (
    <section className='bg-white text-black w-[22%] flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4 mx-4'>
      <h1 className='mt-2 text-lg font-bold'>{limitedName}</h1>
      <img src={image} alt="Imagen paleta" className="h-[20rem]"/>
      <p className='font-semibold mt-2'>Marca: {brand}</p>
      <div className='w-full flex items-center justify-center mt-2'>
        <p className='text-lg font-poppinsMedium mr-4'>US${price}</p>
      </div>
      <div className="flex justify-between items-center gap-4 my-4">
      <Button onClick={()=> addToCart(idProducto)} className="bg-red-500 text-white font-medium text-md">Añadir al carrito</Button>
      <Link key={idProducto} href={`/products/${idProducto}`} className="hover:underline">Ver más</Link>
      </div>
    </section>
  )
}

export default ProductsCard
