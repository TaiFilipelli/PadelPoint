'use client';
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { Eye, EyeClosed, SignIn } from "@phosphor-icons/react";
import React from "react";

const pop = Poppins({subsets:['latin'], weight:'500'});
export default function Login() {

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <main className="flex justify-center items-center text-center p-10">
            <section className="flex flex-col text-center justify-center items-center p-8 rounded-lg bg-gray-300 w-1/2">
                <h1 className={`${pop.className} text-4xl`}>Bienvenido de vuelta!</h1>
                <form className="w-full text-left">
                    <fieldset className="mt-6 mb-2">
                        <Input type="text" label="Nombre o correo" className="w-3/4 shadow-lg" labelPlacement="outside"/>
                    </fieldset>
                    <fieldset className="mt-4 mb-8">
                        <Input type={isVisible ? "text" : "password"} label="Contraseña" className="w-3/4 shadow-lg" labelPlacement="outside" required endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                     <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                            </button>
                        }/>
                    </fieldset>
                    <div className="flex flex-row justify-between items-center">
                        <Button radius="medium" variant='flat' className="bg-red-500 text-white font-semibold shadow-lg" endContent={<SignIn/>}>Iniciar sesión</Button>
                        <Link href='/register' className="hover:underline hover:text-blue-600 transition-all">No tienes cuenta? Registrate ahora!</Link>
                    </div>
                </form>
            </section>
        </main>
    );
}