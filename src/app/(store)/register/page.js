'use client';
import { Poppins } from "next/font/google";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../../schemas/Register";
import { createOneUser, getAllIdTypes } from "../../../data/loginData";
import { Input, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { IdentificationCard, UserCircle } from "@phosphor-icons/react";
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const pop = Poppins({ subsets: ["latin"], weight: ['400','700'] });

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(registerSchema),
    });
    
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null)

    const router = useRouter();

    const getTypes = async() =>{
        const types = await getAllIdTypes();
        setTypes(types);
    }

    useEffect(()=>{
       getTypes();
    },[])

    const onSubmit = async (data) => {
        const { confirmPassword,addressStreet, addressNumber, postalCode, ...credentials } = data;

        if (!selectedType) {
            console.error('El tipo de identificación no ha sido seleccionado');
            toast.error("Debe seleccionar un tipo de documento.");
            return;
        }

        credentials.address = [
            {
                addressStreet: data.addressStreet,
                addressNumber: data.addressNumber,
                postalCode: data.postalCode
            }
        ]

        credentials.idType = selectedType.id;
        credentials.idNumber = parseInt(credentials.idNumber);

        console.log('Credentials', credentials);

        try {
            const result = await createOneUser(credentials);
            if(result.statusCode !== 404){
                toast.success("Usuario creado exitosamente!")
                console.log('Usuario creado! Revisar DB', result);
                setTimeout(() => {
                    router.push('/');
                }, 2500);
            }else{
                toast.error('ERROR')
                console.error(result);
            }
        } catch (error) {
            console.error('ERROR ACÁ PA:', error);
            toast.error("Error al crear el usuario.")
            setError('apiError', {
                type: 'manual',
                message: error.message,
            });
        }
    };

    return (
        <main className="flex flex-col items-center justify-center text-center p-16 bg-[#264492]">
            <section className="w-full max-w-screen-xl p-8 bg-gray-300 rounded-lg shadow-lg text-black">
                <h1 className={`${pop.className} text-3xl mb-4`}>Únete a la familia PadelPoint hoy</h1>
                <hr className="border-black"/>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                    <section className="flex flex-row max-[740px]:flex-col gap-4 mb-4">
                        <article className="w-1/2 max-[740px]:w-full flex flex-col gap-4">
                            <header className="flex flex-row items-center gap-4">
                                <IdentificationCard size={60} weight="regular"/>
                                <h1 className={`${pop.className} font-bold text-2xl`}>Datos Personales</h1>
                            </header>
                            <div>
                                <Input 
                                    type="text"
                                    label="Nombre"
                                    {...register("name")}
                                    className="w-full"
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                    <div>
                        <Input
                            type="text"
                            label="Apellido"
                            {...register("surname")}
                            className="w-full"
                        />
                        {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Dirección (opcional)"
                            {...register("addressStreet")}
                            className="w-full"
                        />
                        {errors.addressStreet && <p className="text-red-500">{errors.addressStreet.message}</p>}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Nro. dirección (opcional)"
                            {...register("addressNumber")}
                            className="w-full"
                        />
                        {errors.addressNumber && <p className="text-red-500">{errors.addressNumber.message}</p>}
                    </div>
                    <Dropdown>
                        <DropdownTrigger className="w-full bg-red-500 text-white text-lg">
                            <Button className="w-full bg-red-500 text-white text-lg max-[500px]:text-sm" aria-label="Botón de registro">
                                { selectedType ? selectedType.name : 'Seleccione tipo de documento'}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {types.map((type) => (
                                <DropdownItem key={type.id} className="w-full bg-white text-black text-lg" onClick={() => setSelectedType(type)}>
                                    {type.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <div>
                        <Input
                            type="number"
                            label="Número de ID"
                            {...register("idNumber")}
                            className="w-full"
                        />
                        {errors.idNumber && <p className="text-red-500">{errors.idNumber.message}</p>}
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Código postal"
                            {...register("postalCode")}
                            className="w-full"
                        />
                        {errors.idNumber && <p className="text-red-500">{errors.postalCode.message}</p>}
                    </div>

                    </article>
                    <article className="w-1/2 max-[740px]:w-full flex flex-col gap-4">
                    <header className="flex flex-row items-center gap-4">
                        <UserCircle size={60} weight="regular"/>
                        <h1 className={`${pop.className} font-bold text-2xl`}>Datos de cuenta</h1>
                    </header>
                    <div>
                        <Input 
                            type="text"
                            label="Nombre de usuario"
                            {...register("username")}
                            className="w-full"
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div>
                        <Input 
                            type="email"
                            label="Correo electrónico"
                            {...register("email")}
                            className="w-full"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Input 
                            type="password"
                            label="Contraseña"
                            {...register("password")}
                            className="w-full"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <Input 
                            type="password"
                            label="Confirmar contraseña"
                            {...register("confirmPassword")}
                            className="w-full"
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    </article>
                    </section>
                    {errors.apiError && <p className="text-red-500">{errors.apiError.message}</p>}
                    <Button type="submit" className="w-full bg-red-500 text-white text-lg" aria-label="Botón de registro">
                        Registrarse
                    </Button>
                </form>
                <ToastContainer position="bottom-right" autoClose={2500} theme="light" closeOnClick draggable transition={Slide} stacked/>
            </section>
        </main>
    );
}
