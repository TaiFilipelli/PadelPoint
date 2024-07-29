import '../../../styles/globals.css'
import { Providers } from '../providers';
import Nav from '../../components/Navbar'
import Footer from '../../components/Footer';

export const metadata = {
  title: 'PadelPoint Oficial',
  description: 'Tienda virtual oficial de PadelPoint SN'
}


export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body className='h-screen bg-no-repeat bg-white text-black dark:bg-black dark:text-white pt-36'>
        <Providers>
          <Nav/>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
