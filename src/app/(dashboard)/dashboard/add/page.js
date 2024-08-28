'use client';
import { ButtonGroup, Button, Link } from "@nextui-org/react";
import { Montserrat } from "next/font/google";
import { useState } from "react";
import AddEntity from "src/components/AddEntity";

const mont = Montserrat({subsets:['latin'],weight:'600'});
export default function AddEntitiesPage() {

    const [entity, setEntity] = useState(null);

    return (
        <section className="">
            <h1 className={`${mont.className} text-3xl mb-2`}>Añadir entidades</h1>
            <h2 className={`${mont.className} text-xl mb-8`}>Elija a continuación qué añadir a la base de datos</h2>
            <div>
                <ButtonGroup>
                    <Button className="text-lg" onClick={()=> setEntity('producto')}>Nuevo producto</Button>
                    <Button className="text-lg" onClick={()=> setEntity('marca')}>Nueva marca</Button>
                    <Button className="text-lg" onClick={()=> setEntity('rol')}>Nuevo rol</Button>
                    <Button className="text-lg" onClick={()=> setEntity('proveedor')}>Nuevo proveedor</Button>
                    <Button className="text-lg" onClick={()=> setEntity('tipo')}>Nuevo tipo de producto</Button>
                </ButtonGroup>
            </div>
            <section className="mt-4">
                {!entity ? 
                    <h1 className={`${mont.className} text-lg`}>Seleccione una opción para continuar.</h1>
                 :
                    <AddEntity entity={entity}/>
                }
            </section>
            <Link href="/dashboard" className="hover:underline">Volver atrás</Link>
        </section>
    );
}