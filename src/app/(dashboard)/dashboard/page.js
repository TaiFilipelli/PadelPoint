import { Montserrat, Roboto } from "next/font/google";
import Link from "next/link";

const mont = Montserrat({subsets:['latin'],weight:'600'});
const robtop = Roboto({subsets:['greek'],weight:'300'});

export default function Dashboard() {
  return (
    <main className="p-20">
      <h1 className={`${mont.className} text-3xl`}>Bienvenido, admin!</h1>
      <h3 className={`${robtop.className} text-xl`}>Esta fuente tendrán todos los textos no encabezados</h3>
      <Link href='/dashboard/edit'>Page "Editar paleta"</Link>
      <br/>
      <Link href='/'>Volver a la tienda</Link>
    </main>
  );
}