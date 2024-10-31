'use client';

import { Button } from "@nextui-org/react";
import { createMPPreference, getOneProductById } from "../../../data/storeData";
import { checkUserState } from "../../../data/loginData";
import { useCartStore } from "../../../data/useCartStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { PuffLoader } from "react-spinners";

export default function MP_Page() {
    const cart = useCartStore((state) => state.cart) as Array<{id:string, cantidad:number}>;
    const searchParams = useSearchParams();
    const [addressId, setAddressId] = useState<number | null>(null);

    useEffect(() => {
        const addressParam = searchParams.get('addressId');
        setAddressId(addressParam ? parseInt(addressParam) : null);
        
        const fetchUser = async () => {
            const userState = await checkUserState();
            if (userState.isLogged) {
                const userId = userState.payload.id;
                sessionStorage.setItem('userId', userId);
            }
        };
        fetchUser();
    }, [searchParams]);

    interface Item {
        id: string;
        title: string;
        currency_id: string;
        picture_url?: string | null;
        description: string;
        category_id: string;
        quantity: number;
        unit_price: number;
    }

    interface Product {
        name: string;
        price: number;
        image: string;
        description: string;
    }

    const handlePreference = async () => {
        if (cart.length === 0) {
            window.location.href = '/cart';
            return;
        }

        try {
            const items: Item[] = await Promise.all(
                cart.map(async item => {
                    const product: Product = await getOneProductById(item.id);
                    return {
                        id: item.id.toString(),
                        title: product.name,
                        currency_id: 'ARS',
                        picture_url: product.image,
                        description: product.description,
                        category_id: "art",
                        quantity: item.cantidad,
                        unit_price: product.price
                    };
                })
            );

            const userId = parseInt(sessionStorage.getItem('userId') || '0', 10);
            const body = { addressId, userId, items };
            const link = await createMPPreference(body);

            if (link?.url) {
                window.location.href = link.url;
            } else {
                console.error("Error: ", link);
            }
        } catch (error) {
            console.error("Fatal error creating Mercado Pago payment preference:", error);
        }
    };

    return (
        <Suspense fallback={<PuffLoader size={100} color="#fff" />}>
            <section className="h-[60vh] flex flex-col items-center justify-center p-16 px-auto bg-[#264492]">
                <h1 className="my-4 font-bold text-4xl">Finalizar pago con MercadoPago</h1>
                <h3 className="text-xl font-medium mb-4">Haga click en el botón a continuación para redirigirlo a su billetera de pago</h3>
                <Button className="p-6 text-lg font-semibold mt-6 transition-all hover:scale-105 duration-700" onClick={handlePreference}>
                    Pagar con MercadoPago
                </Button>
            </section>
        </Suspense>
    );
}
