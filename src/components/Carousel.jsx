'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const MyCarousel = () => {
  return (
    <section className="p-5 w-full">
     <Carousel 
        stopOnHover
        swipeable
        autoPlay 
        showThumbs={false} 
        axis="horizontal" 
        infiniteLoop 
        showArrows 
        useKeyboardArrows
        showStatus={false}
      >
       <div className="flex justify-center items-center w-full max-h-[690px]">
          <img src="/PadelStock1.png" alt="Imagen de Stock PadelPoint" className="object-contain max-w-full h-auto"/>
        </div>
        <div className="flex justify-center items-center w-full max-h-[690px]">
          <img src="/STOCKROULETTE.jpg" alt="Imagen 2 de Stock PadelPoint" className="object-contain max-w-full h-auto"/>
        </div>
        <div className="flex justify-center items-center w-full max-h-[690px]">
          <img src="/STOCKROULETTE2.jpg" alt="Imagen 3 de Stock PadelPoint" className="object-contain max-w-full h-auto"/>
        </div>
        <div className="flex justify-center items-center w-full max-h-[690px]">
          <img src="/STOCKROULETTE3.jpg" alt="Imagen 4 de Stock PadelPoint" className="object-contain max-w-full h-auto"/>
        </div>
      </Carousel>
    </section>
  )
}

export default MyCarousel
