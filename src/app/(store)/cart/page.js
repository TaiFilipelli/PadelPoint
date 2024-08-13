'use client';
import { Poppins } from "next/font/google";
import { useCartStore } from "src/data/useCartStore";
import { useState, useEffect } from "react";
import { getOneProductById } from "src/data/data";
import { SmileySad } from "@phosphor-icons/react";

const pop = Poppins({subsets:['latin'],weight:['700','300']})
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
        <section className="p-20">
            <h1 className={`${pop.className} text-5xl font-bold`}>Carrito</h1>
            {products.length === 0 ? (
                <section className="flex flex-col my-10 items-center justify-center w-full">
                    <h2 className={`${pop.className} font-semibold text-3xl m-2`}>Tu carrito está vacío</h2>
                    <SmileySad size={70}/>
                </section>
      ) : (
        products.map(product => (
          <section key={product.id} className="flex items-center justify-between border-b-2 pb-4 mb-4">
            <div className="flex items-center">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p>Marca: {product.brand.name}</p>
                <p>Precio: US${product.price}</p>
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(product.id)} 
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Eliminar
            </button>
          </section>
        ))
      )}
        </section>
    );
}