import { Providers } from "../providers";
import '../../../styles/globals.css'

export const metadata = {
    title: 'Dashboard de Administrador',
    description: 'Este es el dashboard del administrador de la página'
}

export default function DashboardLayout({children}) {
    return (
    <html lang="es">
      <body className='h-screen w-screen p-20 bg-gradient-to-br from-indigo-950 to-black text-white'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
    );
}