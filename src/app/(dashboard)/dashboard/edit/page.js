'use client';
import { useState } from "react";
import { ButtonGroup, Button, Link } from "@nextui-org/react";
import EditEntity from "../../../../components/dashboard/EditEntity";

import { Montserrat } from "next/font/google";
const mont = Montserrat({subsets:['latin'], weight:['600','400','300']});

export default function EditEntitiesPage() {

    const [entity, setEntity] = useState(null);

    return (
        <section className="p-10">
            <h1 className={`${mont.className} text-3xl font-semibold mb-2`}>Editar entidades</h1>
            <h2 className={`${mont.className} text-xl font-normal mb-8`}>Seleccione la entidad que desee editar. </h2>
            <div className="flex items-center max-[800px]:flex-col gap-2">
                <Button className="text-base max-[800px]:text-lg w-1/4 max-[800px]:w-full" onClick={()=>setEntity('producto')}>Editar productos</Button>
                <Button className="text-lg w-1/4 max-[800px]:w-full" onClick={()=>setEntity('marca')}>Editar marcas</Button>
                <Button className="text-base max-[800px]:text-lg w-1/4 max-[800px]:w-full" onClick={()=>setEntity('proveedor')}>Editar proveedores</Button>
                <Button className="text-lg w-1/4 max-[800px]:w-full" onClick={()=>setEntity('tipo')}>Editar tipos</Button>
            </div>
            <section className={`${mont.className} my-4`}>
                {!entity ? 
                    <h1 className='text-lg font-normal'>Seleccione una opción para continuar</h1>
                 :
                    <EditEntity entity={entity}/>
                }
            </section>
            <Link href="/dashboard" className="hover:underline">Volver atrás</Link>
        </section>
    );
}