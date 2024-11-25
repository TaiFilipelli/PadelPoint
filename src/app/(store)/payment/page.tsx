'use client';
import { Button } from "@nextui-org/react";
import {createMPPreference, getOneProductById} from "../../../data/storeData";
import { checkUserState } from "../../../data/loginData";
import {useCartStore} from "../../../data/useCartStore";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { PuffLoader } from "react-spinners";
import { trackInitiateCheckout } from "../../../../utils/pixel";

export default function MP_Page() {
    
    const cart = useCartStore((state) => state.cart) as Array<{id:string, cantidad:number}>;
    const searchParams = useSearchParams();
    const addressId = parseInt(searchParams.get('addressId'));
    localStorage.setItem('addressId', addressId.toString());
    useEffect(() => {
        const fetchUser = async () => {
            const userState = await checkUserState();
            console.log(userState);
            if (userState.isLogged) {
                const userId = userState.payload.id;
                localStorage.setItem('userId', userId);
                console.log(userId);
            }
        };
        
        fetchUser();
    }, []);
    
    interface Item {
        id:          string;
        title:       string;
        currency_id: string;
        picture_url?: string | null;
        description: string;
        category_id: string;
        quantity:    number;
        unit_price:  number;
    }
    interface Product{
        name: string;
        price: number;
        image: string;
        description: string;
    }

    const handlePreference = async() =>{
        if(cart.length === 0){
            window.location.href = '/cart';
        }

        try{
            const items:Item[] = await Promise.all(
                cart.map(async item => {
                const product:Product = await getOneProductById(item.id);
                console.log(product)
                return{
                    id: item.id.toString(),
                    title: product.name,
                    currency_id:'ARS',
                    picture_url: product.image,
                    description: product.description,
                    category_id: "art",
                    quantity: item.cantidad,
                    unit_price: product.price
                }
            }));
            const userId = parseInt(localStorage.getItem('userId'));
            const body = {addressId:addressId, userId:userId, items};
            const link = await createMPPreference(body);
            console.log(link);
            if(link!=undefined){
                const totalValue = items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);
                trackInitiateCheckout(totalValue, 'ARS');
                window.location.href = link.url;
                console.log(link)
            }else{
                console.error('There is an internal issue with MP preference creation');
            }
            console.log(link.status);
        }catch(error){
            console.error("Fatal error creating Mercado Pago payment preference:", error);
        }
        
    }

    return (
        <Suspense fallback={<PuffLoader size={100} color="#fff"/>}>
            <section className="h-[60vh] flex flex-col items-center justify-center p-16 px-auto bg-[#264492]">
                <h1 className="my-4 font-bold text-4xl">Finalizar pago con MercadoPago </h1>
                <h3 className="text-xl font-medium mb-4">Haga click en el botón a continuación para redirigirlo a su billetera de pago</h3>
                <Button className="p-6 text-lg font-semibold mt-6 transition-all hover:scale-105 duration-700" onClick={handlePreference}>Pagar con MP</Button>
            </section>
        </Suspense>
    );
}