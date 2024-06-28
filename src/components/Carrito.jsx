import { useState, useEffect } from 'react';
import { Drawer, Button } from 'keep-react';
import { ShoppingCart, SmileySad, Warning } from 'phosphor-react';
import { Link } from 'wouter';

/**
 * Componente que representa el drawer flotante del carrito de compras.
 * 
 * @param {Object} props - Las propiedades del componente 
 * @param {Array} props.items - Array que almacena todos los items que se encuentran en Local Storage añadidos a la cesta del usuario.
 * @param {Function} props.removeFromCart - Función para eliminar items del carrito.
 * @returns {JSX.Element} Devuelve el componente del drawer del carrito.
 */
const Carrito = ({ items, removeFromCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');
    const currentTime = new Date().getTime();

    if (token && loginTime) {
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      if (elapsedTime > 3600000) {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
    }

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

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
        let total = 0;
        items.forEach(item => {
            total += item.price;
        });
        setTotalPrice(total);
    };

    calculateTotalPrice();
}, [items]);

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
                <>
                    <ul>
                    {items.map((item, index) => (
                        <li key={index} className="my-2 flex justify-between items-center bg-gray-900 rounded-md p-2">
                        <span className='font-poppinsMedium'>{item.name} - ${item.price}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4 hover:underline">Eliminar</button>
                        </li>
                    ))}
                    </ul>
                    <div className='flex flex-row items-center text-center justify-center gap-10'>
                        <p className="text-xl font-poppinsMedium">Total: US${totalPrice.toFixed(2)}</p>
                        <Link to='/paymentMenu' className='font-poppinsBold bg-red-600 hover:bg-red-300 transition p-2 rounded-md'>Comprar</Link>
                    </div>
                </>
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
