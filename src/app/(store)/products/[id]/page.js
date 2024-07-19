'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getOneProductById } from "src/data/data";
import { Poppins } from "next/font/google";
import { Spinner } from "@nextui-org/react";

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
    <section className={`flex flex-col justify-center text-center items-center p-20 ${pop.className}`}>
      <h1 className='text-4xl'>{product.name}</h1>
      <div className="h-[40rem]">
        <img src={product.image} alt={product.name} className="h-full" />
      </div>
      <div className="text-left w-1/3">
        <p className="text-xl">Marca: {product.brand.name}</p>
        <p className="text-xl">Precio (USD): ${product.price}</p>
      </div>
    </section>
  );
}