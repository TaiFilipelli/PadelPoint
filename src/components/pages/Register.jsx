import { Label } from 'keep-react';
import { useState } from 'react';
import { Link } from 'wouter';
const Register = () => {

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleSubmit = (e) =>{
      e.preventDefault();
    }

  return (
    <section className='flex flex-wrap absolute top-0 left-0 w-full h-full z-50 bg-custom-dark-bg'>
      <div className='register-bg w-1/2 bg-no-repeat'/>
      <section className='flex text-left items-left justify-center flex-col ml-3'>
        <h1 className='font-poppinsBlack text-5xl'>Únete a la familia PadelPoint hoy!</h1>
        <form onSubmit={handleSubmit}>
          <fieldset className='p-2 mt-4'>
            <Label htmlFor='name' className='mr-4 font-poppinsMedium text-white text-xl'>Nombre y apellido</Label>
            <input type="text" id='name' required className='rounded-md w-1/3 bg-white text-black p-1 font-poppinsRegular' placeholder='John Doe' value={name} />
          </fieldset>
          <fieldset className='p-2 mt-2'>
            <Label htmlFor='email' className='mr-4 font-poppinsMedium text-white text-xl'>Correo electrónico</Label>
            <input type="email" id='email' required className='rounded-md w-1/3 bg-white text-black p-1 font-poppinsRegular' placeholder='example@mail.com' value={email} />
          </fieldset>
          <fieldset className='p-2 mt-4'>
            <Label htmlFor='password' className='mr-4 font-poppinsMedium text-white text-xl'>Contraseña</Label>
            <input type="password" id='password' required className='rounded-md w-1/3 bg-white text-black p-1 font-poppinsRegular' />
          </fieldset>
          <fieldset className='p-2 mt-2'>
            <Label htmlFor='confpassword' className='mr-4 font-poppinsMedium text-white text-xl'>Confirmar contraseña</Label>
            <input type="confpassword" id='confpassword' required className='rounded-md w-1/3 bg-white text-black p-1 font-poppinsRegular' />
          </fieldset>
          <button type='submit' onSubmit={handleSubmit} className='font-poppinsMedium p-1 bg-black'>Registrarme</button>
        </form>
        <Link to='/' className='hover:underline ml-2'>Volver atrás</Link>
      </section>
    </section>

  )
}

export default Register
