import { Modal } from "keep-react"
import { useState } from "react"
import Register from "./pages/Register"

const Login = ({text}) => {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
      setIsOpen(true)
    }
    const closeModal = () => {
      setIsOpen(false)
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
      }
  return (
    <>
        <button onClick={openModal} className='bg-transparent text-red-600 hover:underline'>{text}</button>
        {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} className='text-black'>
          <Modal.Body className='flex justify-center items-center text-center flex-col p-6 h-2/3 w-2/3'>
            <h1 className='font-poppinsBold text-2xl p-4'>Bienvenido! Inicie sesión para continuar</h1>
            <section className='text-left ml-3'>
              <form onSubmit={handleSubmit}>

              </form>
            </section>
            <div className='flex-wrap flex items-center font-poppinsBold justify-between w-full'>
              <button className="font-poppinsBlack text-2xl rounded-xl bg-black text-white p-4">Iniciar sesión</button>
              <p className="font-poppinsMedium text-lg">No tienes una cuenta? <Register text='Registrate aqui'/></p>
              {/* <button onClick={closeModal} className='font-poppinsRegular hover:underline'>Cerrar</button> */}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default Login
