import { Montserrat } from "next/font/google";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const mont = Montserrat({subsets:['latin'],weight:'600'});

export default function EditPage() {
    return (
        <section className="flex items-center flex-col">
            <h1 className={`${mont.className} text-3xl my-2`}>Menú de edición</h1>
            <div className="flex flex-row gap-4 p-6">
                <Button as={Link} href='/dashboard/edit/product' radius="large" className='bg-transparent border-1 border-white shadow-md shadow-white text-white text-xl p-6 hover:bg-gradient-to-br from-cyan-300 to-violet-300 hover:text-black transition-all'>Editar productos</Button>
            </div>
            <Link href='/dashboard' className="hover:underline hover:text-default-400">Volver al dashboard</Link>
        </section>
    );
}