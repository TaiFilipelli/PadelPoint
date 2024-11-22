import { Poppins } from 'next/font/google'
import { Button } from '@nextui-org/react';
import { Trash, Minus, Plus, SmileySad } from '@phosphor-icons/react/dist/ssr';
import { useCartStore } from '../../data/useCartStore';

const pop = Poppins({ subsets: ['latin'], weight: ['700', '600', '400'] });

export function Products({ products }) {
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateCartItem = useCartStore((state) => state.updateCartItem);

    const handleIncrease = (idProducto, cantidad) => {
        const newCantidad = cantidad + 1;
        updateCartItem(idProducto, newCantidad);
    };

    const handleDecrease = (idProducto, cantidad) => {
        if (cantidad > 1) {
            const newCantidad = cantidad - 1;
            updateCartItem(idProducto, newCantidad);
        }
    };

    return (
        products.length < 1 ? (
            <section className="flex flex-col my-10 items-center justify-center rounded-3xl p-11 border-1 border-black bg-default-100 text-black">
                <h2 className={`${pop.className} font-semibold text-3xl m-2`}>Tu carrito está vacío</h2>
                <SmileySad size={80} />
            </section>
        ) : (
            products.map(product => (
                <section key={product.id} className={`${pop.className} sm:flex overflow-x-auto items-center justify-between p-4 my-4 w-2/5 max-[1080px]:w-[70%] max-[650px]:w-full bg-default-300 rounded-lg text-black`}>
                    <div className="flex items-center max-[440px]:flex-wrap">
                        <img src={`https://${product.image}`}  alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="ml-4 text-left">
                            <h2 className='text-lg font-semibold'>{product.name}</h2>
                            <p className='font-normal'>Marca: {product.brand.name}</p>
                            <p className='font-normal'>Precio: ARS${product.price}</p>
                            <div className="flex items-center gap-2 my-2">
                                <Button onClick={() => handleDecrease(product.id, product.cantidad)} className="bg-transparent text-black px-2"><Minus weight="regular" size={20} /></Button>
                                <p className="font-medium">{product.cantidad}</p>
                                <Button onClick={() => handleIncrease(product.id, product.cantidad)} className="bg-transparent text-black px-2"><Plus weight='regular' size={20} /></Button>
                            </div>
                        </div>
                    </div>
                    <Button className="bg-red-500 text-white px-2" onClick={() => removeFromCart(product.id)}>
                        <Trash size={24} />
                    </Button>
                </section>
            ))
        )
    );
}
