'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const MyCarousel = () => {
  return (
    <section>
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
        dynamicHeight={false}
      >
       <div className="flex justify-center items-center max-h-[500px]">
          <img src="/PadelStock1.png" alt="Imagen de Stock PadelPoint" className="object-contain max-h-[600px]"/>
        </div>
        <div className="flex justify-center items-center max-h-[600px]">
          <img src="/PadelStock2.png" alt="Imagen 2 de Stock PadelPoint" className="object-contain max-h-[600px]"/>
        </div>
      </Carousel>
    </section>
  )
}

export default MyCarousel
