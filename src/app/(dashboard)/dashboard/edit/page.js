'use client';
import { useState } from "react";
import { ButtonGroup, Button, Link } from "@nextui-org/react";
import EditEntity from "src/components/EditEntity";

import { Montserrat } from "next/font/google";
const mont = Montserrat({subsets:['latin'], weight:['600','400','300']});

export default function EditEntitiesPage() {

    const [entity, setEntity] = useState(null);

    return (
        <section>
            <h1 className={`${mont.className} text-3xl font-semibold mb-2`}>Editar entidades</h1>
            <h2 className={`${mont.className} text-xl font-normal mb-8`}>Seleccione la entidad que desee editar. </h2>
            <div>
                <ButtonGroup>
                    <Button className="text-lg" onClick={()=>setEntity('producto')}>Editar productos</Button>
                    <Button className="text-lg" onClick={()=>setEntity('marca')}>Editar marcas</Button>
                    <Button className="text-lg" onClick={()=>setEntity('proveedor')}>Editar proveedores</Button>
                    <Button className="text-lg" onClick={()=>setEntity('tipo')}>Editar tipos</Button>
                </ButtonGroup>
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