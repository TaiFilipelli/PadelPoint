'use client';
import { Poppins } from "next/font/google";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import { CaretRight } from "@phosphor-icons/react";

const pop = Poppins({subsets:['latin'], weight:['700','600','500','300']})

export default function About() {
    
    const itemClasses = {
        base: "p-2 w-full max-[320px]:py-4 bg-gray-300",
        title: "font-bold text-xl max-[530px]:h-1/2 text-black",
        trigger: "px-2 py-0 max-[530px]:py-4 rounded-lg h-14 flex items-center bg-gray-300",
        indicator: "text-medium text-black",
        content: "text-lg px-2 text-black",
      };
    return (
        <section className={`flex flex-col justify-center text-left items-center p-16 max-[650px]:px-8 ${pop.className} bg-[#264492]`}>
            <h1 className="font-bold text-5xl">Esto es PadelPoint</h1>
            {/* <Image src="/PadelPoint_IMGS/stock3.jpg"/> */}
            <h3 className="mt-5 text-xl mb-5 font-medium">
                ¡Hola! Soy Ignacio Merlo, fundador de PadelPoint, y estoy encantado de darte la bienvenida a 
                nuestra tienda. Tengo 23 años, soy jugador y profesor de pádel, y tengo una verdadera pasión por este deporte. Inicié PadelPoint hace 
                tres meses con el objetivo de ofrecer un lugar de confianza donde los jugadores de pádel de toda Argentina puedan encontrar todo lo que necesitan
            </h3>
            <section className="flex flex-col">
                <h1 className="mt-8 text-4xl font-semibold">Nuestra inspiración</h1>
                <p className="text-xl my-4">
                    La idea de crear PadelPoint nació de mi propio amor por las paletas de pádel y la necesidad que vi en nuestra comunidad de tener un proveedor confiable y especializado. 
                    Como jugador, sé lo importante que es contar con el equipo adecuado, y como profesor, entiendo las necesidades de los jugadores a diferentes niveles. 
                    Juego hace 3 años, compitiendo en la 3ra categoría, y he sido número 1 local en mi categoría en múltiples ocasiones. Además, llevo 1.5 años dando clases, 
                    ayudando a otros a mejorar su juego y disfrutar más del pádel.
                </p>
                <h1 className="mt-4 text-4xl font-semibold">Nuestra misión y diferencias</h1>
                <p className="text-xl my-4">
                En PadelPoint, nuestra misión es simple pero ambiciosa: queremos llegar a todos los jugadores de 
                pádel del país y equiparlos con productos de la mejor calidad al mejor precio posible. Ofrecemos una amplia gama de paletas, bolsos y zapatillas, 
                seleccionados cuidadosamente para satisfacer tanto a principiantes como a jugadores avanzados. Lo que nos distingue de otras tiendas de pádel es nuestro compromiso con la calidad y la 
                satisfacción del cliente. Nos enorgullece recibir una respuesta tan positiva de nuestros clientes; más de 50 personas han compartido sus 
                compras en Instagram para ayudarnos a crecer. Nos esforzamos por crear una comunidad de jugadores apasionados que confíen en nosotros para
                sus necesidades de equipo.
                </p>
                <h1 className="mt-4 text-4xl font-semibold">Nuestro futuro</h1>
                <p className="text-xl my-4">
                En PadelPoint, siempre estamos pensando en el futuro. Uno de nuestros grandes proyectos 
                es sponsorear a jugadores profesionales para ayudar a crecer la marca y apoyar el talento emergente en el pádel. Creemos que respaldar a los 
                jugadores no solo promueve nuestro negocio, sino que también fortalece la comunidad de pádel en general. Te invitamos a explorar nuestra tienda, conocer nuestros productos y unirte a la comunidad
                PadelPoint. Ya sea que estés buscando tu próxima paleta, un nuevo par de zapatillas, o simplemente quieras conectarte con otros apasionados del pádel, 
                estamos aquí para ayudarte. ¡Gracias por visitarnos y esperamos verte pronto en la cancha!
                </p>
            </section>
            <h1 className="font-bold text-4xl mt-8 mb-4">FAQ</h1>
            <Accordion variant="bordered" className="bg-gray-300" itemClasses={itemClasses} id="faq">
                <AccordionItem key='paleta_adecuada' aria-label="¿Cómo puedo elegir la paleta de pádel adecuada para mí?" indicator={<CaretRight size={20}/>} title='¿Cómo puedo elegir la paleta de pádel adecuada para mí?'>
                    La elección de la paleta depende de tu nivel de juego, estilo y preferencias. Si eres principiante, te recomendamos una paleta con mayor control y una superficie más grande. 
                    Para jugadores intermedios, una paleta que ofrezca un buen balance entre control y potencia es ideal. Los jugadores avanzados suelen preferir palas de mayor potencia, 
                    con un balance más hacia la cabeza. Si necesitas asesoramiento personalizado, ¡no dudes en contactarnos!
                </AccordionItem>
                <AccordionItem key='paleta_fibra_vidrio' aria-label="¿Cuál es la diferencia entre las paletas de pádel de fibra de vidrio y de carbono?" indicator={<CaretRight size={20}/>} title='¿Cuál es la diferencia entre las paletas de pádel de fibra de vidrio y de carbono?'>
                    Las palas de carbono son más duraderas y proporcionan un mejor rendimiento en términos de potencia y control, ya que el material es más rígido. 
                    Son perfectas para jugadores avanzados. Por otro lado, las palas de fibra de vidrio son más flexibles, lo que las hace ideales para jugadores principiantes o 
                    intermedios, ya que ofrecen un mejor confort y control. Cada material tiene sus ventajas dependiendo de tu estilo y nivel de juego.
                </AccordionItem>
                <AccordionItem key='garantia' aria-label="¿Las paletas tienen garantía?" indicator={<CaretRight size={20}/>} title='¿Las paletas tienen garantía?'>
                    Sí, todas nuestras palas tienen garantía contra defectos de fabricación. Si experimentas algún problema relacionado con la calidad de la pala dentro del periodo 
                    de garantía, nos encargaremos de gestionarlo para ti. No cubrimos daños por mal uso, pero si tienes alguna duda sobre el cuidado de tu pala, ¡no dudes en preguntarnos!
                </AccordionItem>
                <AccordionItem key='pedido' aria-label="¿Cuánto tarda en despacharse mi pedido realizada la compra?" indicator={<CaretRight size={20}/>} title='¿Cuánto tarda en despacharse mi pedido realizada la compra?'>
                    Una vez que completes tu compra, procesamos y preparamos tu pedido en un plazo de 1 a 3 días hábiles. Recibirás un correo de confirmación y seguimiento con la información 
                    de envío para que puedas estar al tanto de su progreso. Ten en cuenta que el tiempo de entrega final depende de la ubicación y el servicio de mensajería seleccionado.
                </AccordionItem>
            </Accordion>
        </section>
    );
}