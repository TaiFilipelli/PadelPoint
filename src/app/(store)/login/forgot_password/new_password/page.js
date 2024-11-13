'use client';
import { Input, Button } from "@nextui-org/react";
import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { changePassword } from "../../../../../data/loginData";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function NewPasswordPage() {

    const [newPass, setNewPass] = useState(null);
    
    const router = useRouter();

    const submitChanges = async() => {

        if (newPass.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        const change = await changePassword(newPass);
        if (change.status === 200){
            toast.success('Contraseña actualizada correctamente!');
            setTimeout(()=>{
                router.push('/login');
            },1500)
        }
        else if(change.status === 401){toast.error('Expiró el tiempo para cambiar la contraseña. Inténtelo de nuevo.')}
        else if(change.status === 400){toast.error('Ocurrió un error inesperado cambiando la contraseña.')}
        else{console.error('ERROR:',change.statusText)}
    }

    return (
        <section className="p-20 max-[560px]:p-10 text-white bg-[#264492] flex flex-col justify-center h-[67vh]">
            <h1 className="text-4xl font-bold mb-2">Verificación exitosa!</h1>
            <h2 className="text-xl font-medium mb-6">Ingrese la nueva contraseña. Recuerde no compartirle sus credenciales a nadie.</h2>
            <Input label='Nueva contraseña' labelPlacement="outside" value={newPass} onChange={(e)=>setNewPass(e.target.value)} className="w-1/3 max-[990px]:w-2/3 max-[560px]:w-full"/>
            <Button onClick={submitChanges} className="w-1/3 max-[990px]:w-2/3 max-[560px]:w-full mt-4 font-semibold text-lg max-[310px]:text-base p-6 bg-red-600 text-white items-center" endContent={<ArrowRight size={30}/>}>Crear nueva contraseña</Button>
            <ToastContainer 
                position="bottom-right" 
                autoClose={1500} 
                transition={Slide} 
                theme="light" 
                closeOnClick 
                draggable
            />
        </section>
    );
}