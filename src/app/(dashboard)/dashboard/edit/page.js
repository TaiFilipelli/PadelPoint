'use client';
import { useState } from "react";
import { ButtonGroup, Button, Link } from "@nextui-org/react";
import EditEntity from "src/components/EditEntity";
import { Montserrat } from "next/font/google";

const mont = Montserrat({subsets:['latin'], weight:['600','400','300']})
export default function EditEntitiesPage() {
    return (
        <section>
            <h1 className={`${mont.className} text-3xl font-semibold mb-2`}>Editar entidades</h1>
            <h2 className={`${mont.className} text-xl font-normal mb-8`}>Seleccione la entidad que desee editar. </h2>

        </section>
    );
}