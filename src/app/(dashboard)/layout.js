import { Providers } from "../providers";
import '../../../styles/globals.css';
import { Montserrat, Roboto } from "next/font/google";
// import { checkUserState } from "src/data/data"; 


export const metadata = {
    title: 'Dashboard de Administrador',
    description: 'Este es el dashboard del administrador de la página'
}

const mont = Montserrat({subsets:['latin'], weight:'600'});
const robtop = Roboto({subsets:['greek'],weight:'300'});
export default async function DashboardLayout({children}) {

  // const token = await checkUserState() U OTRO MÉTODO QUE BUSQUE LA TOKEN

  // if (!token) {
  //   redirect('/login');
  // }

  // const user = await verifyToken(token); U OTRO MÉTODO PARA VERIFICAR LA TOKEN. PEDIRLE A LAU ALGUN METODO PARA ESTO

  // if (!user || user.role !== 'admin') {
  //   redirect('/');
  // }

    return (
    <html lang="es">
      <body className='h-screen w-screen p-20 bg-gradient-to-br from-indigo-950 to-black text-white'>
        <Providers>
        <h1 className={`${mont.className} text-5xl`}>Bienvenido, admin!</h1>
          <section className={`rounded-lg bg-black text-white w-full p-10 text-center flex flex-col my-8 ${robtop.className} items-center`}>
            {children}
          </section>
        </Providers>
      </body>
    </html>
    );
}