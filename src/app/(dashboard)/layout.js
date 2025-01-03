import { Providers } from "../providers";
import '../../../styles/globals.css';
import { Montserrat, Roboto } from "next/font/google";


export const metadata = {
    title: 'Dashboard de Administrador',
    description: 'Este es el dashboard del administrador de la página'
}

const mont = Montserrat({subsets:['latin'], weight:'600'});
const robtop = Roboto({subsets:['greek'],weight:'300'});
export default async function DashboardLayout({children}) {

    return (
    <html lang="es">
      <main className='h-[140vh] max-[950px]:h-auto w-auto p-20 max-[640px]:px-2 max-[400px]:py-10 bg-gradient-to-br from-indigo-950 to-black text-white'>
        <Providers>
        <h1 className={`${mont.className} text-5xl`}>Bienvenido, admin!</h1>
          <section className={`w-full text-white text-center flex flex-col mt-8 ${robtop.className} items-center`}>
            {children}
          </section>
        </Providers>
      </main>
    </html>
    );
}