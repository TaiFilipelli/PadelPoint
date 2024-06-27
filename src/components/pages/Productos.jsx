import { useState, useEffect, useCallback } from "react";
import Filters from "../Filters";
import { getPaletas } from "../services/data";
import ProductsCard from '../ProductsCard';

const Productos = () => {
    const [paletas, setPaletas] = useState([]);
    const [filteredPaletas, setFilteredPaletas] = useState([]);

    const dataPaletas = async () => {
        try {
            const data = await getPaletas();
            setPaletas(data);
            setFilteredPaletas(data);
        } catch (error) {
            console.error('ERROR ACÁ, EN PRODUCTOS.JSX:', error);
        }
    };

    useEffect(() => {
        dataPaletas();
    }, []);

    const handleFilterChange = useCallback((filters) => {
        const { marca, precio } = filters;
        const filtered = paletas.filter(paleta => {
            const marcaMayus = marca.toUpperCase();
            const matchesMarca = marcaMayus ? paleta.brand === marcaMayus : true;
            const matchesPrecio = paleta.price >= precio[0] && paleta.price <= precio[1];
            return matchesMarca && matchesPrecio;
        });
        setFilteredPaletas(filtered);
    }, [paletas]);

    return (
        <section className='flex justify-center flex-col text-center'>
            <h1 className='text-4xl mb-4 mt-4 font-poppinsBold'>Productos</h1>
            <h3 className='text-2xl font-poppinsMedium'>Encontrá tu mejor compañera para la cancha.</h3>
            <Filters onFilter={handleFilterChange}/>
            <section className='products-section'>
                <div className="products-container flex flex-wrap">
                    {filteredPaletas.map(paleta => (
                        <ProductsCard key={paleta.id} nombre={paleta.model} image={paleta.image} brand={paleta.brand} precio={paleta.price} idProducto={paleta.id}/>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default Productos;
