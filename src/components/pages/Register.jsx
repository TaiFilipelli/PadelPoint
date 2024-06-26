import { Label } from 'keep-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { registerSchema } from '../../../schemas/Register'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = (data) => {
        console.log(data);
        // Aquí puedes manejar el envío del formulario, por ejemplo, hacer una petición a la API
    }

    return (
        <section className='flex flex-wrap absolute top-0 left-0 w-full h-full z-50 bg-custom-dark-bg'>
            <div className='register-bg w-1/2 bg-no-repeat'/>
            <section className='flex flex-col items-start justify-center p-6 w-full sm:w-1/2'>
                <h1 className='font-poppinsBlack text-5xl mb-6'>¡Únete a la familia PadelPoint hoy!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <fieldset className='p-2 mt-4'>
                        <Label htmlFor='userName' className='block font-poppinsMedium text-white text-xl mb-1'>Nombre y apellido</Label>
                        <input 
                            type="text" 
                            id='userName' 
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular' 
                            placeholder='John Doe' 
                            {...register('userName')}
                        />
                        {errors.userName && <span className='text-red-500 font-poppinsBlack ml-6'>{errors.userName.message}</span>}
                    </fieldset>
                    <fieldset className='p-2 mt-2'>
                        <Label htmlFor='email' className='block font-poppinsMedium text-white text-xl mb-1'>Correo electrónico</Label>
                        <input 
                            type="email" 
                            id='email' 
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular' 
                            placeholder='example@mail.com' 
                            {...register('email')}
                        />
                        {errors.email && <span className='text-red-500 font-poppinsBlack ml-6'>{errors.email.message}</span>}
                    </fieldset>
                    <fieldset className='p-2 mt-2'>
                        <Label htmlFor='password' className='block font-poppinsMedium text-white text-xl mb-1'>Contraseña</Label>
                        <input 
                            type="password" 
                            id='password' 
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular' 
                            placeholder='Contraseña...'
                            {...register('password')}
                        />
                        {errors.password && <span className='text-red-500 font-poppinsBlack ml-6'>{errors.password.message}</span>}
                    </fieldset>
                    <fieldset className='p-2 mt-2'>
                        <Label htmlFor='confirmPassword' className='block font-poppinsMedium text-white text-xl mb-1'>Confirmar contraseña</Label>
                        <input 
                            type="password" 
                            id='confirmPassword' 
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular' 
                            placeholder='Confirmar contraseña...'
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                    </fieldset>
                    <button 
                        type='submit' 
                        className='font-poppinsMedium p-3 bg-black text-white rounded-md mt-4 ml-2 w-1/3'>
                        Registrarme
                    </button>
                </form>
                <Link to='/' className='hover:underline text-white mt-4 ml-2'>Volver atrás</Link>
            </section>
        </section>
    );
}

export default Register;
