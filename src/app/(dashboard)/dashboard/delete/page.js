'use client'
import { Button, Link } from "@nextui-org/react";
import DeleteEntity from "../../../../components/dashboard/DeleteEntity";
import { useState } from "react";

import { Montserrat } from "next/font/google";
const mont = Montserrat({subsets:['latin'], weight:['600','400','300']})

export default function DeleteEntitiesPage() {

    const [entity, setEntity] = useState(null);

    return (
        <section className="p-10">
            <h1 className={`${mont.className} text-3xl font-semibold mb-2`}>Eliminar entidades</h1>
            <h1 className={`${mont.className} text-xl font-normal mb-8`}>Elija la entidad donde eliminar registros.</h1>
            <div className="flex items-center max-[1000px]:flex-col gap-2">
                <Button className="text-lg w-1/5 max-[1000px]:w-full" onClick={()=>setEntity('producto')}>Eliminar producto</Button>
                <Button className="text-lg w-1/5 max-[1000px]:w-full" onClick={()=>setEntity('marca')}>Eliminar marca</Button>
                <Button className="text-lg w-1/5 max-[1000px]:w-full" onClick={()=>setEntity('rol')}>Eliminar rol</Button>
                <Button className="text-lg w-1/5 max-[1000px]:w-full" onClick={()=>setEntity('proveedor')}>Eliminar proveedor</Button>
                <Button className="text-sm max-[1000px]:text-lg w-1/5 max-[1000px]:w-full" onClick={()=>setEntity('tipo')}>Eliminar tipo de producto</Button>
            </div>
            <section className={`${mont.className} my-4`}>
                {!entity ? 
                    <h1 className='text-lg font-normal'>Seleccione una opción para continuar</h1>
                 :
                    <DeleteEntity entity={entity}/>
                }
            </section>
            <Link href="/dashboard" className="hover:underline">Volver atrás</Link>
        </section>
    );
}