import { CheckFat } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <section className="h-[60vh] flex flex-col items-center justify-center bg-[#264492] p-16 px-auto">
            <CheckFat size={100} weight="fill" className="animate-bounce"/>
            <h1 className="my-4 font-bold text-4xl">Pago exitoso!</h1>
            <h3 className="text-xl font-medium">Puede realizar el seguimiento y los detalles de su orden en su perfil.</h3>
            <div className="flex flex-row gap-16 justify-center">
                <Link href={'/profile'} className="bg-red-600 text-white text-lg font-semibold p-4 rounded-lg mt-6">Ir a su perfil</Link>
                <Link href={'/'} className="bg-red-600 text-white text-lg font-semibold p-4 rounded-lg mt-6">Volver al inicio</Link>
            </div>
        </section>
    );
}