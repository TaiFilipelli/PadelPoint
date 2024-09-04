'use client'
import { ButtonGroup, Button, Link } from "@nextui-org/react";
import DeleteEntity from "../../../../components/DeleteEntity";
import { useState } from "react";

import { Montserrat } from "next/font/google";
const mont = Montserrat({subsets:['latin'], weight:['600','400','300']})

export default function DeleteEntitiesPage() {

    const [entity, setEntity] = useState(null);

    return (
        <section>
            <h1 className={`${mont.className} text-3xl font-semibold mb-2`}>Eliminar entidades</h1>
            <h1 className={`${mont.className} text-xl font-normal mb-8`}>Elija la entidad donde eliminar registros.</h1>
            <div>
                <ButtonGroup>
                    <Button className="text-lg" onClick={()=>setEntity('producto')}>Eliminar producto</Button>
                    <Button className="text-lg" onClick={()=>setEntity('marca')}>Eliminar marca</Button>
                    <Button className="text-lg" onClick={()=>setEntity('rol')}>Eliminar rol</Button>
                    <Button className="text-lg" onClick={()=>setEntity('proveedor')}>Eliminar proveedor</Button>
                    <Button className="text-lg" onClick={()=>setEntity('tipo')}>Eliminar tipo de producto</Button>
                </ButtonGroup>
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