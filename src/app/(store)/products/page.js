import { Poppins } from "next/font/google";
import ProductsCard from "../../../components/ProductsCard";

const pop = Poppins({subsets:["latin"], weight:'600'})
export default function Page() {
    return (
        <section className="flex justify-center items-center text-center flex-col p-10">
            <h1 className={`${pop.className} text-5xl`}>Productos</h1>
            <section className="flex flex-wrap w-full gap-20 mt-10">
                <ProductsCard model='Adidas 1'/>
                <ProductsCard model='UNA PALETA MAS LARGA PARA PROBAR EL LIMITED NAME'/>
            </section>
        </section>
    );
}