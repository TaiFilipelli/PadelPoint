'use client'
import React, { useState } from 'react';
import { useCartStore } from "../../data/useCartStore";
import { Plus, Check } from "@phosphor-icons/react/dist/ssr";
import { Button } from '@nextui-org/react';

export function Accesories({accessories}){

const addCartItem = useCartStore((state) => state.addToCart);

const [adddedAccessorie, setAdddedAccessorie] = useState(false);

const handleAccessorieAdd = (accesorie) => {
    addCartItem(accesorie.id, 1);
    setAdddedAccessorie(true);
}

return (
    <section className="my-6">
    <h3 className="font-bold text-2xl my-2">Accesorios recomendados</h3>
    <p className="text-lg ">Preparamos accesorios perfectos para estos productos.</p>
    {accessories.map(accessorie =>(
        <div key={accessorie.id} className="flex flex-row justify-between items-center gap-4 w-auto max-[470px]:w-full my-4 text-black bg-white p-4 rounded-3xl">
            <article className='flex flex-col'>
                <img src={`https://${accessorie.image}`} alt="Imagen de accesorio" className="w-20 h-20 object-cover rounded-lg"/>
                <h3 className="font-bold text-2xl mb-2">{accessorie.name}</h3>
                <p className="text-lg">{accessorie.description}</p>
            </article>
            <article className='flex flex-row gap-2'>
                <Button className="bg-green-500 text-white px-2" onClick={()=>handleAccessorieAdd(accessorie)}>
                    {adddedAccessorie ? <Check size={24}/> : <>${accessorie.price}<Plus size={24} /></> }  
                </Button>
            </article>
        </div>
    ))}
    </section>
)
}