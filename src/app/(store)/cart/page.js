import { Poppins } from "next/font/google";

const pop = Poppins({subsets:['latin'],weight:['700','300']})
export default function Carrito() {
    return (
        <section className="p-20">
            <h1 className={`${pop.className} text-3xl font-semibold`}>Carrito</h1>
        </section>
    );
}