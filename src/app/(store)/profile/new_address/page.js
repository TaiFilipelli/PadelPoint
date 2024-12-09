'use client';
import { Poppins } from "next/font/google";
import { Button, Input } from "@nextui-org/react";
import { Signpost } from "@phosphor-icons/react";
import { useState } from "react";
import { createAddress, checkUserState } from "../../../../data/loginData";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const pop = Poppins({ subsets: ["latin"], weight: ['400','700'] });

export default function NewAddressPage() {

    const [address, setAddress] = useState({
        addressStreet: '',
        addressNumber: '',
        postalCode: '',
        userId:''
    });

    const handleAddressSubmit = async(e) =>{
        e.preventDefault();
        const userState = await checkUserState();
        if(userState.isLogged){
            const result = await createAddress({...address, userId: userState.payload.id});
            if(result.statusCode !== 404){
                toast.success('Dirección creada exitosamente!')
                console.log('Dirección creada exitosamente!', result);
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 2500);
            }else{
                toast.error('Error al crear la dirección. Inténtelo de nuevo.');
                console.error(result);
            }
        }else{
            toast.error('No se pudo crear la dirección: Inicie sesión nuevamente.');
        }
    }

    return (
        <section className={`${pop.className} flex flex-col items-center justify-center bg-[#264492] p-20`}>
            <h1 className="font-bold text-4xl mb-2">Añadir nueva dirección</h1>
            <h3 className="mb-4 text-xl">Ingrese la información solicitada. Podrá usar su dirección para los envíos de sus compras.</h3>
            <form onSubmit={handleAddressSubmit}>
                <div className="flex flex-col mt-6 bg-[#162856] p-6 rounded-xl">
                    <Input value={address.addressStreet} onChange={(e) => setAddress({...address, addressStreet: e.target.value})} type="text" label="Calle" labelPlacement="inside" className="w-full p-2 text-center" />
                    <Input value={address.addressNumber} onChange={(e) => setAddress({...address, addressNumber: e.target.value})} type="number" label="Número" labelPlacement="inside" className="w-full p-2 text-center" />
                    <Input value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} type="number" label="Código postal" labelPlacement="inside" className="w-full p-2 text-center" />
                </div>
                <Button type="submit" className="bg-red-600 text-white p-6 text-lg rounded-xl mt-6 w-full" endContent={<Signpost size={40}/>}>Añadir</Button>
            </form>
            <ToastContainer position="bottom-right" autoClose={2500} theme="light" closeOnClick draggable transition={Slide} stacked/>
        </section>
    );
}