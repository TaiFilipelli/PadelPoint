import { useState } from 'react'
import { Drawer, Button } from 'keep-react'
import { ShoppingCart, SmileySad } from 'phosphor-react'
/**
 * Componente que representa el drawer flotante del carrito de compras.
 * 
 * @param {Object} props - Las propiedades del componente 
 * @param {Boolean} props.isLogged - Estado que determina si un usuario está loggeado o no.
 * @param {Array} props.items - Array que almacena todos los items que se encuentran en Local Storage añadidos a la cesta del usuario.
 * @returns {JSX.Element} Devuelve el componente del drawer del carrito.
 */
const Carrito = ({isLogged, items}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <>
        <Button onClick={()=> setIsOpen(!isOpen)} className='bg-black' color='secondary'>
            <ShoppingCart size={35}/>
        </Button>
        <Drawer isOpen={isOpen} onClose={()=>setIsOpen(false)} position='right'>
            <Drawer.Content className='flex items-center justify-center text-white bg-black'>
                { isLogged?
                <div className='mx-auto space-y-3'>
                    <h1 className='text-3xl font-poppinsBlack mb-10'>Mi carrito de compras</h1>
                    {items.length > 0 ? (
                        <ul>
                            {items.map((item, index) => (
                            <li key={index} className="my-2">
                                {item.name} - ${item.price}
                            </li>
                            ))}
                        </ul>
                ) : (
                    <div className='flex justify-center flex-col items-center'>
                        <SmileySad size={90}/>
                        <p className='text-xl my-2 font-poppinsLight'>El carrito está vacío.</p>
                        <p className='my-1 font-poppinsLight text-blue-700 cursor-pointer' onClick={()=>setIsOpen(false)}>Volver</p>
                    </div>
                )}
                </div>
                :
                <h1 className='text-2xl font-poppinsMedium'>No ha iniciado sesión para usar esta función. Inicie sesión <a href="Register.jsx" className='text-red-600 font-poppinsBlack'>aquí</a></h1>
                }
            </Drawer.Content>
        </Drawer>
    </>
  )
}

export default Carrito
