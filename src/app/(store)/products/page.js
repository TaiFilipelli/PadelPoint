'use client';
import { Poppins } from "next/font/google";
import ProductsCard from "../../../components/ProductsCard";
import { useEffect, useState } from "react";
import { getProducts } from "src/data/data";

const pop = Poppins({subsets:["latin"], weight:'600'})
export default function Page() {
    const [paletas, setPaletas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dataPaletas = async () => {
        try {
            const data = await getProducts();
            setPaletas(data);
            setIsLoading(false);
        } catch (error) {
            console.error('ERROR ACÁ:', error);
        }
    };

    useEffect(() => {
        dataPaletas();

    }, []);

    return (
        <section className="flex justify-center items-center text-center flex-col p-10">
            <h1 className={`${pop.className} text-5xl`}>Productos</h1>
            <section className="w-4/5 mt-10 max-w-[4/5] max-[1260px]:w-full">
                <div className="flex flex-wrap max-[600px]:pt-0">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <ProductsCard key={index} isLoading={true} />
                        ))
                    ) : (
                        paletas.map(paleta => (
                            <ProductsCard 
                                key={paleta.id} 
                                name={paleta.name} 
                                image={paleta.image} 
                                brand={paleta.brand.name} 
                                price={paleta.price}
                                idProducto={paleta.id}
                                isLoading={false}
                            />
                        ))
                    )}
                </div>
            </section>
        </section>
    );
}