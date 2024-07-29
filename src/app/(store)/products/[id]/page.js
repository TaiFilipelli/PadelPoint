'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getOneProductById } from "src/data/data";
import { Poppins } from "next/font/google";
import { Spinner, Button } from "@nextui-org/react";
import Link from "next/link";

const pop = Poppins({subsets:['latin'], weight:'600'})
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
    <section className={`flex justify-center items-center p-16 ${pop.className}`}>
      <section className="flex flex-wrap">
        <div className="flex flex-wrap p-2">
          <div className="block w-24 mr-2">
            <img src={product.image} alt={product.name} className="border-1 rounded-xl"/>
            <img src={product.image} alt={product.name} className="border-1 rounded-xl"/>
            <img src={product.image} alt={product.name} className="border-1 rounded-xl"/>
            <img src={product.image} alt={product.name} className="border-1 rounded-xl"/>
          </div>
          <div className="h-[30rem]">
            <img src={product.image} alt={product.name} className="h-full border-1 rounded-xl" />
          </div>
        </div>
        <div className="text-left flex flex-col p-2">
          <h1 className='text-4xl mb-10'>{product.name}</h1>
          <p className="text-3xl mb-10">${product.price}</p>
          <p className="text-xl">Marca: {product.brand.name}</p>
          <p className="text-xl">Más info proximamente...</p>
          <Button className="rounded-lg py-4 mt-4 w-1/2 px-4 text-xl bg-transparent border-2 hover:bg-gradient-to-b from-pink-600 to-yellow-400 ease-in-out transition-all hover:border-black" variant="light">Comprar</Button>
          <Link href='/products' className="mt-5 text-lg hover:underline hover:text-red-600 transition-colors">Volver a ver los productos</Link>
        </div>
      </section>
      
      
    </section>
  );
}