import { Modal, Label } from 'keep-react'
import { SignIn } from 'phosphor-react'
import { useState } from 'react'
import { userLogin } from './services/data'
import { Link } from 'wouter'
import {useAuthStore} from '../store/auth'
import { checkIfIsEmailOrUsername } from '../utils/services'
import { loginSchema } from '../../schemas/Login'
import { z } from "zod";

/**
 * Componente para manejar el inicio de sesión de usuarios.
 * Muestra un botón de inicio de sesión que abre un modal para ingresar credenciales.
 * Al enviar el formulario, valida los datos ingresados y realiza el inicio de sesión.
 * 
 * @component
 * @returns {JSX.Element} Componente de inicio de sesión.
 */
const LoginOrUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [userOrEmail, setUserOrEmail] = useState('');
    const [errors,setErrors] = useState({});
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    const openModal = () => {
      setIsOpen(true)
    }

    const closeModal = () => {
      setIsOpen(false)
    }
    /**
     * Maneja la lógica de envío del formulario de inicio de sesión.
     * Valida los datos ingresados y realiza el inicio de sesión si son válidos.
     * 
     * @param {Event} e - Evento de envío del formulario.
     */
    const onSubmit = async(e) =>{
      e.preventDefault();
      const login = userOrEmail.trim();

      const fieldType = checkIfIsEmailOrUsername(login);
      const data = { [fieldType === 'email' ? 'email' : 'username']: login, password };

    try {
      const validatedData = loginSchema.parse(data);

      const { username, email, password } = validatedData;
      const credentials = { UsernameOrMailAddress: username ?? email, password };

      const result = await userLogin(credentials);
      console.log(result);

      if(result.token){
        localStorage.setItem('token',result.token);
        localStorage.setItem('username',result.user.userName);
        setUsername(result.user.userName);
        closeModal();
        const { login } = useAuthStore();
        login(validatedData);
      }
      else{
        setErrors({server: result.messageDetails || "Error en el servidor"})
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errores = error.errors.reduce((acc,curr)=>{
          acc[curr.path[0]] = curr.message;
          return acc;
        },{});
        setErrors(errores);
      } else {
        console.error('Error al procesar los datos:', error);
      }
    }
  }
  return (
    <>
        { username ? (<button onClick={openModal} className='flex flex-row text-xl'>{username}<SignIn size={25} className='ml-2'/></button>):(<button onClick={openModal} className='flex flex-row text-xl'>Iniciar sesión<SignIn size={25} className='ml-2'/></button>)}
        {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} className='text-black'>
          <Modal.Body className='w-3/6 p-8'>
            <div className='justify-between flex flex-row items-center'>
            <h1 className='font-poppinsBold text-4xl mb-5'>Bienvenido de vuelta!</h1>
            <img src="/LogoPadelPoint.png" alt="Logo Login" className='h-[8rem]'/>
            </div>
            <form onSubmit={onSubmit}>
              <fieldset className='flex flex-col text-left w-3/4 mb-1'>
                <Label htmlFor='username' className='font-poppinsRegular mt-4 text-lg'>Nombre de usuario o correo electrónico</Label>
                <input type="text" 
                name='login' 
                id='username' 
                className='rounded-md h-9 p-2 bg-gray-500 text-white'
                placeholder='Nombre o correo...'
                required 
                value={userOrEmail}
                onChange={(e)=> setUserOrEmail(e.target.value)}
                />
                {errors.login && <p className='text-red-500'>{errors.login}</p>}
              </fieldset>
              <fieldset className='flex flex-col text-left w-3/4'>
                <Label htmlFor='password' className='font-poppinsRegular mt-4 text-lg'>Contraseña</Label>
                <input type="password" 
                name='login' 
                id='password' 
                className='rounded-md h-9 p-2 bg-gray-500 text-white' 
                placeholder='Contraseña...' 
                required 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                {errors.password && <p className='text-red-500'>{errors.password}</p>}
              </fieldset>
              {errors.server && <p className='text-red-500'>{errors.server}</p>}
            <div className='flex w-full justify-between mt-10'>
              <button type='submit' className='bg-black text-white font-poppinsMedium p-3 rounded-md cursor-pointer'>Ingresar</button>
              <Link to='/register' onClick={closeModal} className='hover:underline cursor-pointer'>No tiene una cuenta? Registrate hoy!</Link>
            </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default LoginOrUser;
