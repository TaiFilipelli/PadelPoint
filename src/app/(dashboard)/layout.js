import { Providers } from "../providers";

export const metadata = {
    title: 'Dashboard de Administrador',
    description: 'Este es el dashboard del administrador de la página'
}

export default function DashboardLayout({children}) {
    return (
    <html lang="es">
      <body className='h-screen w-screen bg-no-repeat bg-lightDashboard text-black dark:bg-darkDashboard dark:text-white pt-36'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
    );
}