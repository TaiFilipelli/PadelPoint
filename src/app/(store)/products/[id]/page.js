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
    <section className={`flex flex-col justify-center text-center items-center p-20 ${pop.className} p-10`}>
      <h1 className='text-4xl'>{product.name}</h1>
      <div className="h-[40rem]">
        <img src={product.image} alt={product.name} className="h-full" />
      </div>
      <div className="text-left w-1/3">
        <p className="text-xl">Marca: {product.brand.name}</p>
        <p className="text-xl">Precio (USD): ${product.price}</p>
        <p className="text-xl">Más info proximamente...</p>
        <Button className="rounded-lg py-4 mt-4 px-6 text-xl bg-transparent border-2 hover:bg-gradient-to-b from-pink-600 to-yellow-400 ease-in-out transition-all hover:border-black" variant="light">Comprar</Button>
      </div>
      <Link href='/products' className="mt-5 text-lg hover:underline hover:text-red-600 transition-colors">Volver a ver los productos</Link>
    </section>
  );
}