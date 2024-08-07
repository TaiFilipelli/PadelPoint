'use client';
import { Poppins } from "next/font/google";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { CaretRight } from "@phosphor-icons/react";

const pop = Poppins({subsets:['latin'], weight:'500'})

export default function About() {
    
    const itemClasses = {
        base: "p-2 w-full",
        title: "font-bold text-xl",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-lg px-2",
      };
    return (
        <section className={`flex flex-col justify-center text-left items-center p-16 ${pop.className}`}>
            <h1 className="font-bold text-5xl">Esto es PadelPoint</h1>
            <h3 className="mt-5 text-xl mb-5">
                ¡Hola! Soy Ignacio Merlo, fundador de PadelPoint, y estoy encantado de darte la bienvenida a 
                nuestra tienda. Tengo 23 años, soy jugador y profesor de pádel, y tengo una verdadera pasión por este deporte. Inicié PadelPoint hace 
                tres meses con el objetivo de ofrecer un lugar de confianza donde los jugadores de pádel de toda Argentina puedan encontrar todo lo que necesitan
            </h3>
            <Accordion variant="bordered" itemClasses={itemClasses}>
                <AccordionItem key='inspiracion' aria-label="Nuestra inspiración" indicator={<CaretRight size={20}/>} title='Nuestra inspiración'>
                La idea de crear PadelPoint nació de mi propio amor por las paletas de pádel y la necesidad que vi en nuestra comunidad de tener un proveedor confiable y especializado. 
                Como jugador, sé lo importante que es contar con el equipo adecuado, y como profesor, entiendo las necesidades de los jugadores a diferentes niveles. 
                Juego hace 3 años, compitiendo en la 3ra categoría, y he sido número 1 local en mi categoría en múltiples ocasiones. Además, llevo 1.5 años dando clases, 
                ayudando a otros a mejorar su juego y disfrutar más del pádel.
                </AccordionItem>
                <AccordionItem key='mision' aria-label="Nuestra misión" indicator={<CaretRight size={20}/>} title='Nuestra misión y diferencias'>
                En PadelPoint, nuestra misión es simple pero ambiciosa: queremos llegar a todos los jugadores de 
                pádel del país y equiparlos con productos de la mejor calidad al mejor precio posible. Ofrecemos una amplia gama de paletas, bolsos y zapatillas, 
                seleccionados cuidadosamente para satisfacer tanto a principiantes como a jugadores avanzados. Lo que nos distingue de otras tiendas de pádel es nuestro compromiso con la calidad y la 
                satisfacción del cliente. Nos enorgullece recibir una respuesta tan positiva de nuestros clientes; más de 50 personas han compartido sus 
                compras en Instagram para ayudarnos a crecer. Nos esforzamos por crear una comunidad de jugadores apasionados que confíen en nosotros para
                sus necesidades de equipo.
                </AccordionItem>
                <AccordionItem key='future' aria-label="Nuestro futuro" indicator={<CaretRight size={20}/>} title='Nuestro futuro'>
                En PadelPoint, siempre estamos pensando en el futuro. Uno de nuestros grandes proyectos 
                es sponsorear a jugadores profesionales para ayudar a crecer la marca y apoyar el talento emergente en el pádel. Creemos que respaldar a los 
                jugadores no solo promueve nuestro negocio, sino que también fortalece la comunidad de pádel en general. Te invitamos a explorar nuestra tienda, conocer nuestros productos y unirte a la comunidad
                PadelPoint. Ya sea que estés buscando tu próxima paleta, un nuevo par de zapatillas, o simplemente quieras conectarte con otros apasionados del pádel, 
                estamos aquí para ayudarte. ¡Gracias por visitarnos y esperamos verte pronto en la cancha!
                </AccordionItem>
            </Accordion>
        </section>
    );
}