'use client';
import { Poppins } from "next/font/google";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { registerSchema } from "schemas/Register";
import { createOneUser } from "src/data/data";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const pop = Poppins({ subsets: ["latin"], weight: '400' });

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(registerSchema),
    });
    
    const router = useRouter();

    const onSubmit = async (data) => {
        const { confirmPassword, ...credentials } = data;
        credentials.method="local";
        try {
            const result = await createOneUser(credentials);
            toast.success("Usuario creado exitosamente!")
            console.log('Usuario creado! Revisar DB', result);
            setTimeout(() => {
                router.push('/');
            }, 2500);
        } catch (error) {
            console.error('ERROR ACÁ PA:', error);
            toast.error("Error al crear el usuario.")
            setError('apiError', {
                type: 'manual',
                message: error.message,
            });
        }
    };

    return (
        <main className="flex flex-col items-center justify-center text-center p-16">
            <section className="w-full max-w-md p-8 bg-gray-300 rounded-lg shadow-lg">
                <h1 className={`${pop.className} text-3xl mb-6`}>Únete a la familia PadelPoint hoy</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input 
                            type="text"
                            label="Nombre"
                            {...register("name")}
                            className="w-full"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Input 
                            type="text"
                            label="Nombre de usuario"
                            {...register("username")}
                            className="w-full"
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div>
                        <Input 
                            type="email"
                            label="Correo electrónico"
                            {...register("email")}
                            className="w-full"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Input 
                            type="password"
                            label="Contraseña"
                            {...register("password")}
                            className="w-full"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <Input 
                            type="password"
                            label="Confirmar contraseña"
                            {...register("confirmPassword")}
                            className="w-full"
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    {errors.apiError && <p className="text-red-500">{errors.apiError.message}</p>}
                    <Button type="submit" className="w-full bg-red-500 text-white">
                        Registrarse
                    </Button>
                </form>
                <ToastContainer position="bottom-right" autoClose={2500} theme="light" closeOnClick draggable transition={Slide} stacked/>
            </section>
        </main>
    );
}
