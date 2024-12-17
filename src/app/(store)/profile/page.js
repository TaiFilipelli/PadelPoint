'use client';
import { getUserById, checkUserState, deleteAddress } from "../../../data/loginData";
import { useState, useEffect } from "react";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { PuffLoader } from "react-spinners";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { Poppins } from "next/font/google";
import { toast } from "react-toastify";
import { getOrdersByUser } from "../../../data/storeData";

const pop = Poppins({ subsets: ["latin"], weight: ["700", "600", "400"] });

export default function ProfilePage() {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([])

    const searchUserData = async () => {
        try{
            const user = await checkUserState();
            if (user.isLogged) {
                setIsLogged(true);
                const data = await getUserById(user.payload.id);
                console.log('data', data);
                setUserData(data.recourse);
                const userOrders = await getOrdersByUser(data.recourse.id)
                console.log('Órdenes de usuario', userOrders.recourse);
                setOrders(userOrders.recourse);
            }
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchUserData();
    }, []);

    return (
        <section className={`${pop.className} p-20 max-[520px]:py-15 max-[520px]:px-10 flex flex-col bg-[#264492] w-full items-center`}>
            {isLoading ? (
                <div className="flex h-[50dvh] items-center justify-center">
                    <PuffLoader color="#fff" size={80} />
                </div>
            ) : (
                <section className="w-full h-auto">
                    <Button as={Link} href="/" className="bg-red-500 text-white">
                        <ArrowLeft size={30} />
                    </Button>
                    {isLogged && userData ? (
                        <div className="w-full flex flex-col items-center text-center">
                            <Avatar src="/LogoPadelPoint.png" className="w-40 h-40" />
                            <h1 className="font-bold text-4xl mt-4">{userData.name} {userData.surname}</h1>
                            <h2 className="font-semibold text-xl mb-4 text-default-400">@{userData.username}</h2>
                            <div className="text-wrap text-left mb-4">
                                <h3 className="font-normal text-xl mt-4">Correo electrónico: {userData.email}</h3>
                                <h4 className="font-normal text-xl">{userData.idType.name}: {userData.idNumber}</h4>
                            </div>
                            <Divider/>
                            <section className="flex flex-col mt-6">
                                <h1 className="font-bold text-3xl mb-4">Direcciones de envío</h1>
                                {userData.address && userData.address.length > 0 ? (
                                    userData.address.map((address, index) => (
                                        <section className="items-center gap-2 max-[420px]:gap-4" key={index}>
                                            <article key={address.id} className="text-left my-2 p-4 rounded-2xl bg-[#162856]">
                                                <h3 className="text-xl font-semibold">{address.addressStreet} {address.addressNumber}</h3>
                                                <h5 className="text-medium mt-2">Código postal: {address.postalCode}</h5>
                                            </article>
                                        </section>
                                    ))
                                    
                                ) : (
                                    <p className="text-center text-lg mb-4">Usted no ha proporcionado direcciones de envío</p>
                                )}
                                <Link href={'/profile/new_address'} className="bg-gray-400 text-black p-4 rounded-xl font-semibold my-6">Añadir nueva dirección</Link>
                            </section>
                            <Divider/>
                            <h3 className="text-3xl font-bold mt-6 mb-4">Historial de órdenes</h3>
                            <section className="bg-white text-black p-4 gap-4 rounded-xl w-full text-left">
                                {orders.length>0?
                                <>
                                    {orders.map((order, index)=>(
                                        <article className="border-1 border-white shadow-sm shadow-black p-4 rounded-xl bg-black text-white" key={index}>
                                            <h1 className="text-2xl font-black">Orden Nro. {order.paymentId}</h1>
                                            <h2 className="font-semibold">Precio total: ${order.total}</h2>
                                            <Divider/>
                                            <h3 className="my-2 text-xl font-semibold">Productos:</h3>
                                            <ul className="gap-4">
                                                {order.items.map((item, indexItem)=>(
                                                    <>
                                                    <article className="flex flex-row items-center my-2" key={indexItem}>
                                                        <img src={`https://${item.product.image}`} className="w-20 h-20 rounded-xl"/>
                                                        <li className="ml-4">{item.product.name} - x{item.quantity} </li>
                                                    </article>
                                                    <Divider/>
                                                    </>
                                                ))}
                                            </ul>
                                        </article>
                                    ))}
                                </>
                                :
                                <h3 className="font-semibold text-xl">No hay registro de órdenes</h3>
                            }
                            </section>
                        </div>
                    ) : (
                        <div className="flex flex-col text-center justify-center h-[50dvh]">
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
