'use client';
import { Roboto, Montserrat } from "next/font/google";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { updateProductPrice } from "src/data/data";

const robtop = Roboto({ subsets: ['greek'], weight: '300' });
const mont = Montserrat({ subsets: ['latin'], weight: '600' });

export default function EditRacket() {
    const [id, setId] = useState(null);
    const [price, setPrice] = useState(null);
    const [isDone, setIsDone] = useState(null);

    const handleUpdatePrice = async () => {
        try {
            const result = await updateProductPrice(id, price);
            console.log('Resultado de la actualización:', result);
            setIsDone(true);
        } catch (error) {
            console.error('Error al actualizar el precio:', error);
            setIsDone(false);
        }
    };

    return (
        <section className={`rounded-lg bg-black text-white w-full p-10 text-center flex flex-col my-8 ${robtop.className} items-center`}>
            <h1 className={`${mont.className} text-3xl my-2`}>Editar paletas</h1>
            <h2 className={`${mont.className} text-xl mb-10`}>Ingresa a continuación el id de la paleta y el nuevo precio a editar.</h2>
            <div className="w-1/12">
                <Input type="number" label='ID de paleta' value={id} onChange={(e) => setId(Number(e.target.value))} className="mb-5" />
                <Input type="number" label='Nuevo precio' value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mb-5" />
            </div>
            <Button onClick={handleUpdatePrice} className="mb-5 w-[11rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg">Actualizar Precio</Button>
            {isDone ? <p className="text-green-700 font-semibold text-lg">Precio actualizado con éxito!</p> : <p className="text-red-600 font-semibold text-lg">Hubo un error. Consultar error de la api</p>}
            <Link href='/dashboard' className="hover:underline">Volver atrás</Link>
            <Link href='/' className="hover:underline">Volver a la tienda</Link>
        </section>
    );
}
