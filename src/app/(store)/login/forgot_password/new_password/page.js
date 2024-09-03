'use client';
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { changePassword } from "src/data/data";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function NewPasswordPage() {

    const [newPass, setNewPass] = useState(null)

    const submitChanges = async() => {
        const change = await changePassword(newPass);
        if (change.status === 200){toast.success('Contraseña actualizada correctamente!')}
        else if(change.status === 401){toast.error('Expiró el tiempo para cambiar la contraseña. Inténtelo de nuevo.')}
        else if(change.status === 400){toast.error('Ocurrió un error inesperado cambiando la contraseña.')}
        else{console.error('ERROR:',change.statusText)}
    }

    return (
        <section className="p-16 text-white bg-[#264492] flex flex-col">
            <h1 className="text-4xl font-bold mb-4">Verificación exitosa!</h1>
            <h2 className="text-xl font-medium mb-8">Ingrese la nueva contraseña</h2>
            <Input label='Nueva contraseña' labelPlacement="outside" value={newPass} onChange={(e)=>setNewPass(e.target.value)}/>
            <Button onClick={submitChanges}>Crear nueva contraseña</Button>
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