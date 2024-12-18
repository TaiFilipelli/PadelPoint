'use client'
import React, { useState } from 'react';
import { useCartStore } from "../../data/useCartStore";
import { Plus, Check } from "@phosphor-icons/react/dist/ssr";
import { Button, Link } from '@nextui-org/react';

export function Accesories({accessories}){

const addCartItem = useCartStore((state) => state.addToCart);

const [adddedAccessory, setAdddedAccessory] = useState(false);

const handleAccessorieAdd = (accesory) => {
    addCartItem(accesory.id, 1);
    setAdddedAccessory(true);
}

const maxlength = 70;

return (
    <section className="my-6">
    <h3 className="font-bold text-2xl my-2">Accesorios recomendados</h3>
    <p className="text-lg ">Preparamos accesorios perfectos para estos productos.</p>
    {accessories.map(accessory =>{
            const limitedDesc = accessory.description.length > maxlength
            ? accessory.description.substring(0, maxlength) + "..."
            : accessory.description;

            const checkImage = new Image();
            checkImage.src = accessory.image;
            checkImage.onerror = () => {
                accessory.image = '/LogoPadelPoint.png';
                return;
            }
            checkImage.onload = () => {
                return;
            }
            
        return(
        <div key={accessory.id} className="flex flex-row justify-between items-center gap-4 w-2/5 max-[1080px]:w-[70%] max-[650px]:w-full my-4 text-black bg-default-200 p-4 rounded-2xl">
            <article className='flex flex-col'>
                <img src={accessory.image} alt="Imagen de accesorio" className="w-20 h-20 object-cover rounded-lg"/>
                <Link href={`/products/${accessory.id}`} className="font-bold text-black hover:underline text-xl mb-2">{accessory.name}</Link>
                <p className="text-base">{limitedDesc}</p>
            </article>
            <article className='flex flex-row gap-2'>
                <Button className="bg-green-500 text-white px-2" onClick={()=>handleAccessorieAdd(accessory)}>
                    {adddedAccessory ? <Check size={24}/> : <>${accessory.price}<Plus size={24} /></> }  
                </Button>
            </article>
        </div>
    )})}
    </section>
)
}