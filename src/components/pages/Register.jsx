import { Label} from 'keep-react';
import { Link, useNavigate } from 'wouter';
import { registerSchema } from '../../../schemas/Register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createOneUser } from '../services/data';
import { ArrowUUpLeft } from 'phosphor-react';
import toast from 'react-hot-toast'

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createOneUser(data);
            console.log('Usuario creado! Revisar DB', result);
            navigate('/');
        } catch (error) {
            console.error('ERROR ACÁ PA:', error);
            setError('apiError', {
                type: 'manual',
                message: error.message,
            });
            toast.error('Error al crear un usuario.');
        }
    }

    return (
        <section className='flex flex-wrap absolute top-0 left-0 w-full h-full z-50 bg-custom-dark-bg'>
            <div className='register-bg w-1/2 bg-no-repeat max-[640px]:w-full max-[640px]:h-40'/>
            <section className='flex flex-col items-start justify-center p-6 w-full sm:w-1/2'>
                <h1 className='font-poppinsBlack text-white text-5xl mb-6'>¡Únete a la familia PadelPoint hoy!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <fieldset className='p-2 mt-4'>
                        <Label htmlFor='name' className='block font-poppinsMedium text-white text-xl mb-1'>Nombre</Label>
                        <input 
                            type="text" 
                            id='name' 
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular max-[1011px]:w-full' 
                            placeholder='John' 
                            {...register('name')}
                        />
                        {errors.name && <span className='text-red-500 font-poppinsBlack ml-6'>{errors.name.message}</span>}
                    </fieldset>
                    <fieldset className='p-2 mt-2'>
                        <Label htmlFor='userName' className='block font-poppinsMedium text-white text-xl mb-1'>Nombre de usuario</Label>
                        <input 
                            type="text" 
                            id='userName' 
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular max-[1011px]:w-full' 
                            placeholder='john_doe' 
                            {...register('userName')}
                        />
                        {errors.userName && <span className='text-red-500 font-poppinsBlack ml-6'>{errors.userName.message}</span>}
                    </fieldset>
                    <fieldset className='p-2 mt-2'>
                        <Label htmlFor='email' className='block font-poppinsMedium text-white text-xl mb-1'>Correo electrónico</Label>
                        <input 
                            type="email" 
                            id='email' 
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular max-[1011px]:w-full' 
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
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular max-[1011px]:w-full' 
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
                            className='rounded-md w-1/2 bg-white text-black p-2 font-poppinsRegular max-[1011px]:w-full' 
                            placeholder='Confirmar contraseña...'
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && <span className='text-red-500 font-poppinsBlack ml-6'>{errors.confirmPassword.message}</span>}
                    </fieldset>
                    {errors.apiError && <span className='text-red-500 font-poppinsBlack ml-6'>{errors.apiError.message}</span>}
                    <button 
                        type='submit' 
                        className='font-poppinsMedium p-3 bg-black text-white rounded-md mt-4 ml-2 w-1/3 max-[1011px]:w-1/2'>
                        Registrarme
                    </button>
                </form>
                <div className='flex flex-row mt-4 items-center text-center justify-center'>
                <ArrowUUpLeft size={25} color='white'/>
                <Link to='/' className='hover:underline text-white ml-2'>
                Volver atrás</Link>
                </div>
            </section>
        </section>
    );
}

export default Register;
