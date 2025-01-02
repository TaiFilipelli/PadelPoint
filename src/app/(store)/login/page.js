'use client';
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { Eye, EyeClosed, SignIn, GoogleLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"; 
import { loginSchema } from "../../../../schemas/Login";
import { userLogin} from "../../../data/loginData";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const pop = Poppins({ subsets: ['latin'], weight: '500' });

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
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
            console.log("Mensaje de la respuesta:",result.message);
            console.log(result);
            if(result.status===true){

                const userStatus = {
                    isLogged: true,
                    refreshTokenExists: true,
                    username: validatedData.usernameOrEmail,
                    tokenExpiration: Date.now() + 60 * 60 * 1000,
                    refreshTokenExpiration: Date.now() + (tokenExpiration - Date.now()) * 1000,
                };

                localStorage.setItem('userStatus', JSON.stringify(userStatus));

                toast.success('Inicio de sesión correcto. Bienvenido!');
    
                setTimeout(() => {
                    router.push('/');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1600);
                }, 1500);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
            }
            toast.error('Las crendenciales no coinciden. Inténtelo de nuevo.');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${baseUrl}auth/login/google/redirect`; 
      };
      

    return (
        <main className="flex justify-center items-center p-20 max-[700px]:px-10 bg-[#264492] h-[70dvh]">
            <section className="flex flex-col justify-center items-center p-8 rounded-lg bg-white text-black w-[45%] max-[1150px]:w-[90%] max-[390px]:w-full">
                <h1 className={`${pop.className} text-4xl`}>Bienvenido de vuelta!</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <fieldset className="mt-6 mb-2">
                        <Input 
                            type="text" 
                            label="Nombre de usuario o email" 
                            className="w-[60%] max-[1500px]:w-full shadow-lg" 
                            labelPlacement="outside"
                            name="usernameOrEmail"
                            required
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                        />
                        {errors.usernameOrEmail && <p className="text-red-500">{errors.usernameOrEmail}</p>}
                    </fieldset>
                    <fieldset className="mt-4 mb-8">
                        <Input 
                            type={isVisible ? "text" : "password"} 
                            label="Contraseña" 
                            className="w-[60%] max-[1500px]:w-full shadow-lg" 
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
                    <div className="flex flex-row max-[570px]:flex-col justify-start gap-4 items-center max-[570px]:items-start">
                        <Button radius="medium" variant='flat' className="bg-blue-500 text-white font-semibold shadow-xl" aria-label="Botón de iniciar sesión" endContent={<SignIn size={25}/>} type='submit'>
                        Iniciar sesión
                        </Button>
                        <Button radius="medium" variant='flat' className='bg-gray-50 text-black font-semibold shadow-xl' aria-label="Botón de inicio de sesión con Google" onClick={handleGoogleLogin} endContent={<GoogleLogo size={25} className="object-contain"/>}>
                            Ingresar con Google
                        </Button>
                    </div>
                    <div className="mt-4 gap-2 text-left flex flex-row justify-between">
                        <Link href='/register' className="hover:underline hover:text-blue-600 transition-all">
                            No tienes cuenta? Registrate ahora!
                        </Link>
                        <Link href='/login/forgot_password' className="hover:text-blue-700 hover:underline">
                        Olvidé mi contraseña
                        </Link>
                    </div>
                </form>
                <ToastContainer position="bottom-right" autoClose={1500} transition={Slide} theme="light" closeOnClick draggable/>
            </section>
        </main>
    );
}
