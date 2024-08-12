'use client';
import { Montserrat, Roboto } from "next/font/google";
import Link from "next/link";
import { Pencil, Plus, Eraser } from "@phosphor-icons/react";
import { Button } from "@nextui-org/react";

const mont = Montserrat({subsets:['latin'],weight:'600'});
const robtop = Roboto({subsets:['greek'],weight:'300'});

export default function Dashboard() {
  return (
    <main className="flex items-center flex-col">
      <section className={`rounded-lg bg-black text-white w-full p-10 text-center flex flex-col my-8 ${robtop.className} items-center`}>
        <h1 className={`${mont.className} text-3xl my-2`}>Menú de Administrador</h1>
        <h2 className={`${mont.className} text-xl mb-10`}>Elija la opción que desee. Tenga en cuenta que los botones deshabilitados son funciones no disponibles por el momento.</h2>
        <div className="w-1/2 flex justify-between gap-5 mb-5">
          <Button radius="large" as={Link} href='/dashboard/edit' variant='shadow' endContent={<Pencil size={25}/>} className='w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg'>Editar producto</Button> 
          <Button isDisabled radius="large" as={Link} href='/dashboard/edit' variant='shadow' endContent={<Plus size={25}/>} className='w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg'>Añadir producto</Button>
          <Button isDisabled radius="large" as={Link} href='/dashboard/edit' variant='shadow' endContent={<Eraser size={25}/>} className='w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg'>Borrar producto</Button> 
        </div>
        <Link href='/' className="hover:underline">Volver a la tienda</Link>
      </section>
    </main>
  );
}