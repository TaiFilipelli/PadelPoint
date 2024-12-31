import { Poppins } from "next/font/google";
// Se importa la fuente
import { Divider, Button, Image } from "@nextui-org/react";
// Componentes de nextui
import Link from "next/link";
// Link para navegar entre páginas
import {getProducts} from '../../data/storeData'
// Método para fetchear productos
import { Truck, CreditCard, Racquet, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
// Iconos de React especificos para SSR
import ImageCarouselAndFeaturedProducts from '../../components/ClientComponents'
// Componentes CSR 

const pop = Poppins({ subsets: ["latin"], weight:['700','600','400'] });

export default async function Home() {
  let mainProducts = [];
  let subProducts = [];

  try {
    const params = { limit: 4 };
    const subParams = {limit: 4, type:'Bolsos' };
    const response = await getProducts(params);
    const subResponse = await getProducts(subParams);
    mainProducts = response.recourse;
    subProducts = subResponse.recourse;
  } catch (error) {
    console.error('Error fetching main products:', error);
  }

  return (
    <main className="flex flex-col items-center justify-between py-8 bg-[#264492]">
      <ImageCarouselAndFeaturedProducts mainProducts={mainProducts} subMainProducts={subProducts}/>
      <Divider/>
      <section className="my-10 flex justify-center items-center flex-row max-[450px]:flex-col gap-10 w-3/5 max-[940px]:w-4/5 max-[410px]:w-full animate-appear">
        <div className="w-1/3 max-[450px]:w-full flex flex-col text-center items-center text-wrap"> 
          <Truck size={60} type="light" className="w-16 h-16"/>
          <h1 className={`${pop.className} font-semibold text-2xl mb-2`}>Envíos a todo el país</h1>
          <p className="text-xl font-normal">Comprá cómodo desde tu casa. Nos encargamos del resto!</p>
        </div>
        <div className="w-1/3 max-[450px]:w-full flex flex-col text-center items-center">
          <CreditCard size={60} type="light" className="max-w-full"/>
          <h3 className={`${pop.className} font-semibold text-2xl mb-2 max-[500px]:mb-4`}>Los mejores precios</h3>
          <p className="text-xl font-normal">Múltiples métodos de pago para tu comodidad y ofertas especiales!</p>
        </div>
        <div className="w-1/3 max-[450px]:w-full flex flex-col text-center items-center">
          <Racquet size={60} type="light" />
          <h3 className={`${pop.className} font-semibold text-2xl mb-2 max-[500px]:mb-4`}>Las mejores marcas</h3>
          <p className='text-xl font-normal'>Encontrá tu mejor compañera en nuestra selecta y variada colección!</p>
        </div>
      </section>
      <Divider/>
      <h1 className={`${pop.className} font-bold text-4xl max-[500px]:text-5xl m-6 max-[500px]:ml-2 animate-appear`}>Bienvenido a la tienda de padel más grande de San Nicolás</h1>
      <section className="w-4/5 py-4 px-8 max-[500px]:px-0">
      <article className="flex flex-col text-left items-start bg-white text-black rounded-xl p-4 w-[50%] max-[650px]:w-full mb-4 animate-appear">
        <h1 className={`${pop.className} font-semibold text-2xl max-[500px]:text-3xl mb-4 underline`}>Nuestro objetivo: todo el país</h1>
        <p className="font-normal text-xl mb-4">Unite a una familia en constante crecimiento, unida por una fuerte pasión por este increíble deporte.
          PadelPoint empezó siendo un humilde emprendimiento de venta de artículos de padel. Hoy, aspiramos a llegar a los hogares de todos y cada uno de los 
          amantes de este deporte para equiparlos con lo mejor del mercado, lo que se merecen.
        </p>
        <Image src="/STOCKMAIN1.jpg" width={900} isBlurred alt="Jugador de padel en cancha de ladrillo azul"/>
      </article>
      <article className="flex flex-col text-right max-[800px]:text-left justify-end max-[800px]:justify-start items-end max-[800px]:items-start bg-white text-black p-4 rounded-xl ml-96 max-[800px]:ml-60 max-[650px]:ml-0 mb-4 animate-appear">
        <h1 className={`${pop.className} font-bold text-2xl max-[500px]:text-3xl my-4 underline`}>Tu paleta de ensueño, a dos clicks de distancia</h1>
        <p className="font-normal text-xl mb-4">Encontrar tu compañera ideal nunca fue tan fácil! Ingresá con tu cuenta (o unite a la familia PadelPoint si
          es tu primera vez por acá) y descubrí nuestra amplia gama de productos para acompañarte tanto dentro de la cancha como fuera de ella. Además,
          siempre tenemos ofertas, sorteos, rifas y mucho más!
        </p>
        <Image src="/PadelStock1.png" width={1000} isBlurred alt="Imagen de paletas de PadelPoint"/>
      </article>
      <article className="flex flex-col text-left items-start bg-white text-black rounded-xl p-4 w-[50%] max-[650px]:w-full mb-4 animate-appear">
        <h1 className={`${pop.className} font-semibold text-2xl max-[500px]:text-3xl mb-4 underline`}>Todo el equipamiento que necesitas está acá</h1>
        <p className="font-normal text-xl mb-4">Sabemos más que nadie que no sólo es la paleta lo que importa. Nuestro catálogo también cubre todo lo que necesitas
          para estar bien equipado dentro de la cancha. Desde pelotas y camisetas hasta productos especializados como sprays adherentes para paletas o bolsos para llevar tu equipamiento
          al siguiente nivel.
        </p>
        <Image src="/Padelpoint_IMGS/items1.jpg" width={1000} isBlurred alt="Items varios de PadelPoint"/>
      </article>
      </section>
      <Divider />
      <h1 className={`${pop.className} text-3xl mt-5 font-bold animate-appear max-[555px]:ml-2 max-[310px]:text-2xl`}>Contáctanos por las redes oficiales!</h1>
      <div className="flex flex-row max-[780px]:flex-col gap-4 w-1/2 justify-around items-center my-10 animate-appear">
        <Button as={Link} href="https://www.instagram.com/_padelpoint/" aria-label="Página oficial de Instagram" className="flex items-center p-5 rounded-lg bg-transparent hover:bg-[#E1306C] transition-all duration-300 ease-in-out" startContent={<InstagramLogo size={40} color="white"/>}>
          <p className="font-bold text-lg text-white">Instagram Oficial</p>
        </Button>
        <Button as={Link} href="https://api.whatsapp.com/send/?phone=%2B543364003555&text&type=phone_number&app_absent=0"  aria-label="WhatsApp de PadelPoint" className="flex items-center p-5 bg-transparent hover:bg-[#25D366] transition-all duration-300 ease-in-out rounded-lg" startContent={<WhatsappLogo size={40} color="white" />}>
          <p className="font-bold text-lg text-white">Whatsapp</p>
        </Button>
      </div>
      <Divider/>
      {/* <div className="flex flex-row w-1/2 text-center">
          <Link href='/dashboard' className="bg-red-600 text-white p-4 rounded-lg mt-6">Ir al Dashboard</Link>
      </div> */}
    </main>
  );
}
