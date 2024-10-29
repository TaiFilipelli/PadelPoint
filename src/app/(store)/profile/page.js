'use client';
import { getUserById, checkUserState } from "../../../data/loginData";
import { useState, useEffect } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { PuffLoader } from "react-spinners";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

export default function ProfilePage() {

    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState([]);

    const searchUser = async() => {
        const user = await checkUserState();
        if(user.payload != null){
            setIsLogged(true);
            const data = await getUserById(user.payload.id);
            setUserData(data);
            setIsLoading(false);
            console.log(data)
        }else{
            setIsLogged(false);
            setIsLoading(false);
        }
        console.log(isLogged)
    }

    useEffect(()=>{
        searchUser();
    },[])

    return (
        <section className="p-20 max-[520px]:py-15 max-[520px]:px-10 flex flex-col text-black w-full items-center">
            { isLoading ? 
            <div className="flex h-[38vh] items-center justify-center">
                <PuffLoader color="#2563EB" size={80}/>
            </div>
            : 
            <section className="w-full h-[40vh]">
                <Button as={Link} href="/" className="bg-red-500 text-white"><ArrowLeft size={30}/></Button>
                { isLogged ? 
                    <div className="w-full flex flex-col items-center text-center">
                        <Avatar src="/LogoPadelPoint.png" className="w-32 h-32"/>
                        <h1 className="font-bold text-3xl mt-4">{userData.name} {userData.surname}</h1>
                        <h2 className="font-semibold text-xl mb-4 text-default-400">@{userData.username}</h2>
                        <div className="text-wrap text-left">
                            <h3 className="font-semibold text-xl mt-4">Correo electrónico: {userData.email}</h3>
                            <h4 className="font-semibold text-xl">{userData.idType.name}: {userData.idNumber}</h4>  
                        </div>
                    </div>
                :

                    <div className="flex flex-col text-center justify-center">
                        <h1 className="text-3xl font-semibold my-6">No se ha encontrado sesión activa</h1>
                        <h2 className="text-xl font-normal">Esto se debe a que su sesión expiró, en caso haya iniciado sesión anteriormente, o a que no se ha autenticado aún.
                            Inicie sesión nuevamente para continuar viendo su perfil.
                        </h2>
                    </div>
                }
            </section>
        }
            
        </section>
    );
}