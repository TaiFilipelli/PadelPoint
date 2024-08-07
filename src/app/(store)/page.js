import { Poppins } from "next/font/google";
// Se importa la fuente
import { Divider, Button } from "@nextui-org/react";
// Componentes de nextui
import Link from "next/link";
// Link para navegar entre páginas
import { getProducts } from "src/data/data";
// Método para fetchear productos
import { Truck, CreditCard, Racquet, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
// Iconos de React especificos para SSR
import ImageCarousel from "src/components/ClientComponents";
import ProductsCard from "src/components/ProductsCard";
// Componentes CSR 

const pop = Poppins({ subsets: ["latin"], weight: '600' });

export default async function Home() {
  let mainProducts = [];

  try {
    const params = { limit: 4 };
    mainProducts = await getProducts(params);
  } catch (error) {
    console.error('Error fetching main products:', error);
  }

  return (
    <main className="flex flex-col items-center justify-between py-8">
      <h1 className={`${pop.className} text-7xl p-6`}>PadelPoint Oficial</h1>
      <ImageCarousel/>
      <h2 className={`${pop.className} text-3xl mt-5`}>Productos destacados:</h2>
      <div className="flex flex-row justify-center gap-2 w-3/4 mt-10 mb-14">
        {mainProducts.length === 0 ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ProductsCard key={index} isLoading={true} />
          ))
        ) : (
          mainProducts.map(product => (
            <ProductsCard 
              key={product.id} 
              name={product.name} 
              image={product.image} 
              brand={product.brand.name} 
              price={product.price}
              idProducto={product.id}
              isLoading={false}
            />
          ))
        )}
      </div>
      <Divider />
      <section className="mt-10 mb-10 flex justify-center items-center flex-row gap-10 w-3/5">
        <div className="w-1/3 flex flex-col text-center items-center">
          <Truck size={50} type="light" />
          <h1 className={`${pop.className} text-2xl`}>Envíos a todo el país</h1>
          <p className="text-lg font-light">Comprá cómodo desde tu casa. Nos encargamos del resto!</p>
        </div>
        <div className="w-1/3 flex flex-col text-center items-center">
          <CreditCard size={50} type="light" />
          <h3 className={`${pop.className} text-2xl`}>Los mejores precios</h3>
          <p className="text-lg font-light">Múltiples métodos de pago para tu comodidad y ofertas especiales!</p>
        </div>
        <div className="w-1/3 flex flex-col text-center items-center">
          <Racquet size={50} type="light" />
          <h3 className={`${pop.className} text-2xl`}>Las mejores marcas</h3>
          <p className='text-lg font-light'>Encontrá tu mejor compañera en nuestra selecta y variada colección!</p>
        </div>
      </section>
      <Divider />
      <h1 className={`${pop.className} text-3xl mt-5`}>Contáctanos!</h1>
      <div className="flex flex-row w-1/2 justify-around items-center my-10">
        <Button as={Link} href="https://www.instagram.com/_padelpoint/" className="flex items-center p-5 rounded-lg bg-transparent hover:bg-gradient-to-tr from-[#FFDC80] to-[#E1306C] hover:text-white transition-all duration-300 ease-in-out" startContent={<InstagramLogo size={40} />}>
          <p className="font-bold text-lg">Instagram</p>
        </Button>
        <Button as={Link} href="https://api.whatsapp.com/send/?phone=%2B543364003555&text&type=phone_number&app_absent=0" className="flex items-center p-5 hover:bg-gradient-to-tr from-[#25D366] to-[#128C7E] hover:text-white transition-all duration-300 ease-in-out rounded-lg bg-transparent" startContent={<WhatsappLogo size={40} />}>
          <p className="font-bold text-lg">Whatsapp</p>
        </Button>
      </div>
      <Divider />
      <div className="flex flex-row w-1/2 text-center">
        <Link href='/dashboard' className="rounded-lg bg-red-600 p-2 w-1/5 font-bold mt-4">Dashboard de admin</Link>
      </div>
    </main>
  );
}
