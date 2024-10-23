'use client';
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { sendEmailToResetPass, verifyCode } from "../../../../data/loginData";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const pop = Poppins({ subsets: ['latin'], weight: ['700', '400'] });

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(Array(6).fill(''));

    const router = useRouter();

    const handleEmail = async () => {
        const sendCode = await sendEmailToResetPass(email);
        if (sendCode.status === 404) {
            toast.error('No existe un usuario con esa dirección de correo.');
        } else if(sendCode.status === 400) {
            toast.error('Ingrese un correo válido o inténtelo de nuevo más adelante.');
        }else{
            toast.success('Código enviado con éxito!');
        }
    };

    const handleCodeChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);
    };

    const handleVerifyCode = async () => {
        const fullCode = code.join('');
        console.log('CREDENCIALES:', fullCode)
        const verificationResult = await verifyCode(email, fullCode);
        if (verificationResult.status === 201) {
            toast.success('Código verificado exitosamente.');
            setTimeout(()=>{
                router.push('/login/forgot_password/new_password');
            }, 1500);
        } else {
            toast.error('Código incorrecto. Inténtalo nuevamente.');
        }
    };

    return (
        <section className="flex flex-col items-center text-center p-16 text-white bg-[#264492]">
            <h1 className={`${pop.className} text-4xl font-bold mb-4`}>Recuperá tu contraseña</h1>
            <h2 className={`${pop.className} text-2xl mb-6 font-normal`}>Ingresá el correo de tu cuenta. Te llegará a la dirección otorgada un código único de 6 caractéres para validar tu usuario.
                Ingresalo a continuación.
            </h2>
            <Input 
                type="email" 
                placeholder="example@gmail.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-1/3 mb-4 text-black"
            />
            <Button onClick={handleEmail} className="mb-10 bg-blue-600 text-white text-lg p-6" >Enviar código</Button>
            <div className="flex flex-row gap-2 mb-4">
                {code.map((digit, index) => (
                    <Input 
                        key={index} 
                        type="number" 
                        value={digit} 
                        onChange={(e) => handleCodeChange(index, e.target.value)} 
                        className="w-16 text-center" 
                        maxLength={1}
                    />
                ))}
            </div>
            <Button onClick={handleVerifyCode} className="">Verificar código</Button>
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
