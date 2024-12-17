import Link from "next/link";
import { Skeleton, Button } from "@nextui-org/react";
import { useCartStore } from "../data/useCartStore";
import { useState, useEffect } from "react";
import { ArrowUpRight, Basket } from "@phosphor-icons/react/dist/ssr";
import { trackAddToCart } from "../../utils/pixel";

const ProductsCard = ({name, image, brand, price, idProducto, isLoading}) => {
  const cart = useCartStore((state)=> state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isInCart, setIsInCart] = useState(false);
  const [validatedImages, setValidatedImages] = useState([]);

  const displayPrice = (price/9).toFixed(0);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemInCartState = storedCart.find(item => item.id === idProducto);

    if(itemInCartState){
      setIsInCart(true);
    }
  }, [cart, idProducto]);



  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(idProducto);
      setIsInCart(true);
      trackAddToCart(idProducto, price, 'ARS');
    }
  };

  if (isLoading) {
    return (
      <section className='bg-default-100 text-black w-auto flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4'>
        <Skeleton className='mt-2 w-48 rounded-md'>
          <div className="bg-secondary-50 h-7"></div>
        </Skeleton>
        <Skeleton className="mt-6 w-52 rounded-md">
          <div className="bg-secondary-50 h-64"></div>
        </Skeleton>
        <Skeleton className='mt-3 w-24 rounded-md'>
          <div className="bg-secondary-50 h-5"></div>
        </Skeleton>
        <Skeleton className='mt-3 w-32 rounded-md'>
          <div className="bg-secondary-50 h-5"></div>
        </Skeleton>
        <Skeleton className='mt-3 w-36 rounded-md'>
          <div className="bg-secondary-50 h-6"></div>
        </Skeleton>
        <div className="flex flex-row justify-between gap-4 items-center">
        <Skeleton className="mt-3 w-28 rounded-md">
          <div className="bg-secondary-50 h-8"></div>
        </Skeleton>
        <Skeleton className="mt-3 w-20 rounded-md">
          <div className="bg-secondary-50 h-8"></div>
        </Skeleton>
        </div>
      </section>
    );
  }

  const maxlength = 20;
  const limitedName = name.length > maxlength ? name.substring(0, maxlength) + '...' : name;

  return (
    <section className='bg-white text-black w-auto object-cover flex flex-col justify-center items-center rounded-lg text-center border-2 border-gray-200 shadow-xl p-4 my-4'>
      <h1 className='mt-2 text-xl font-bold'>{limitedName}</h1>
      <img 
        src={`https://${image}`}
        alt={`Imagen paleta nro. ${idProducto}`}
        className="w-64 h-64 max-h-64 object-cover rounded-md mt-2"
      />
      <p className='font-semibold mt-2'>Marca: {brand}</p>
      <div className='w-full flex flex-col items-center justify-center mt-2'>
        <p className='text-xl font-bold bg-gradient-to-br from-green-950 to-green-400 bg-clip-text text-transparent'>9 cuotas de ${displayPrice}</p>
        <p className="font-light">Contado: ${price}</p>
      </div>
      <div className="flex justify-between items-center gap-4 my-4">
        {isInCart ? (
          <Button as={Link} href="/cart" className="bg-green-500 text-white font-medium text-md" endContent={<ArrowUpRight/>}>Ver Carrito</Button>
        ) : (
          <Button onClick={handleAddToCart} className="bg-blue-500 text-white font-medium text-md" startContent={<Basket size={20}/>}>Añadir</Button>
        )}
        <Link key={idProducto} href={`/products/${idProducto}`} className="hover:underline">Ver más</Link>
      </div>
    </section>
  );
}

export default ProductsCard
