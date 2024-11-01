'use client';
import { getUserById, checkUserState, deleteAddress } from "../../../data/loginData";
import { useState, useEffect } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { PuffLoader } from "react-spinners";
import Link from "next/link";
import { ArrowLeft, Trash } from "@phosphor-icons/react";
import { Poppins } from "next/font/google";
import { toast } from "react-toastify";

const pop = Poppins({ subsets: ["latin"], weight: ["700", "600", "400"] });

export default function ProfilePage() {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const searchUser = async () => {
        const user = await checkUserState();
        if (user.payload != null) {
            setIsLogged(true);
            const data = await getUserById(user.payload.id);
            setUserData(data.recourse);
        }
        setIsLoading(false);
    };

    const showAlert = () =>{
        const alert = document.getElementById('alert');
        alert.classList.toggle('opacity-100');
        alert.classList.toggle('scale-100');
    }
    const hideAlert = () =>{
        const alert = document.getElementById('alert');
        alert.classList.toggle('opacity-0');
        alert.classList.toggle('scale-0');
    }

    const handleDeleteAddress = async(id) =>{
        const result = await deleteAddress(id);
        if(result.statusCode !== 404){
            toast.success('Dirección eliminada exitosamente!')
            console.log('Dirección eliminada exitosamente!', result);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }else{
            toast.error('Error al eliminar la dirección. Inténtelo de nuevo.');
            console.error(result);
        }
    }

    useEffect(() => {
        searchUser();
    }, []);

    return (
        <section className={`${pop.className} p-20 max-[520px]:py-15 max-[520px]:px-10 flex flex-col bg-[#264492] w-full items-center`}>
            {isLoading ? (
                <div className="flex h-[38vh] items-center justify-center">
                    <PuffLoader color="#2563EB" size={80} />
                </div>
            ) : (
                <section className="w-full h-auto">
                    <Button as={Link} href="/" className="bg-red-500 text-white">
                        <ArrowLeft size={30} />
                    </Button>
                    {isLogged && userData ? (
                        <div className="w-full flex flex-col items-center text-center">
                            <Avatar src="/LogoPadelPoint.png" className="w-32 h-32" />
                            <h1 className="font-bold text-4xl mt-4">{userData.name} {userData.surname}</h1>
                            <h2 className="font-semibold text-xl mb-4 text-default-400">@{userData.username}</h2>
                            <div className="text-wrap text-left">
                                <h3 className="font-normal text-xl mt-4">Correo electrónico: {userData.email}</h3>
                                <h4 className="font-normal text-xl">{userData.idType.name}: {userData.idNumber}</h4>
                            </div>
                            <div className="flex flex-col mt-6">
                                <h1 className="font-bold text-2xl">Direcciones de envío</h1>
                                {userData.address && userData.address.length > 0 ? (
                                    userData.address.map((address) => (
                                        <section className="flex flex-row items-center gap-10 max-[420px]:gap-4">
                                            <article key={address.id} className="text-left my-4 p-4 rounded-2xl bg-[#162856]">
                                                <h3 className="font-semibold">{address.addressStreet} {address.addressNumber}</h3>
                                                <h5 className="mt-2">Código postal {address.postalCode}</h5>
                                                <div className="flex flex-row">
                                                    <Button className="bg-red-600 text-white mt-4" onClick={showAlert}><Trash size={50} weight="light"/></Button>
                                                </div>
                                            </article>
                                                <div className="flex flex-col opacity-0 scale-0 transition-all duration-300 ease-in-out" id="alert">
                                                    <h4 className="font-normal text-lg mt-2">Seguro?</h4>
                                                    <div className="flex flex-row max-[430px]:flex-col gap-2 mt-2">
                                                        <Button className="bg-red-600 text-white" onClick={()=>handleDeleteAddress(address.id)}>Si</Button>
                                                        <Button onClick={hideAlert}>No</Button>
                                                    </div>
                                                </div>
                                        </section>
                                    ))
                                    
                                ) : (
                                    <p className="text-center text-xl">Usted no ha proporcionado direcciones de envío</p>
                                )}
                                <Link href={'/profile/new_address'} className="bg-gray-400 text-black p-4 rounded-xl font-semibold">Añadir nueva dirección</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col text-center justify-center h-[40vh]">
                            <h1 className="text-3xl font-semibold my-6">No se ha encontrado sesión activa</h1>
                            <h2 className="text-xl font-normal">
                                Esto se debe a que su sesión expiró, en caso haya iniciado sesión anteriormente, o a que no se ha autenticado aún. Inicie sesión nuevamente para continuar viendo su perfil.
                            </h2>
                        </div>
                    )}
                </section>
            )}
        </section>
    );
}
