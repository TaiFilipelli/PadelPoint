import { Montserrat, Roboto } from "next/font/google";
import Link from "next/link";

const mont = Montserrat({subsets:['latin'],weight:'600'});
const robtop = Roboto({subsets:['greek'],weight:'300'});

export default function Dashboard() {
  return (
    <main className="flex justify-center items-center flex-col">
      <h1 className={`${mont.className} text-4xl`}>Bienvenido, admin!</h1>
      <h3 className={`${robtop.className} text-xl`}>Esta fuente tendrán todos los textos no encabezados</h3>
      <section className={`rounded-lg bg-black text-white w-2/3 p-10 text-center flex flex-col my-10 ${robtop.className}`}>
        <h1 className={`${mont.className} text-3xl my-4`}>Menú de Administrador</h1>
        <Link href='/dashboard/edit' className="hover:underline">Page "Editar paleta"</Link>  
        <Link href='/' className="hover:underline">Volver a la tienda</Link>
      </section>
    </main>
  );
}