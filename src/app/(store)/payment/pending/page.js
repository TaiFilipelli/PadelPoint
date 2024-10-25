import { Clock } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
export default function PendingPage() {
    return (
        <section className="h-[60dvh] bg-[#264492] flex flex-col items-center justify-center p-16 px-auto">
            <Clock size={100} weight="regular"/>
            <h1 className="font-bold text-4xl mt-2">El pago está pendiente</h1>
            <h3 className="mt-5 mb-1 text-2xl">Puede hacer un seguimiento de estado de la transacción en su billetera virtual de MercadoPago o <Link href={'/profile'} className="underline">en su perfil.</Link></h3>
            <p className="text-lg">Si surge algún inconveniente relacionado con la compra, no dude en comunicarse con nosotros por los medios oficiales!</p>
            <Link href={'/'} className="bg-red-600 text-white font-semibold text-lg p-4 rounded-lg hover:bg-red-400 transition-colors mt-5">Volver al inicio</Link>
        </section>
    );
}