'use client'
import { CheckFat, Clock, Warning } from "@phosphor-icons/react";
import { useSearchParams } from 'next/navigation';
import { PuffLoader } from "react-spinners";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ResultPaymentPage() {

    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const params = useSearchParams();
    const paymentId = params.get('payment_id');
    const paymentStatus = params.get('status');


    console.log('El pago ',paymentId,' tiene el estado ',paymentStatus);

    let content;
    switch (status) {
        case 'approved':
            content = (
                <section className="flex flex-col items-center">
                    <CheckFat size={100} weight="fill" className="animate-bounce"/>
                    <h1 className="font-bold text-4xl mb-5">Pago exitoso!</h1>
                    <h3 className="text-xl font-medium">Puede realizar el seguimiento y los detalles de su orden en su perfil.</h3>
                    <div className="flex flex-row gap-16 justify-center mt-6">
                        <Link href={'/profile'} className="bg-red-600 text-white text-lg font-semibold px-6 py-3 rounded-lg">Ir a su perfil</Link>
                        <Link href={'/'} className="bg-red-600 text-white text-lg font-semibold px-6 py-3 rounded-lg">Volver al inicio</Link>
                    </div>
                </section>
            );
            break;
        case 'pending':
            content = (
                <section className="flex flex-col items-center">
                    <Clock size={100} weight="regular"/>
                    <h1 className="font-bold text-4xl">El pago está pendiente</h1>
                    <h3 className="mt-5 mb-1 text-2xl">Puede hacer un seguimiento de estado de la transacción en su billetera virtual de MercadoPago o <Link href={'/profile'} className="underline">en su perfil.</Link></h3>
                    <p className="text-lg">Si surge algún inconveniente relacionado con la compra, no dude en comunicarse con nosotros por los medios oficiales!</p>
                    <Link href={'/'} className="bg-red-600 text-white font-semibold text-lg p-4 rounded-lg hover:bg-red-400 transition-colors mt-5">Volver al inicio</Link>
                </section>
            );
            break;
        case 'failure':
            content = (
                <section className="flex flex-col items-center">
                    <Warning size={100} weight="regular" className="mt-10 animate-bounce"/>
                    <h1 className="font-bold text-4xl">ERROR: El pago no pudo realizarse correctamente</h1>
                    <h2 className="text-2xl font-semibold mt-8">No pudimos concretar el pago de la forma deseada. Puede deberse a:</h2>
                    <ul className="list-disc my-5 text-xl">
                        <li>
                            <span className="font-bold">Fondos insuficientes:</span> Verifique contar con los fondos suficientes en su cuenta para poder finalizar el pago.
                        </li>    
                        <li>
                            <span className="font-bold">Problemas de red:</span> A veces, alguna inestabilidad de red puede generar problemas. Verifique tener una conexión estable.
                        </li>    
                        <li>
                            <span className="font-bold">Problemas de comunicación con MercadoPago:</span> Los servidores de Mercado Pago pueden sufrir inestabilidades de servidores. Inténtelo nuevamente más tarde
                    </li>    
                    </ul>
                    <p className="text-2xl my-5">Verifique estos puntos y vuelva a intentarlo.</p>
                    <Link href={'/cart'} className="bg-red-600 hover:bg-red-300 text-white text-lg font-semibold rounded-lg p-4 transition-colors">Volver al carrito</Link>
                </section>
            );
            break;
        default:
            content = (
                <section className="flex flex-col items-center">
                    <Warning size={100} weight="regular" className="mt-10 animate-bounce"/>
                    <h1 className="font-bold text-3xl">ERROR: El pago se ha irrumpido abruptamente. Inténtelo de nuevo más tarde.</h1>
                    <Link href={'/cart'} className="bg-red-600 hover:bg-red-300 text-white text-lg font-semibold rounded-lg p-4 transition-colors mt-6">Volver al carrito</Link>
                </section>
            );
    }

    useEffect(() => {
        if(paymentId){
            setIsLoading(false);
            setStatus(paymentStatus);
        }else{
            setTimeout(() => {
                setStatus(paymentStatus);
            }, 1000);
        }
    }, []);

    return (
        <section className="h-[60dvh] flex flex-col items-center justify-center p-16 px-auto bg-[#264492]">
            {isLoading ? (
                <PuffLoader size={100} color="#fff"/>
            ) : (
                content
            )}
        </section>
    );
}
