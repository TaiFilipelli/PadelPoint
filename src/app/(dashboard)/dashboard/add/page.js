import { ButtonGroup, Button } from "@nextui-org/react";
import { Montserrat } from "next/font/google";

const mont = Montserrat({subsets:['latin'],weight:'600'});
export default function AddEntitiesPage() {
    return (
        <section className="">
            <h1 className={`${mont.className} text-3xl mb-2`}>Añadir entidades</h1>
            <h2 className={`${mont.className} text-xl mb-8`}>Elija a continuación qué añadir a la base de datos</h2>
            <div>
                <ButtonGroup>
                    <Button className="text-lg">Nuevo producto</Button>
                    <Button className="text-lg">Nueva marca</Button>
                    <Button className="text-lg">Nuevo rol</Button>
                    <Button className="text-lg">Nuevo proveedor</Button>
                    <Button className="text-lg">Nuevo tipo de producto</Button>
                </ButtonGroup>
            </div>
        </section>
    );
}