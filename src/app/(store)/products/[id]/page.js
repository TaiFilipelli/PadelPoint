'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getOneProductById } from "src/data/data";
import { Poppins } from "next/font/google";
import { Spinner, Button, Divider } from "@nextui-org/react";
import Link from "next/link";

const pop = Poppins({subsets:['latin'], weight:'600'})
const popmini = Poppins({subsets:['latin'], weight:'400'})
export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await getOneProductById(id);
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return(
      <div className="flex justify-center items-center h-[20rem] w-full">
        <Spinner size="lg"/>
      </div>
  );
  }

  return (
    <section className={`flex flex-col justify-center p-16 ${pop.className}`}>
      <section className="flex flex-wrap my-6">
        <div className="flex flex-wrap p-2">
          <div className="block w-24 mr-2">
            {/* Aquí mi idea es tener un método donde por cada imagen que tenga una paleta se despliegue aquí, pero ya es un re mambo una imagen te imaginas varias xd */}
            <img src={product.image} alt={product.name} className="border-1 rounded-xl mb-1"/>
            <img src={product.image} alt={product.name} className="border-1 rounded-xl mb-1"/>
            <img src={product.image} alt={product.name} className="border-1 rounded-xl mb-1"/>
            <img src={product.image} alt={product.name} className="border-1 rounded-xl"/>
          </div>
          <div className="h-[35rem]">
            <img src={product.image} alt={product.name} className="h-full border-1 rounded-xl" />
          </div>
        </div>
        <div className="text-left flex flex-col p-2">
          <h1 className='text-4xl mb-10'>{product.name}</h1>
          <p className="text-3xl mb-10">${product.price}</p>
          <p className="text-xl">Marca: {product.brand.name}</p>
          <p className="text-xl">Más info proximamente...</p>
          <Button className="rounded-lg py-4 mt-4 w-1/2 px-4 text-xl bg-transparent border-2 hover:bg-gradient-to-b from-pink-600 to-yellow-400 ease-in-out transition-all hover:border-black" variant="light">Comprar</Button>
          <Link href='/products' className={`mt-5 text-lg hover:underline hover:text-red-600 transition-colors ${popmini.className}`}>Volver a ver los productos</Link>
        </div>
      </section>
      <Divider/>
      <div className={`${popmini.className} bg-default-200 rounded-lg flex text-left flex-col p-4 my-6`}>
        <h1 className={`text-4xl mb-6 mt-2 ${pop.className}`}>Descripción del producto</h1>
        <p className="text-lg">Acá iria una descripción del producto en cuestión. El caso ideal seria que la propia entidad Paleta tenga un campo varchar donde se proporcione una minúscula
          descripción de cada paleta o, en su defecto, que haya algun campo "Attributes" donde yo pueda fetchear dichos atributos y armar una descripción decente y genérica para todas las
          paletas del e-commerce, pero que varíen dichos atributos clave.
        </p> <br/>
        <p className="text-lg">
          En caso no podamos contar con ello, simplemente pondría algun intento de "guía" para que los usuarios entiendan algunas cuestiones de la paleta. EJEMPLO: En caso "Tipo" sea algo
          que especifiquemos en esta página, contamos las caracteristicas y principales diferencias entre las paletas de tipo Diamante, de tipo Redondo o Híbridas. Otra sección también 
          puede ser info de envíos, de pagos, garantía u otras cuestiones del negocio.
        </p>
      </div>
      <Divider/>
      <div className="flex flex-col items-center text-center my-6">
        <h1 className={`${pop.className} text-3xl`}>Otros usuarios también vieron esto</h1>
        {/* Futuras recomendaciones fetcheando una cantidad aleatoria de productos mediante query compuesta */}
      </div>
    </section>
  );
}