'use client';
import { Poppins } from "next/font/google";
import ProductsCard from "../../../components/ProductsCard";
import { useEffect, useState } from "react";
import { getProducts} from "../../../data/storeData";
import Filters from "../../../components/Filters";
import { SmileySad } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";

const pop = Poppins({subsets:["latin"], weight:'600'});


export default function ProductsList() {
    
    const params = useSearchParams();

    const [products, setProducts] = useState([]);
    const [validatedImages, setValidatedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        brand: '',
        name: '',
        minPrice: 1,
        maxPrice: 1000000,
        type: '',
    });
    
    useEffect(() => {

        const updatedFilters = {
            brand: params.get('brand') || "",
            type: params.get('type') || "",
        };

        setFilters(updatedFilters);
    },[]);

    useEffect(() => {
        if (products.length > 0) {
            const validateImages = async () => {
                const results = {};

                const checkImage = (url) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => resolve({ url, isValid: true });
                        img.onerror = () => resolve({ url, isValid: false });
                        img.src = `https://${url}`;
                    });
                };

                await Promise.all(
                    products.map((product) =>
                        checkImage(product.image).then((result) => {
                            results[product.id] = result.isValid
                                ? `https://${product.image}`
                                : "/LogoPadelPoint.png";
                        })
                    )
                );

                console.log('resultados de imagenes:',results);
                setValidatedImages(results);
            };

            validateImages();
        }
    }, [products]);

    const dataProducts = async () => {
        try {
            const data = await getProducts(filters);
            setProducts(data.recourse);
            setIsLoading(false);
        } catch (error) {
            console.error('ERROR ACÁ:', error);
            setIsLoading(true);
        }
    };

    useEffect(() => {
        dataProducts();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    }

    return (
        <section className="flex justify-center items-center text-center flex-col py-10 px-5 mt-6 bg-[#264492]">
            <h1 className={`${pop.className} text-6xl mb-10 max-[390px]:text-4xl`}>Productos</h1>
            <Filters filters={filters} onFilterChange={handleFilterChange}/>
            <section className="w-4/5 max-w-[4/5] max-[1260px]:w-full">
                <div className="flex flex-wrap justify-center max-[600px]:pt-0 gap-3">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <ProductsCard key={index} isLoading={true} />
                        ))
                    ) : products.length>0 ? (
                        products.map(paleta => (
                            <ProductsCard 
                                key={paleta.id} 
                                name={paleta.name} 
                                image={/*paleta.image*/ validatedImages[paleta.id] || "/LogoPadelPoint.png"}
                                brand={paleta.brand.name} 
                                price={paleta.price}
                                idProducto={paleta.id}
                                isLoading={false}
                            />
                        ))
                    ) : (
                        <article className="bg-default-200 text-black rounded-3xl p-16 flex flex-col items-center justify-center">
                            <h2 className={`${pop.className} font-semibold text-3xl m-4`}>No tenemos productos disponibles!</h2>
                            <SmileySad size={100} />
                        </article>
                    )}
                </div>
            </section>
        </section>
    );
}