import { Warning } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
export default function FailurePage() {
    return (
        <section className="h-[65dvh] flex flex-col items-center p-16 px-auto bg-[#264492]">
            <div className="flex flex-col items-center">
                <Warning size={100} weight="regular" className="mt-10 animate-bounce"/>
                <h1 className="font-bold text-4xl">ERROR: El pago no pudo realizarse correctamente</h1>
            </div>
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
}