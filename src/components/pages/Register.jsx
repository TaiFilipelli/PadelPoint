import {useState} from 'react'
import { Modal } from 'keep-react'
const Register = ({text}) => {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
      setIsOpen(true)
    }
    const closeModal = () => {
      setIsOpen(false)
    }
  return (
    <>
        <button onClick={openModal} className='bg-transparent text-red-600 hover:underline'>{text}</button>
        {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <Modal.Body>
            
            <button onClick={closeModal}>Close</button>
          </Modal.Body>
        </Modal>
      )}
    </>

  )
}

export default Register
