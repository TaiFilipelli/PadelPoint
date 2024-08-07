'use client';
import { Poppins } from "next/font/google";
import ProductsCard from "src/components/ProductsCard";
import { useEffect, useState } from "react";
import { getProducts} from "src/data/data";
import Filters from "src/components/Filters";

const pop = Poppins({subsets:["latin"], weight:'600'})
export default function Page() {
    const [paletas, setPaletas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dataPaletas = async (params) => {
        try {
            const data = await getProducts(params);
            setPaletas(data);
            setIsLoading(false);
        } catch (error) {
            console.error('ERROR ACÁ:', error);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        const brand = localStorage.getItem('selectedBrand');
        const name = localStorage.getItem('name');
        const minPrice = localStorage.getItem('minPrice');
        const maxPrice = localStorage.getItem('maxPrice');
        const params = {};

        if (brand !== null) params.brand = brand;
        if (name !== null && name!=='') params.name = name;
        //Lo que se extraña TypeScript, mamita... mirá esto:
        if (minPrice !== null) {
            const minPriceNumber = Number(minPrice);
            params.minPrice = minPriceNumber === 0 ? 1 : minPriceNumber;
        }
        if (maxPrice !== null) params.maxPrice = maxPrice;
        dataPaletas(params);
    }, []);

    return (
        <section className="flex justify-center items-center text-center flex-col p-10">
            <h1 className={`${pop.className} text-6xl mb-10`}>Productos</h1>
            <Filters/>
            <section className="w-4/5 max-w-[4/5] max-[1260px]:w-full">
                <div className="flex flex-wrap justify-center max-[600px]:pt-0 ">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
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