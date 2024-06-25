import { Modal, Label } from 'keep-react'
import { SignIn } from 'phosphor-react'
import { useState } from 'react'
import { userLogin } from './services/data'

const LoginOrUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [userOrEmail, setUserOrEmail] = useState('');
    const openModal = () => {
      setIsOpen(true)
    }
    const closeModal = () => {
      setIsOpen(false)
    }
    const handleLogin= async(e)=>{
      e.preventDefault();

      const response = await userLogin()

    }
  return (
    <>
        <button onClick={openModal} className='flex flex-row text-xl'>Iniciar sesión <SignIn size={25} className='ml-2'/></button>
        {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} className='text-black'>
          <Modal.Body className='w-3/6 p-8'>
            <div className='justify-between flex flex-row items-center'>
            <h1 className='font-poppinsBold text-4xl mb-5'>Bienvenido de vuelta!</h1>
            <img src="/LogoPadelPoint.png" alt="Logo Login" className='h-[8rem]'/>
            </div>
            <form onSubmit={handleLogin}>
              <fieldset className='flex flex-col text-left w-3/4 mb-1'>
                <Label htmlFor='username' className='font-poppinsRegular mt-4 text-lg'>Nombre de usuario o correo electrónico</Label>
                <input type="text" name='login' id='username' className='rounded-md h-9 p-2 bg-gray-500 text-white' placeholder='Nombre o correo...'/>
              </fieldset>
              <fieldset className='flex flex-col text-left w-3/4'>
                <Label htmlFor='password' className='font-poppinsRegular mt-4 text-lg'>Contraseña</Label>
                <input type="password" name='login' id='password' className='rounded-md h-9 p-2 bg-gray-500 text-white' placeholder='Contraseña...'/>
              </fieldset>
            </form>
            <div className='flex w-full justify-between mt-10'>
              <button className='bg-black text-white font-poppinsMedium p-3 rounded-md'>Ingresar</button>
              <button onClick={closeModal} className='hover:underline'>Close</button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default LoginOrUser;
