'use client';
import { Poppins } from "next/font/google";
import ProductsCard from "../../../components/ProductsCard";
import { useEffect, useState } from "react";
import { getProducts} from "../../../data/storeData";
import Filters from "../../../components/Filters";

const pop = Poppins({subsets:["latin"], weight:'600'})
export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dataProducts = async (params) => {
        try {
            const data = await getProducts(params);
            setProducts(data.recourse);
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
        const type = localStorage.getItem('type');
        const params = {};

        if (brand !== null) params.brand = brand;
        if (name !== null && name!=='') params.name = name;
        if (minPrice !== null) {
            const minPriceNumber = Number(minPrice);
            params.minPrice = minPriceNumber === 0 ? 1 : minPriceNumber;
        }
        if (maxPrice !== null) params.maxPrice = maxPrice;
        if(type!==null) params.type = type;
        dataProducts(params);
    }, []);

    return (
        <section className="flex justify-center items-center text-center flex-col py-10 px-5 bg-[#264492]">
            <h1 className={`${pop.className} text-6xl mb-10 max-[390px]:text-4xl`}>Productos</h1>
            <Filters/>
            <section className="w-4/5 max-w-[4/5] max-[1260px]:w-full">
                <div className="flex flex-wrap justify-center max-[600px]:pt-0 gap-3">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <ProductsCard key={index} isLoading={true} />
                        ))
                    ) : (
                        products.map(paleta => (
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