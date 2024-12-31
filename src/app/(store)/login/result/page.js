'use client';
import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { PuffLoader } from "react-spinners";
import Link from "next/link";
import { searchUserAuthenticated, updateOneUser} from "../../../../data/loginData";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function ResultLogin() {

    const [isNewUser, setIsNewUser] = useState(false);
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loginError, setLoginError] = useState(false);

    const router = useRouter();

    const checkLoggedUser = async () => {
        try{
            const data = await searchUserAuthenticated();
            setIsNewUser(data.isNewUser);
            if(isNewUser === false){
                setUsername(data.user.username);
            }
            localStorage.setItem('username', data.user.username);
        }catch(error){
            console.error('Error buscando el usuario loggeado:',error);
            setLoginError(true);
        }
    }
    const handleUsernameChange = async () => {
        if (!newUsername.trim()) {
            console.error('El nombre de usuario no puede estar vacío');
            return;
        }

        try {
            const data = await searchUserAuthenticated();
            await updateOneUser(data.user.id, newUsername);
            toast.success('Usuario creado correctamente! Bienvenido!');
            setIsNewUser(false);
            setTimeout(()=>{
                router.push('/');
            },2500);
        } catch (error) {
            toast.error('Error actualizando el usuario.');
            console.error('Error actualizando el usuario:', error);
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 1000)
        checkLoggedUser();
    },[]);

    return (
        <section className="flex items-center justify-center text-center h-[70dvh] max-[500px]:p-10 p-20 flex-col bg-[#264492]">
           {isLoading ? (
                <PuffLoader color="#fff" size={100}/>
            ) : loginError ? (           
                    <p className="text-red-500 text-lg font-semibold">ERROR: No se pudo iniciar sesión. Por favor, inténtelo de nuevo.</p>
            ):  isNewUser ? (
                <>
                    <section className="flex flex-col w-1/2 max-[1000px]:w-3/4 max-[560px]:w-full p-16 max-[1000px]:p-6 mt-10 rounded-lg text-left text-black bg-white">
                        <h1 className="font-bold text-3xl mb-2">Una última cosa...</h1>
                        <h2 className="font-semibold text-xl max-[560px]:text-lg mb-6">Bievenido a la familia PadelPoint! Como es su primera vez aquí, nos gustaría que ingrese un nombre de usuario por única vez
                            para reconocerlo futuras veces.
                        </h2>
                        <Input type="text" labelPlacement="outside" label='Nombre de usuario nuevo' className="mb-4" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        <Button className="bg-blue-500 rounded-lg p-4 w-1/4 max-[600px]:w-2/3 text-white font-semibold text-xl" onClick={handleUsernameChange}>Unirme</Button>
                    </section>
                    <ToastContainer position="bottom-right" autoClose={2500} transition={Slide} theme="light" closeOnClick draggable />
                </>
            ) : (
                <section className="flex flex-col items-center text-center p-10">
                    <h1 className="text-green-500 font-bold text-5xl mb-4">Bienvenido, {username}</h1>
                    <h2 className="font-semibold text-2xl mb-8">Puede retornar a la tienda y comprar libremente</h2>
                    <Link href='/' className="hover:underline text-lg">Volver al inicio</Link>
                </section>
            )
        }
        </section>
    );
}