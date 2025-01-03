'use client';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { Poppins } from "next/font/google";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import ProductsCard from "../../../../components/ProductsCard";
import { getProducts, getOneProductById } from "../../../../data/storeData";
import { useCartStore } from "../../../../data/useCartStore";
import { PuffLoader } from "react-spinners";
import Head from "next/head";
import { trackViewContent } from "../../../../../utils/pixel";
import { Plus } from "@phosphor-icons/react";
import Image from "next/image";

const pop = Poppins({subsets:['latin'], weight:['600','400']})
export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [recProducts, setRecProducts] = useState([]);
  const [comboProducts, setComboProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnCart, setIsOnCart] = useState(false);

  const addToCart = useCartStore((s)=> s.addToCart);

  const dataRecProducts = async(params) => {
    try{
      const data = await getProducts(params);
      setRecProducts(data.recourse);
      setIsLoading(false);
    }catch(error){
      console.error('Error fetching main products');
      setIsLoading(true);
    }
  }
  const dataComboProducts = async(params) => {
    try{
      const data = await getProducts(params);
      setComboProducts(data.recourse);
      setIsLoading(false);
    }catch(error){
      console.error('Error fetching combo products');
      setIsLoading(true);
    }
  }

  const handleBuyButton = (id) => {
    addToCart(id);
    setIsOnCart(true);
  }

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await getOneProductById(id);
          setProduct(data.recourse);
          trackViewContent(id, 'product');
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
    const params = { limit: 4 };
    const comboParams = {limit:2, type:'Bolsos', minStock:1};
    dataRecProducts(params);
    dataComboProducts(comboParams);
  }, [id]);

  if (!product) {
    return(
      <div className="flex justify-center items-center h-[35rem] bg-[#264492] w-full">
        <PuffLoader color="#fff"/>
      </div>
  );
  }

  return (
    <>
    <Head>
    <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": product.name,
              "image": product.image,
              "description": product.description,
              "sku": product.id,
              "brand": {
                "@type": "Brand",
                "name": product.brand.name
              },
              // "offers": {
              //   "@type": "Offer",
              //   "url": `https://mi-sitio.com/productos/${product.id}`,
              //   "priceCurrency": "USD",
              //   "price": product.price,
              //   "availability": "https://schema.org/InStock"
              // },
              "category": product.type.name
            })
          }}
        />
    </Head>
    <section className={`flex flex-col justify-center p-16 max-[500px]:px-6 max-[500px]:py-4 ${pop.className} font-semibold bg-[#264492]`}>
      <section className="flex max-[1330px]:flex-col my-6">
        <article className="flex flex-wrap max-[807px]:flex-col p-2">
          {product.secondariesImages.length>0? 
          <div className="block max-[807px]:flex w-24 max-[807px]:gap-4 mr-2">
          {product.secondariesImages.map(image => (
              <img key={image.id} src={`https://${image.url}`} alt={`Imagen ${image.id}`} className="border-1 rounded-xl mb-1" /> 
           ))}
          </div>
          : null
        }
          <article className="h-[35rem] min-w-96">
            <Image src={`https://${product.image}`} alt={product.name} className="h-full max-[430px]:h-[75%] border-1 rounded-xl object-cover" />
          </article>
        </article>
        <div className="text-left flex flex-col p-2">
          <h1 className='text-4xl mb-6'>{product.name}</h1>
          <p className="text-3xl mb-2">ARS${product.price}</p>
          <p className="text-xl mb-2 text-green-500">12 cuotas de {(product.price / 12).toFixed(0)} dólares</p>
          <p className="text-xl mb-6">Coste de envío: ${product.shippingCost}</p>
          <p className={`text-xl mb-4 ${product.stock<5? 'text-red-400': product.stock<10? 'text-orange-400':'text-green-600'}`}>Stock {product.stock<5? 'bajo': product.stock<10? 'medio': 'alto'}</p> 
          <p className="text-xl">Marca: {product.brand.name}</p>
          <p className="text-xl">Tipo: {product.type.name}</p>
          {isOnCart ? <Button as={Link} href="/cart" className="rounded-lg py-6 mt-4 w-2/3 px-4 text-xl bg-green-600 border-2 border-white text-white" variant="light">Ver carro</Button> : <Button className="rounded-lg py-6 mt-4 w-2/3 px-4 
          text-xl bg-transparent border-2 hover:bg-gradient-to-tr from-blue-300 to-blue-600 ease-in-out transition-all hover:border-black text-white hover:scale-105" 
          variant="light" onClick={() => handleBuyButton(product.id)}>Comprar</Button>}
          <Link href='/products' className={`mt-5 w-1/2 text-lg underline hover:text-red-600 transition-colors ${pop.className} font-normal`}>Volver a productos</Link>
        </div>
      </section>
      <Divider/>
      <div className={`${pop.className} font-normal bg-default-200 text-black rounded-lg flex text-left flex-col p-4 my-6`}>
        <h1 className={`text-4xl mb-6 mt-2 ${pop.className} font-semibold`}>Descripción del producto</h1>
        <p className="text-lg">{product.description}</p>
      </div>
      <Divider />
      <section className="flex flex-col text-center p-4">
        <h2 className="text-3xl font-bold">Armá tu combo</h2>
        <h3 className="text-xl mb-4">Los usuarios combinan este producto con los siguiente:</h3>
        <div className="flex flex-row max-[1000px]:flex-wrap justify-center items-center gap-4 my-6">
          <ProductsCard name={product.name} image={product.image} brand={product.brand.name} price={product.price} idProducto={product.id} isLoading={false}/>
          <Plus size={50}/>
          {comboProducts.map(product=>(
            <ProductsCard key={product.id} name={product.name} image={product.image} brand={product.brand.name} price={product.price} idProducto={product.id} isLoading={false}/>
          ))}
        </div>
      </section> 
      <Divider/>
      <div className="flex flex-col items-center text-center my-6">
        <h1 className={`${pop.className} text-3xl`}>Otros usuarios también vieron esto</h1>
        <div className=/*grid grid-cols-auto-fix-minmax*/ "flex flex-wrap gap-4 justify-center items-center my-8 font-normal">
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
    </>
  );
}