'use client';

import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { searchUserAuthenticated, updateOneUser} from "src/data/data";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function ResultLogin() {

    const [isNewUser, setIsNewUser] = useState(false);
    const [username, setUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');

    const router = useRouter();

    const checkLoggedUser = async () => {
        try{
            const data = await searchUserAuthenticated();
            setIsNewUser(data.isNewUser);
            if(isNewUser === false){
                setUsername(data.user.username);
            }
            console.log(data);
        }catch(error){
            console.error('Error buscando el usuario loggeado:',error);
        }
    }
    const handleUsernameChange = async () => {
        if (!newUsername.trim()) {
            console.error('El nombre de usuario no puede estar vacío');
            return;
        }

        try {
            const data = await searchUserAuthenticated();
            await updateOneUser(data.user.id,{ username: newUsername });
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
        checkLoggedUser();
    },[]);

    return (
        <section className="flex items-center justify-center text-center p-20 flex-col">
            { isNewUser ?
            <>
            <section className="bg-gray-200 flex flex-col w-1/2 p-8 mt-10 rounded-lg text-left">
                <h1 className="font-bold text-3xl mb-2">Una última cosa...</h1>
                <h2 className="font-semibold text-xl mb-2">Bievenido a la familia PadelPoint! Como es su primera vez aquí, nos gustaría que ingrese un nombre de usuario por única vez
                    para reconocerlo futuras veces!
                </h2>
                <Input type="text" labelPlacement="outside" label='Nombre de usuario nuevo' className="mb-2" value={newUsername} onChange={(e)=> setNewUsername(e.target.value)}/>
                <Button className="bg-blue-500 rounded-lg p-4 w-1/4 text-white font-semibold text-xl" onClick={handleUsernameChange}>Unirme</Button>
            </section>
            <ToastContainer position="bottom-right" autoClose={2500} transition={Slide} theme="light" closeOnClick draggable/>
            </>
            :
            <section className="flex flex-col items-center text-center p-10">
                <h1 className="text-green-700 font-bold text-4xl mb-4">Bienvenido, {username}</h1>
                <h2 className="font-semibold text-xl mb-8">Puede retornar a la tienda y comprar libremente</h2>
                <Link href='/' className="hover:underline">Volver al inicio</Link>
            </section>
            }
        </section>
    );
}