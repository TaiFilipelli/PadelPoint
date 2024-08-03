'use client';

import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

export default function ResultLogin() {

    const [isNewUser, setIsNewUser] = useState(false);

    const handleChange=()=>{
        setIsNewUser(!isNewUser);
    }

    return (
        <section className="flex items-center justify-center text-center p-20 flex-col">
            <Button onClick={handleChange} className="bg-blue-600 text-white">{isNewUser? 'No se encuentra usuario, es usuario nuevo':'Se encuentró usuario'}</Button>
            { isNewUser ?
            <section className="bg-gray-200 flex flex-col w-1/2 p-8 mt-10 rounded-lg text-left">
                <h1 className="font-bold text-3xl mb-2">Una última cosa...</h1>
                <h2 className="font-semibold text-xl mb-2">Bievenido a la familia PadelPoint! Como es su primera vez aquí, nos gustaría que ingrese un nombre de usuario por única vez
                    para reconocerlo futuras veces!
                </h2>
                <Input type="text" labelPlacement="outside" label='Nombre de usuario nuevo' className="mb-2"/>
                <Button className="bg-blue-500 rounded-lg p-4 w-1/4 text-white font-semibold text-xl">Unirme</Button>
            </section>
            :
            <section className="flex flex-col items-center text-center p-10">
                <h1 className="text-green-700 font-bold text-4xl mb-4">Bienvenido, NOMBREDEUSUARIO!</h1>
                <h2 className="font-semibold text-xl mb-8">Puede retornar a la tienda y comprar libremente</h2>
                <Link href='/' className="hover:underline">Volver al inicio</Link>
            </section>
            }
        </section>
    );
}