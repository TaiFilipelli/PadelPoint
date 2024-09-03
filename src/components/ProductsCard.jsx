import Link from "next/link";
import { Skeleton, Button } from "@nextui-org/react";
import { useCartStore } from "../data/useCartStore";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const ProductsCard = ({name, image, brand, price, idProducto, isLoading}) => {
  const cart = useCartStore((state)=> state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (cart.includes(idProducto)) {
      setIsInCart(true);
    }
  }, [cart, idProducto]);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(idProducto);
      setIsInCart(true);
    }
  };

  if (isLoading) {
    return (
      <section className='bg-default-100 text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4'>
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
  const limitedName = name.length > maxlength ? name.substring(0, maxlength) + '...' : name;

  return (
    <section className='bg-white text-black w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4'>
      <h1 className='mt-2 text-lg font-bold'>{limitedName}</h1>
      <img 
        src={image} 
        alt="Imagen paleta" 
        className="h-64 max-h-64 object-cover rounded-md mt-2"
      />
      <p className='font-semibold mt-2'>Marca: {brand}</p>
      <div className='w-full flex items-center justify-center mt-2'>
        <p className='text-lg font-poppinsMedium mr-4'>US${price}</p>
      </div>
      <div className="flex justify-between items-center gap-4 my-4">
        {isInCart ? (
          <Button as={Link} href="/cart" className="bg-green-500 text-white font-medium text-md" endContent={<ArrowUpRight/>}>Ver Carrito</Button>
        ) : (
          <Button onClick={handleAddToCart} className="bg-red-500 text-white font-medium text-md">Añadir al carrito</Button>
        )}
        <Link key={idProducto} href={`/products/${idProducto}`} className="hover:underline">Ver más</Link>
      </div>
    </section>
  );
}

export default ProductsCard
