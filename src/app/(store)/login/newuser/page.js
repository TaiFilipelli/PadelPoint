'use client';
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { ArrowCircleRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const popTitle = Poppins({ subsets: ['latin'], weight: '600' });
const popSubtitle = Poppins({ subsets: ['latin'], weight: '400' });

export default function NewUser() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem('userEmail');
    const result = await updateUsername({ email, username });
    if (result.ok) {
      router.push("/");
    } else {
      console.error("Error actualizando el nombre de usuario");
    }
  };

  return (
    <main className='p-20 flex justify-center items-center'>
      <section className="bg-gray-300 rounded-lg p-8 text-left w-1/2">
        <h1 className={`${popTitle.className} text-5xl mb-6`}>¡Bienvenido a PadelPoint!</h1>
        <h2 className={`${popSubtitle.className} text-2xl mb-10`}>
          ¡Gracias por unirte a la familia PadelPoint! Para finalizar el proceso de inicio de sesión, ingrese un nombre de usuario.
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            className="w-2/3 h-7 mb-7"
            label="Nombre de usuario"
            labelPlacement="outside"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            type="submit"
            isDisabled
            className="1/4 bg-red-600 font-bold"
            endContent={<ArrowCircleRight weight="regular" size={25} />}
          >
            Continuar
          </Button>
        </form>
      </section>
    </main>
  );
}
