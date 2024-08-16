'use client';
import { Roboto, Montserrat } from "next/font/google";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { updateProductPrice } from "src/data/data";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const robtop = Roboto({ subsets: ['greek'], weight: '300' });
const mont = Montserrat({ subsets: ['latin'], weight: '600' });

export default function EditProduct() {
    const [id, setId] = useState(null);
    const [price, setPrice] = useState(null);

    const handleUpdatePrice = async () => {
        try {
            const result = await updateProductPrice(id, price);
            console.log('Resultado de la actualización:', result);
            toast.success('Paleta actualizada con éxito')
        } catch (error) {
            toast.error('Error actualizando la paleta')
            console.error('Error al actualizar el precio:', error);
        }
    };

    return (
        <section className={`rounded-lg bg-black text-white w-full p-10 text-center flex flex-col my-8 ${robtop.className} items-center`}>
            <h1 className={`${mont.className} text-3xl mb-2`}>Editar productos</h1>
            <h2 className={`${mont.className} text-xl mb-1`}>Ingresá a continuación el id del producto a modificar y el nuevo precio a editar.</h2>
            <p className="text-md mb-8">Recordar que los precios están en dólares. Escribir únicamente el número, sin puntos o comas</p>
            <div className="w-1/12">
                <Input type="number" label='ID de producto' value={id} onChange={(e) => setId(Number(e.target.value))} className="mb-4"/>
                <Input type="number" label='Nuevo precio' value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mb-5" />
            </div>
            <Button onClick={handleUpdatePrice} className="mb-5 w-[11rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg">Actualizar Precio</Button>
            <ToastContainer position="bottom-right" autoClose={2500} transition={Slide} theme="light" closeOnClick draggable/>
            <Link href='/dashboard/edit' className="hover:underline">Volver atrás</Link>
            <Link href='/' className="hover:underline">Volver a la tienda</Link>
        </section>
    );
}
