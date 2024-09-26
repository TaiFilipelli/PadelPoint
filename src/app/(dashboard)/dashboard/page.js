'use client';
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { Pencil, Plus, Eraser } from "@phosphor-icons/react";
import { Button } from "@nextui-org/react";

const mont = Montserrat({subsets:['latin'],weight:'600'});

export default function Dashboard(){
  return (
    <main className="flex items-center flex-col p-10">
        <h1 className={`${mont.className} text-3xl my-2 max-[410px]:my-8`}>Menú de Administrador</h1>
        <h2 className={`${mont.className} text-xl mb-8`}>Elija la opción que desee.</h2>
        <div className="w-full max-[1000px]:flex-col flex justify-between items-center gap-5 mb-5">
          <Button radius="large" as={Link} href='/dashboard/edit' variant='shadow' startContent={<Pencil size={25}/>} className='w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg'>Editar</Button> 
          <Button radius="large" as={Link} href='/dashboard/add' variant='shadow' startContent={<Plus size={25}/>} className='w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg'>Añadir</Button>
          <Button radius="large" as={Link} href='/dashboard/delete' variant='shadow' startContent={<Eraser size={25}/>} className='w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg'>Borrar</Button> 
        </div>
        <Link href='/' className="hover:underline">Volver a la tienda</Link>
    </main>
  );
}