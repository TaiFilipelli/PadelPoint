'use client'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
const MyCarousel = () => {
  return (
    <section className="p-5 w-full">
     <Carousel stopOnHover swipeable autoPlay showThumbs={false} axis="horizontal" infiniteLoop showArrows useKeyboardArrows showStatus={false}>
       <div className="flex justify-center items-center w-full max-h-[850px]">
          <img src="/Padelpoint_IMGS/stock3.jpg" alt="Imagen de Stock PadelPoint" className="object-cover max-w-full h-auto"/>
        </div>
        <div className="flex justify-center items-center w-full max-h-[690px]">
          <img src="/Padelpoint_IMGS/paletas1.jpg" alt="Imagen 4 de Stock PadelPoint" className="object-contain max-w-full h-auto"/>
        </div>
        <div className="flex justify-center items-center w-full max-h-[690px]">
          <img src="/Padelpoint_IMGS/items1.jpg" alt="Imagen 3 de Stock PadelPoint" className="object-contain max-w-full h-auto"/>
        </div>
        <div className="flex justify-center items-center w-full max-h-[690px]">
        <img src="/Padelpoint_IMGS/stock1.jpg" alt="Imagen 2 de Stock PadelPoint" className=" max-w-full h-auto"/>
        </div>
      </Carousel>
    </section>
  )
}

export default MyCarousel
