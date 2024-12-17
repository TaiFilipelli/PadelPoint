'use client';
import { Poppins } from "next/font/google";
import MyCarousel from "./Carousel";
import MainProducts from './MainProducts';

const pop = Poppins({ subsets: ["latin"], weight:['700','600','400'] });

export default function ImageCaruoselAndFeaturedProducts({mainProducts, subMainProducts}) {
  return(
    <>
       <MyCarousel />
       <h2 className={`${pop.className} font-bold text-5xl mt-4 ml-2 animate-appear`}>Productos destacados:</h2>
       <MainProducts products={mainProducts}/>
       <h3 className={`${pop.className} font-bold text-4xl mt-4 ml-2 animate-appear`}>Equipate con lo mejor del mercado</h3> 
       <MainProducts products={subMainProducts}/>
    </>
  );
}