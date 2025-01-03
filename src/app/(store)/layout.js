import '../../../styles/globals.css'
import { Providers } from '../providers';
import Nav from '../../components/store/Navbar'
import AnimatedBar from '../../components/store/AnimatedBar'
import Footer from '../../components/store/Footer';

export const metadata = {
  title: 'PadelPoint SN Oficial',
  description: 'Tienda virtual oficial de PadelPoint San Nicolas de los Arroyos. Las mejores marcas, la mejor variedad, los mejores precios. Envíos a todo el país!'
}


export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <main className='h-screen bg-transparent text-white dark:bg-black dark:text-white pt-36 max-[700px]:pt-28'>
          <Providers>
            <AnimatedBar/>
            <Nav/>
            {children}
            <Footer />
          </Providers>
      </main>
    </html>
  );
}
