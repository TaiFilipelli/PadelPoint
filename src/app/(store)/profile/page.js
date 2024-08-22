'use client';
import { getUserById, checkUserState } from "src/data/data";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { PuffLoader } from "react-spinners";

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
        <section className="p-16 flex flex-col text-black w-full items-center">
            { isLoading ? 
            <div className="flex h-[38vh] items-center justify-center">
                <PuffLoader color="#2563EB" size={80}/>
            </div>
            : 
            <section className="w-full h-[38vh]">
                { isLogged ? 
                    <div className="w-full flex flex-col items-center text-center">
                        <h1 className="font-bold text-xl my-4">Nombre:{userData.name}</h1>
                        <h2 className="font-semibold text-lg my-4">Nombre de usuario:@{userData.username}</h2>
                        <h1 className="font-bold text-xl my-4">Correo electrónico:{userData.email}</h1>
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