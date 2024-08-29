'use client';
import { Poppins } from "next/font/google";
import MyCarousel from "./Carousel";
import ProductsCard from "./ProductsCard";
import React from "react";

const pop = Poppins({ subsets: ["latin"], weight:['700','600','400'] });

export default function ImageCaruoselAndFeaturedProducts({mainProducts}) {
  return(
    <>
       <MyCarousel />
       <h2 className={`${pop.className} font-bold text-4xl mt-5`}>Productos destacados:</h2>
      <div className="flex flex-row justify-center gap-2 w-3/4 mt-10 mb-14 max-w-[1440px]:w-full">
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
    </>
  );
}