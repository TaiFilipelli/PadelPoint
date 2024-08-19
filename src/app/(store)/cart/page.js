'use client';
import { Poppins } from "next/font/google";
import { useCartStore } from "src/data/useCartStore";
import { useState, useEffect } from "react";
import { getOneProductById } from "src/data/data";
import { SmileySad, Trash, LockKey, Plus, Minus } from "@phosphor-icons/react";
import { Divider, Button } from "@nextui-org/react";

const pop = Poppins({subsets:['latin'],weight:['700','400']});

export default function Cart() {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateCartItem = useCartStore((state) => state.updateCartItem);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          if (cart.length > 0) {
            const productsData = await Promise.all(cart.map(async item => {
              const res = await getOneProductById(item.id);
              return { ...res, cantidad: item.cantidad };
            }));
            setProducts(productsData);
          }
          else{
            setProducts([]);
          }
        };
        fetchProducts();
      }, [cart]);

    const handleIncrease = (idProducto, cantidad) => {
        const newCantidad = cantidad + 1;
        updateCartItem(idProducto, newCantidad);
    };

    const handleDecrease = (idProducto, cantidad) => {
        if (cantidad > 1) {
            const newCantidad = cantidad - 1;
            updateCartItem(idProducto, newCantidad);
        }
    };

    return (
        <section className="p-16 flex flex-col items-center text-center bg-[#264492]">
            <h1 className={`${pop.className} text-5xl font-bold mb-4`}>Carrito</h1>
            {products.length < 1 ? (
                <section className="flex flex-col my-10 items-center justify-center rounded-3xl p-11 border-1 border-black bg-default-100 text-black">
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
                        <div className="flex items-center gap-2 my-2">
                            <Button onClick={() => handleDecrease(product.id, product.cantidad)} className="bg-transparent text-black px-2"><Minus weight="regular" size={20}/></Button>
                            <p className="font-medium">{product.cantidad}</p>
                            <Button onClick={() => handleIncrease(product.id, product.cantidad)} className="bg-transparent text-black px-2"><Plus/></Button>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-red-500 text-white px-2" onClick={() => removeFromCart(product.id)}>
                        <Trash size={24} />
                    </Button>
                  </section>
                ))
            )}
            <Divider/>
            <div className="flex flex-row justify-between w-1/2 my-4">
              <h3 className="text-3xl font-semibold">Subtotal: $$$</h3>
              <Button className="bg-red-600 text-white font-semibold text-xl px-6 py-6" startContent={<LockKey weight="duotone" size={25}/>} isDisabled>Finalizar compra</Button>
            </div>
        </section>
    );
}
