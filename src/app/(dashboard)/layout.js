import { Providers } from "../providers";
import '../../../styles/globals.css';
import { Montserrat } from "next/font/google";

export const metadata = {
    title: 'Dashboard de Administrador',
    description: 'Este es el dashboard del administrador de la página'
}

const mont = Montserrat({subsets:['latin'], weight:'600'});
export default function DashboardLayout({children}) {
    return (
    <html lang="es">
      <body className='h-screen w-screen p-20 bg-gradient-to-br from-indigo-950 to-black text-white'>
        <Providers>
        <h1 className={`${mont.className} text-5xl`}>Bienvenido, admin!</h1>
          {children}
        </Providers>
      </body>
    </html>
    );
}