import { useState } from 'react'
import { Modal } from 'keep-react'
const Register = ({text}) => {
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
          <Modal.Body className='flex justify-center items-center text-center flex-col p-6'>
            <h1 className='font-poppinsBold text-2xl p-4'>La familia PadelPoint, más cerca que nunca!</h1>
            <section className='text-left'>
              <p className='font-poppinsLight'>Complete los campos con los datos requeridos. Recuerde no compartir esta información con nadie!</p>
              <form onSubmit={handleSubmit}>

              </form>
            </section>
            <div className='flex-wrap flex items-center font-poppinsBold justify-between w-full'>
              <button>Registrarse</button>
              <button onClick={closeModal} className='font-poppinsRegular hover:underline'>Cerrar</button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>

  )
}

export default Register
