import { Poppins } from "next/font/google";
import Link from "next/link";

const popTitle = Poppins({subsets:['latin'], weight:'600'})
const popDesc = Poppins({subsets:['latin'], weight:'300'})

export default function Page404() {
    return (
        <section className="flex flex-col items-center justify-center text-center p-20 max-[400px]:p-10 bg-[#264492]">
            <img src="/404.png" className="h-[21rem] max-[500px]:h-auto"/>
            <h1 className={`${popTitle.className} text-5xl max-[400px]:text-3xl mb-4`}>Error 404: Not Found</h1>
            <h2 className={`${popDesc.className} text-2xl max-[400px]:text-xl mb-8`}>No se ha encontrado la página que busca</h2>
            <Link href='/' className={`${popDesc.className} text-xl underline`}>Volver al inicio</Link>
        </section>
    );
}