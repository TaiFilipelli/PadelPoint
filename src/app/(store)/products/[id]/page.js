'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Poppins } from "next/font/google";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import ProductsCard from "../../../../components/ProductsCard";
import { getProducts, getOneProductById } from "../../../../data/data";
import { useCartStore } from "../../../../data/useCartStore";
import { PuffLoader } from "react-spinners";

const pop = Poppins({subsets:['latin'], weight:['600','400']})
export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [recProducts, setRecProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = useCartStore((s)=> s.addToCart);

  const dataRecProducts = async(params) => {
    try{
      const data = await getProducts(params);
      setRecProducts(data);
      setIsLoading(false);
    }catch(error){
      console.error('Error fetching main products');
      setIsLoading(true);
    }
  }

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
    const params = { limit: 4 };
    dataRecProducts(params);
  }, [id]);

  if (!product) {
    return(
      <div className="flex justify-center items-center h-[31rem] w-full">
        <PuffLoader color="#2563EB"/>
      </div>
  );
  }

  return (
    <section className={`flex flex-col justify-center p-16 max-[500px]:px-6 max-[500px]:py-4 ${pop.className} font-semibold text-black`}>
      <section className="flex flex-wrap my-6">
        <div className="flex flex-wrap max-[807px]:flex-col p-2">
          <div className="block max-[807px]:flex w-24 max-[807px]:gap-4 mr-2">
          {product.secondariesImages.map(image => (
              <img key={image.id} src={image.url} alt={`Image ${image.id}`} className="border-1 rounded-xl mb-1" />
           ))}
          </div>
          <div className="h-[35rem] min-w-96">
            <img src={product.image} alt={product.name} className="h-full border-1 rounded-xl object-cover" />
          </div>
        </div>
        <div className="text-left flex flex-col p-2">
          <h1 className='text-4xl mb-6'>{product.name}</h1>
          <p className="text-3xl mb-2">US${product.price}</p>
          <p className="text-xl mb-10 text-green-500">12 cuotas de {(product.price / 12).toFixed(0)} dólares</p>
          <p className="text-xl">Marca: {product.brand.name}</p>
          <p className="text-xl">Tipo: {product.type.name}</p>
          <Button className="rounded-lg py-6 mt-4 w-2/3 px-4 text-xl bg-transparent border-2 hover:bg-gradient-to-tr from-red-300 to-red-600 ease-in-out transition-all 
          hover:border-black hover:text-white" variant="light" onClick={()=>addToCart(product.id)}>Comprar</Button>
          <Link href='/products' className={`mt-5 w-1/2 text-lg hover:underline hover:text-red-600 transition-colors ${pop.className} font-normal`}>Volver a ver los productos</Link>
        </div>
      </section>
      <Divider/>
      <div className={`${pop.className} font-normal bg-default-200 rounded-lg flex text-left flex-col p-4 my-6`}>
        <h1 className={`text-4xl mb-6 mt-2 ${pop.className} font-semibold`}>Descripción del producto</h1>
        <p className="text-lg">{product.description}</p>
      </div>
      <Divider/>
      <div className="flex flex-col items-center text-center my-6">
        <h1 className={`${pop.className} text-3xl`}>Otros usuarios también vieron esto</h1>
        <div className=/*grid grid-cols-auto-fix-minmax*/ "flex flex-wrap gap-4 justify-center items-center mt-10 mb-10 font-normal">
        {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <ProductsCard key={index} isLoading={true} />
                        ))
                    ) : (
                        recProducts.map(product => (
                            <ProductsCard 
                                key={product.id} 
                                name={product.name} 
                                image={product.image} 
                                brand={product.brand.name} 
                                price={product.price}
                                idProducto={product.id}
                                isLoading={isLoading}
                                className='w-full'
                            />
                        ))
                    )}
        </div>      
      </div>
    </section>
  );
}