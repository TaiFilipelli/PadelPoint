import { useEffect, useState } from "react";

export const ConversorButton = ({ valueToConvert }) => {
  /* OPTO POR PONER TODA LA CONFIGURACION ACÁ, SI CREES QUE ES MAS UTIL MUDAR TODA LA LOGICA A UNA CARPETA 'SERVICES' HACELO */
 /*  HOLA LAU, NO. LO DEJO ACÁ, ALTA PAJA PASARLO A UN SERVICES XD. ATTE: EL GOAT(ai)*/  

  const [dolarBlueValue, setDolarBlueValue] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares/blue")
      .then((response) => response.json())
      .then((data) => {
        const { venta } = data;
        setDolarBlueValue(Number(venta));
      });
  }, []);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <section className="relative w-12 h-12 rounded-full text-black">
      <button
        className="bg-white shadow-sm h-full w-full text-2xl rounded-full bg-opacity-25"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        🧉
      </button>
      <article
        className={`${
          isHovered ? "opacity-100" : "opacity-0"
        } rounded-lg bg-white shadow text-center absolute -bottom-22 -right-52 h-max w-52 flex flex-col transition-all`}
      >
        <header className="bg-blue-400 h-4 rounded-tl-lg rounded-tr-lg"></header>
        <section className="rounded-bl-lg rounded-br-lg flex flex-col p-2">
          <span className="font-bold text-lg">
            AR$
            {Number(dolarBlueValue * valueToConvert).toFixed(2)}
          </span>
          <span className="text-xs">Dolar blue hoy: AR${dolarBlueValue}</span>
        </section>
      </article>
    </section>
  );
};