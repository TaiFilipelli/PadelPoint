'use client'
import { useRouter } from "next/navigation";
import { Button, Skeleton } from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import { useCartStore } from "../../../../data/useCartStore";
import { getOneProductById } from "../../../../data/data";
import Link from "next/link";

import { Poppins } from "next/font/google";
const pop = Poppins({subsets:['latin'], weight:['300','400','600']})

export default function PaymentMethodPage() {

    const cart = useCartStore((state)=>state.cart);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const message = useMemo(() => {
        if (products.length === 0) return '';

        let message = 'Hola! Deseo comprar los siguientes productos:%0A';

        products.forEach((product) => {
            message += `${product.cantidad}x ${product.name} - $${product.price}%0A`;
        });

        const total = products.reduce((acc, product) => acc + (product.cantidad * product.price), 0);
        message += `Total: $${total}`;

        setIsLoading(false);
        return message;
    }, [products]);

    const linkBuilder = () =>{
        const number = '3364181788';
        console.log(`https://wa.me/${number}?text=${message}`)
        return `https://wa.me/${number}?text=${message}`;
    }

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

    return (
        <section className={`${pop.className} p-16 flex flex-col items-center text-center bg-[#264492]`}>
            <h1 className="font-semibold text-4xl">Finalizar pago</h1>
            <h3 className="font-normal text-xl mt-6">Seleccione el método de pago deseado</h3>
            <div className="flex flex-col w-1/6 gap-6 my-10">
            {isLoading? 
                <>
                <Skeleton className="w-full rounded-xl">
                    <div className="bg-secondary-700 p-6"/>
                </Skeleton>
                <Skeleton className="w-full rounded-xl">
                    <div className="bg-secondary-700 p-6"/>
                </Skeleton>
                <Skeleton className="w-full rounded-xl">
                    <div className="bg-secondary-700 p-6"/>
                </Skeleton>
                </>
            :
                <>
                <Button isDisabled className="text-lg p-6">Tarjetas de crédito</Button>
                <Button isDisabled className="text-lg p-6">Depósito o similares</Button>
                <Button as={Link} href={linkBuilder()} color="success" className="text-white text-lg p-6">Efectivo/transferencia</Button>
                </>
        }
            </div>
        </section>
    );
}