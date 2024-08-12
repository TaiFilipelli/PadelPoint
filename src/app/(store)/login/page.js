'use client';
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { Eye, EyeClosed, SignIn, GoogleLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"; 
import { loginSchema } from "schemas/Login";
import { userLogin} from "src/data/data";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const pop = Poppins({ subsets: ['latin'], weight: '500' });

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = loginSchema.parse(formData);
            const result = await userLogin(validatedData);
            console.log(result.message);
            localStorage.setItem('username', validatedData.username);
            router.push('/');
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
            }
            toast.error('Error al iniciar sesión. Inténtelo más tarde');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/login/google/redirect';
      };
      

    return (
        <main className="flex justify-center items-center text-center p-20">
            <section className="flex flex-col text-center justify-center items-center p-8 rounded-lg bg-gray-300 w-1/2">
                <h1 className={`${pop.className} text-4xl`}>Bienvenido de vuelta!</h1>
                <form className="w-full text-left" onSubmit={handleSubmit}>
                    <fieldset className="mt-6 mb-2">
                        <Input 
                            type="text" 
                            label="Nombre o correo" 
                            className="w-3/4 shadow-lg" 
                            labelPlacement="outside"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="text-red-500">{errors.username}</p>}
                    </fieldset>
                    <fieldset className="mt-4 mb-8">
                        <Input 
                            type={isVisible ? "text" : "password"} 
                            label="Contraseña" 
                            className="w-3/4 shadow-lg" 
                            labelPlacement="outside"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            endContent={
                                <button 
                                    className="focus:outline-none" 
                                    type="button" 
                                    onClick={toggleVisibility}
                                    aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {isVisible ? (
                                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </fieldset>
                    <div className="flex flex-row justify-between items-center">
                        <Button radius="medium" variant='flat' className="bg-red-500 text-white font-semibold shadow-lg" endContent={<SignIn />} type='submit'>
                        Iniciar sesión
                        </Button>
                        <Button radius="medium" variant='flat' className='bg-gray-50 text-black font-semibold shadow-lg' onClick={handleGoogleLogin} startContent={<GoogleLogo />}>
                            Iniciar sesión con Google
                        </Button>
                        <Link href='/register' className="hover:underline hover:text-blue-600 transition-all">
                            No tienes cuenta? Registrate ahora!
                        </Link>
                    </div>
                </form>
                <ToastContainer position="bottom-right" autoClose={3000} transition={Slide} theme="light" closeOnClick draggable/>
            </section>
        </main>
    );
}
