'use client';
import { Poppins } from "next/font/google";
import { useCartStore } from "src/data/useCartStore";
import { useState, useEffect } from "react";
import { getOneProductById } from "src/data/data";
import { SmileySad, Trash } from "@phosphor-icons/react";
import { Divider, Button } from "@nextui-org/react";

const pop = Poppins({subsets:['latin'],weight:['700','400']})
export default function Carrito() {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          if (cart.length > 0) {
            const productsData = await Promise.all(cart.map(async id => {
              const res = await getOneProductById(id);
              return res;
            }));
            setProducts(productsData);
          }
        };
    
        fetchProducts();
      }, [cart]);

    return (
        <section className="p-16 flex flex-col items-center text-center">
            <h1 className={`${pop.className} text-5xl font-bold mb-4`}>Carrito</h1>
              {products.length < 1 ? (
                <section className="flex flex-col my-10 items-center justify-center rounded-3xl p-11 border-1 border-black bg-default-100">
                    <h2 className={`${pop.className} font-semibold text-3xl m-2`}>Tu carrito está vacío</h2>
                    <SmileySad size={80}/>
                </section>
              ) : (
                products.map(product => (
                  <section key={product.id} className={`${pop.className} flex items-center justify-between p-4 my-4 w-2/5 bg-default-300 rounded-lg`}>
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="ml-4 text-left">
                        <h2 className='text-lg font-semibold'>{product.name}</h2>
                        <p className='font-normal'>Marca: {product.brand.name}</p>
                        <p className='font-normal'>Precio: US${product.price}</p>
                      </div>
                   </div>
                    <button 
                      onClick={() => removeFromCart(product.id)} 
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400 transition-all font-medium">
                      <Trash size={25}/>
                    </button>
                  </section>
              ))
            )}
            <Divider/>
            <div className={`${pop.className} flex flex-row text-left justify-between items-center w-2/5 mt-6`}>
              <h1 className="font-medium text-xl">Total a pagar:</h1>
              <Button isDisabled className='text-white font-medium text-xl bg-red-600'>Finalizar pago</Button>
            </div>
        </section>
    );
}