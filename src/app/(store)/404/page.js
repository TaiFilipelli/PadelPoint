import { Poppins } from "next/font/google";
import Link from "next/link";

const popTitle = Poppins({subsets:['latin'], weight:'600'})
const popDesc = Poppins({subsets:['latin'], weight:'300'})

export default function Page404() {
    return (
        <section className="flex flex-col items-center justify-center text-center p-20 bg-[#264492]">
            <img src="/404.png" className="h-[21rem]"/>
            <h1 className={`${popTitle.className} text-5xl`}>Error 404: Not Found</h1>
            <h2 className={`${popDesc.className} text-2xl mb-4`}>No se ha encontrado la página que busca</h2>
            <Link href='/' className={`${popDesc.className} text-xl hover:underline`}>Volver al inicio</Link>
        </section>
    );
}