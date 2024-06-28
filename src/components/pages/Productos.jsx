import { useState, useEffect, useCallback } from "react";
import Filters from "../Filters";
import { getPaletas, getOnePaleta } from "../services/data";
import ProductsCard from '../ProductsCard';
import Carrito from '../Carrito';
import { Toaster, toast } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Productos = () => {
    const [paletas, setPaletas] = useState([]);
    const [filteredPaletas, setFilteredPaletas] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const notify = () => toast.success('Producto añadido al carrito!')

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

    const addToCart = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debe iniciar sesión para añadir al carrito.');
            return;
        }

        try {
            const paleta = await getOnePaleta(id);
            const newItem = { id: paleta.id, name: paleta.model, price: paleta.price };
            const updatedItems = [...cartItems, newItem];
            setCartItems(updatedItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            <Toaster/>
        } catch (error) {
            console.error('Error añadiendo al carrito:', error);
        }
    };

    const removeFromCart = (id) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    return (
        <section className='flex justify-center flex-col text-center items-center h-4/5 max-[660px]:ml-16 max-[600px]:h-full'>
            <h1 className='text-4xl mb-4 mt-4 font-poppinsBold'>Productos</h1>
            <h3 className='text-2xl font-poppinsMedium'>Encontrá tu mejor compañera para la cancha.</h3>
            <Filters onFilter={handleFilterChange} />
            <Carrito items={cartItems} removeFromCart={removeFromCart} />
            <section className='products-section mt-4 '>
                <div className="products-container flex flex-wrap max-[600px]:pt-0">
                    {filteredPaletas.map(paleta => (
                        <ProductsCard 
                            key={paleta.id} 
                            nombre={paleta.model} 
                            image={paleta.image} 
                            brand={paleta.brand} 
                            precio={paleta.price} 
                            idProducto={paleta.id} 
                            addToCart={addToCart} 
                        />
                    ))}
                </div>
            </section>
        </section>
    );
};

export default Productos;
