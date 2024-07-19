'use client';
import { Poppins } from "next/font/google";
import ProductsCard from "../../../components/ProductsCard";
import { useEffect, useState } from "react";
import { getProducts } from "src/data/data";
import Link from "next/link";

const pop = Poppins({subsets:["latin"], weight:'600'})
export default function Page() {
    const [paletas, setPaletas] = useState([]);
    const dataPaletas = async () => {
        try {
            const data = await getProducts();
            setPaletas(data);
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
            <section className="flex flex-wrap w-full gap-20 mt-10">
                <div className="flex flex-wrap max-[600px]:pt-0">
                    {paletas.map(paleta => (
                        <ProductsCard 
                            key={paleta.id} 
                            name={paleta.name} 
                            image={paleta.image} 
                            brand={paleta.brand.name} 
                            price={paleta.price}
                            idProducto={paleta.id}
                        />
                        
                    ))}
                </div>
            </section>
        </section>
    );
}