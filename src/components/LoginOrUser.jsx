import { Modal } from 'keep-react'
import { SignIn } from 'phosphor-react'
import { useState } from 'react'

const LoginOrUser = () => {
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
      setIsOpen(true)
    }
    const closeModal = () => {
      setIsOpen(false)
    }
  return (
    <>
        <button onClick={openModal}><SignIn size={25}/></button>
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

export default LoginOrUser;
