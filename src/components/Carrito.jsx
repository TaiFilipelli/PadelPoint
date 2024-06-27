import { useState, useEffect } from 'react';
import { Drawer, Button } from 'keep-react';
import { ShoppingCart, SmileySad, Warning } from 'phosphor-react';

/**
 * Componente que representa el drawer flotante del carrito de compras.
 * 
 * @param {Object} props - Las propiedades del componente 
 * @param {Array} props.items - Array que almacena todos los items que se encuentran en Local Storage añadidos a la cesta del usuario.
 * @returns {JSX.Element} Devuelve el componente del drawer del carrito.
 */
const Carrito = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Agarramos del local storage el token y la hora en que se loggeó el usuario
    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();

    if (token && loginTime) {
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      // Si ha pasado más de una hora (3600000 ms), eliminar el token
      if (elapsedTime > 3600000) {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
    }

    // Función para manejar el evento de cambio en el local storage
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        const newToken = event.newValue;
        if (newToken) {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      }
    };

    // Añadir el evento listener para cambios en el local storage
    window.addEventListener('storage', handleStorageChange);

    // Eliminar el evento listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)} className='bg-black' color='secondary'>
        <ShoppingCart size={35} />
      </Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position='right'>
        <Drawer.Content className='flex items-center justify-center text-white bg-black'>
          {isLogged ? (
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
                  <SmileySad size={90} />
                  <p className='text-xl my-2 font-poppinsLight'>El carrito está vacío.</p>
                  <p className='my-1 font-poppinsLight text-blue-700 cursor-pointer' onClick={() => setIsOpen(false)}>Volver</p>
                </div>
              )}
            </div>
          ) : (
            <div className='flex justify-center items-center text-center flex-col'>
              <Warning size={180} />
              <h1 className='text-2xl font-poppinsMedium'>No ha iniciado sesión para usar esta función. Inicie sesión para continuar.</h1>
            </div>
          )}
        </Drawer.Content>
      </Drawer>
    </>
  );
};

export default Carrito;
