import { Poppins } from "next/font/google";
// Se importa la fuente
import { Divider, Button, Image } from "@nextui-org/react";
// Componentes de nextui
import Link from "next/link";
// Link para navegar entre páginas
import { getProducts } from "src/data/data";
// Método para fetchear productos
import { Truck, CreditCard, Racquet, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
// Iconos de React especificos para SSR
import ImageCarouselAndFeaturedProducts from "src/components/ClientComponents";
// Componentes CSR 

const pop = Poppins({ subsets: ["latin"], weight:['700','600','400'] });

export default async function Home() {
  let mainProducts = [];

  try {
    const params = { limit: 4 };
    mainProducts = await getProducts(params);
  } catch (error) {
    console.error('Error fetching main products:', error);
  }

  return (
    <main className="flex flex-col items-center justify-between py-8 bg-[#264492]">
      <h1 className={`${pop.className} font-semibold text-7xl p-6`}>PadelPoint Oficial</h1>
      <ImageCarouselAndFeaturedProducts mainProducts={mainProducts}/>
      <Divider />
      <section className="mt-10 mb-10 flex justify-center items-center flex-row gap-10 w-3/5">
        <div className="w-1/3 flex flex-col text-center items-center">
          <Truck size={60} type="light" />
          <h1 className={`${pop.className} font-semibold text-2xl`}>Envíos a todo el país</h1>
          <p className="text-xl font-normal">Comprá cómodo desde tu casa. Nos encargamos del resto!</p>
        </div>
        <div className="w-1/3 flex flex-col text-center items-center">
          <CreditCard size={60} type="light" />
          <h3 className={`${pop.className} font-semibold text-2xl`}>Los mejores precios</h3>
          <p className="text-xl font-normal">Múltiples métodos de pago para tu comodidad y ofertas especiales!</p>
        </div>
        <div className="w-1/3 flex flex-col text-center items-center">
          <Racquet size={60} type="light" />
          <h3 className={`${pop.className} font-semibold text-2xl`}>Las mejores marcas</h3>
          <p className='text-xl font-normal'>Encontrá tu mejor compañera en nuestra selecta y variada colección!</p>
        </div>
      </section>
      <Divider/>
      <h1 className={`${pop.className} font-bold text-4xl my-6`}>Bienvenido a la tienda de padel más grande de San Nicolás</h1>
      <section className="w-2/3 p-4">
      <div className="flex flex-col text-left items-start p-1 w-2/3 mb-4">
        <h1 className={`${pop.className} font-semibold text-2xl mb-4`}>Nuestro objetivo: todo el país</h1>
        <p className="font-normal text-xl mb-4">Unite a una familia en constante crecimiento, unida por una fuerte pasión por este increíble deporte.
          Empezamos siendo un humilde emprendimiento de venta de artículos de padel y aspiramos a llegar a los hogares de todos y cada uno de los 
          amantes del padel para equiparlos con lo mejor del mercado, con lo que merecen.
        </p>
        <Image src="/STOCKMAIN1.jpg" width={600} isBlurred/>
      </div>
      <div className="flex flex-col text-right justify-end items-end p-1 ml-80 mb-4">
        <h1 className={`${pop.className} font-bold text-2xl my-4`}>Tu paleta de ensueño, a dos clicks de distancia</h1>
        <p className="font-normal text-xl mb-4">Encontrar tu equipamiento ideal nunca fue tan fácil! Ingresá con tu cuenta (o unite a la familia si
          es tu primera vez por acá) y descubrí nuestra amplia gama de productos para acompañarte tanto dentro de la cancha como fuera de ella. Además,
          siempre tenemos ofertas, sorteos, rifas y mucho más!
        </p>
        <Image src="/STOCKMAIN2.jpg" width={600} isBlurred/>
      </div>
      </section>
      <Divider />
      <h1 className={`${pop.className} text-3xl mt-5 font-bold`}>Contáctanos!</h1>
      <div className="flex flex-row w-1/2 justify-around items-center my-10">
        <Button as={Link} href="https://www.instagram.com/_padelpoint/" className="flex items-center p-5 rounded-lg bg-transparent hover:bg-gradient-to-tr from-[#FFDC80] to-[#E1306C] transition-all duration-300 ease-in-out" startContent={<InstagramLogo size={40} color="white"/>}>
          <p className="font-bold text-lg text-white">Instagram</p>
        </Button>
        <Button as={Link} href="https://api.whatsapp.com/send/?phone=%2B543364003555&text&type=phone_number&app_absent=0" className="flex items-center p-5 bg-transparent hover:bg-gradient-to-tr from-[#25D366] to-[#128C7E] transition-all duration-300 ease-in-out rounded-lg" startContent={<WhatsappLogo size={40} color="white" />}>
          <p className="font-bold text-lg text-white">Whatsapp</p>
        </Button>
      </div>
      <Divider/>
      <div className="flex flex-row w-1/2 text-center">
          <Link href='/dashboard'>Probar middleware</Link>
      </div>
    </main>
  );
}
