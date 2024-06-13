import React, { useState } from 'react'
import { Drawer, Button } from 'keep-react'
import { ShoppingCart } from 'phosphor-react'

const Carrito = ({isLogged}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
    <>
        <Button onClick={()=> setIsOpen(!isOpen)} className='bg-red-500' color='secondary'>
            <ShoppingCart size={35}/>
        </Button>
        <Drawer isOpen={isOpen} onClose={()=>setIsOpen(false)} position='right'>
            <Drawer.Content className='flex items-center justify-center text-white bg-black'>
                { isLogged?
                <div className='mx-auto space-y-3'>
                    <h1 className='text-2xl font-faustinaBold'>Mi carrito de compras</h1>
                </div>
                :
                <h1 className='text-2xl'>No ha iniciado sesión para usar esta función. Inicie sesión <a href="/" className='text-red-600'>aquí!</a></h1>
                }
            </Drawer.Content>
        </Drawer>
    </>
  )
}

export default Carrito
