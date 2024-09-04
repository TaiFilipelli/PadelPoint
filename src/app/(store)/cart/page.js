'use client';
import { Poppins } from "next/font/google";
import { useCartStore } from "../../../data/useCartStore";
import { useState, useEffect } from "react";
import { getOneProductById, checkUserState, refreshUserToken } from "../../../data/data";
import { SmileySad, Trash, LockKey, Plus, Minus, ClockUser, UserSwitch } from "@phosphor-icons/react";
import { Divider, Button, Modal, ModalBody, ModalContent, ModalFooter, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const pop = Poppins({subsets:['latin'],weight:['700','400']});

export default function Cart() {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateCartItem = useCartStore((state) => state.updateCartItem);
    const [products, setProducts] = useState([]);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const [needsLogin, setNeedsLogin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    
    const checkRefreshToken = async() => {
      console.log('-Se llegó al método.')
      const status = await checkUserState();
      console.log('-Status:',status)
      if(status.isLogged === false && status.refreshTokenExists === true){
        setNeedsRefresh(true);
        setIsModalOpen(true);
      }
      else if(status.isLogged === false || status.refreshTokenExists === false){
        setNeedsLogin(true);
        setIsModalOpen(true);
      }
      else{
        router.push('/');
      }
    }

    const refreshToken = async() => {
      await refreshUserToken();
      setIsModalOpen(false);
      toast.success('Sesión actualizada! Puede continuar');
    }
    useEffect(() => {
        const fetchProducts = async () => {
          if (cart.length > 0) {
            const productsData = await Promise.all(cart.map(async item => {
              const res = await getOneProductById(item.id);
              return { ...res, cantidad: item.cantidad };
            }));
            setProducts(productsData);
          }
          else{
            setProducts([]);
          }
        };
        fetchProducts();
      }, [cart]);

    const handleIncrease = (idProducto, cantidad) => {
        const newCantidad = cantidad + 1;
        updateCartItem(idProducto, newCantidad);
    };

    const handleDecrease = (idProducto, cantidad) => {
        if (cantidad > 1) {
            const newCantidad = cantidad - 1;
            updateCartItem(idProducto, newCantidad);
        }
    };

    const handlePaymentButton = async() =>{
      console.log('-Se tocó el botón.');
      await checkRefreshToken();
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
  };

    return (
        <section className="p-16 flex flex-col items-center text-center bg-[#264492]">
            <h1 className={`${pop.className} text-5xl font-bold mb-4`}>Carrito</h1>
            {products.length < 1 ? (
                <section className="flex flex-col my-10 items-center justify-center rounded-3xl p-11 border-1 border-black bg-default-100 text-black">
                    <h2 className={`${pop.className} font-semibold text-3xl m-2`}>Tu carrito está vacío</h2>
                    <SmileySad size={80}/>
                </section>
            ) : (
                products.map(product => (
                  <section key={product.id} className={`${pop.className} flex items-center justify-between p-4 my-4 w-2/5 bg-default-300 rounded-lg text-black`}>
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="ml-4 text-left">
                        <h2 className='text-lg font-semibold'>{product.name}</h2>
                        <p className='font-normal'>Marca: {product.brand.name}</p>
                        <p className='font-normal'>Precio: US${product.price}</p>
                        <div className="flex items-center gap-2 my-2">
                            <Button onClick={() => handleDecrease(product.id, product.cantidad)} className="bg-transparent text-black px-2"><Minus weight="regular" size={20}/></Button>
                            <p className="font-medium">{product.cantidad}</p>
                            <Button onClick={() => handleIncrease(product.id, product.cantidad)} className="bg-transparent text-black px-2"><Plus/></Button>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-red-500 text-white px-2" onClick={() => removeFromCart(product.id)}>
                        <Trash size={24} />
                    </Button>
                  </section>
                ))
            )}
            <Divider/>
            <div className="flex flex-row justify-between w-1/2 my-4">
              <h3 className="text-3xl font-semibold">Subtotal: $$$</h3>
              <Button className="bg-red-600 text-white font-semibold text-xl px-6 py-6" startContent={<LockKey weight="duotone" size={25}/>} onClick={handlePaymentButton}>Finalizar compra</Button>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} isDismissable={false} isKeyboardDismissDisabled={false} placement="top-center">
                <ModalContent>
                    <ModalBody className="text-black p-6">
                        {needsRefresh ? (
                            <div className="flex flex-col items-center text-center">
                                <h2 className="text-2xl font-bold mb-4">Su sesión está a punto de expirar.</h2>
                                <UserSwitch size={70}/>
                                <p className="font-medium text-lg mt-4">¿Desea renovarla para continuar de manera segura con el pago?</p>
                            </div>
                        ) : needsLogin ? (
                            <div className="flex flex-col text-center items-center">
                                <h2 className="text-2xl font-bold mb-4">Su sesión expiró.</h2>
                                <ClockUser size={70}/>
                                <p className="font-medium text-lg mt-4">Debe iniciar sesión para poder utilizar esta función de forma segura.</p>
                            </div>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        {needsRefresh ? (
                            <>
                                <Button onClick={refreshToken} className="bg-blue-600 text-white">Renovar sesión</Button>
                                <Button onClick={handleModalClose} className="bg-red-600 text-white">Cancelar</Button>
                            </>
                        ) : needsLogin ? (
                            <>
                                <Button as={Link} href="/login" className="bg-blue-600 text-white text-medium">Iniciar sesión</Button>
                                <Button onClick={handleModalClose} className="bg-red-600 text-white text-medium">Cancelar</Button>
                            </>
                        ) : null}
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ToastContainer position="bottom-right" autoClose={2000} theme="light" closeOnClick draggable transition={Slide} stacked/>
        </section>
    );
}
