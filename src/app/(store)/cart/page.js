'use client';
import { Poppins } from "next/font/google";
import { useCartStore } from "../../../data/useCartStore";
import { useState, useEffect, useMemo } from "react";
import { checkUserState, refreshUserToken } from "../../../data/loginData";
import { getOpenpayToken, createPaymentIntent, getOneProductById, getUserAddresses, getProducts } from "../../../data/storeData";
import { SmileySad, Trash, LockKey, Plus, Minus, ClockUser, UserSwitch,MapPin } from "@phosphor-icons/react";
import { Divider, Button, Modal, ModalBody, ModalContent, ModalFooter,ModalHeader, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PuffLoader } from "react-spinners";
import { Accesories } from "../../../components/cart/Accesories";
import { Products } from "../../../components/cart/Products"


const pop = Poppins({subsets:['latin'],weight:['700','600','400']});

export default function Cart() {
    const cart = useCartStore((state) => state.cart);
    const [products, setProducts] = useState([]);
    const [accesories, setAccesories] = useState([]);
    const [user, setUser] = useState(0);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);
    const [needsLogin, setNeedsLogin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [method, setMethod]=useState(0);
    //Método entero para optimizar el rendimiento de la aplicación: 0 == Efectivo/Transferencia, 1 == MP

    const router = useRouter();

    const message = useMemo(() => {
      if (products.length === 0) return '';

      let message = 'Hola! Deseo comprar los siguientes productos:%0A';

      products.forEach((product) => {
          message += `${product.cantidad}x ${product.name} - $${product.price}%0A`;
      });
      message += `Total: $${subtotal}`;
      return message;
  }, [products]);

  const linkBuilder = async() =>{
    setLoading(true);
    if(method===0){
      const number = '3364181788'; //Aquí va el número del receptor del mensaje de wp.
      return router.push(`https://wa.me/${number}?text=${message}`);
    }
    // else if(method===1){
    //   const key = await getOpenpayToken();
    //   if(key.status===true){
    //     const link = await sendCartToAPI();
    //     if(link){
    //       router.push(link.url);
    //     }
    //   }
    // }
    else{
      router.push('/payment?addressId='+selectedAddress);
    }
  }


    const refreshToken = async() => {
      const refreshedToken = await refreshUserToken();
      if(refreshedToken.token!==null){
        setIsModalOpen(false);
        window.location.reload();
        toast.success('Sesión actualizada! Puede continuar');
      }
    }

    // const handleOPButton = () => {
    //   setMethod(1);
    //   toast.success('Método actualizado (Créd/Deb)!')
    // };
    const handleEFVOButton = () => {
      setMethod(0);
      toast.success('Método actualizado (Efvo/Trs)!');
    };
    const handleMP = () =>{
      setMethod(1);
      toast.success('Método actualizado (MercadoPago)!')
    }

    useEffect(() => {
      const checkRefreshToken = async () => {
        const status = await checkUserState();
        console.log(status);
        if (status.isLogged === false && status.refreshTokenExists === true) {
          setNeedsRefresh(true);
        } else if (status.isLogged === false || status.refreshTokenExists === false) {
          setNeedsLogin(true);
        } else {
          setUser(status.payload.id);
        }
        setLoading(false)
      };
      checkRefreshToken();
    }, []);
    
    useEffect(() => {
      const fetchAddress = async () => {
        if (user!==0) {
          const address = await getUserAddresses(user);
          console.log(address);
          if (address.status) {
            setAddress(address.recourse);
          }
        } else {
            setAddress([]);
        }
        setLoading(false);
      };
      fetchAddress();
    }, [user]);
    
    useEffect(() => {
      const fetchProducts = async () => {
        if (cart.length > 0) {
          const productsData = await Promise.all(
            cart.map(async (item) => {
              const res = await getOneProductById(item.id);
              const product = res.recourse;
              return { ...product, cantidad: item.cantidad };
            })
          );
          setProducts(productsData);
        } else {
          setProducts([]);
        }
      };
      const fetchRecommendedAccesories = async () => {
        const res = await getProducts({type:'Accesorios', limit:2});
        if(res){
          const recProducts = res.recourse;
          setAccesories(recProducts);
          return recProducts;
        }else{
          setAccesories([]);
        }
      };
      fetchProducts();
      fetchRecommendedAccesories();
    }, [cart]);
    
      
      useEffect(()=>{
        if(cart.length > 0){
          const newSubtotal = products.reduce((acc, product) => acc + (product.price * product.cantidad), 0);
          setSubtotal(newSubtotal);
        }else{
          setSubtotal(0);
        }
      })

    const handlePaymentButton = async() =>{
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
  };


  // const sendCartToAPI = async () => {
  //   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
  //   const items = cartItems.map((cartItem) => {
  //     const productDetails = products.find(product => product.id === cartItem.id);
  
  //     return {
  //       id: cartItem.id,
  //       name: productDetails.name,
  //       unitPrice: {currency: "032",amount: productDetails.price * 100}, // Ya esperamos que venga en el formato adecuado
  //       quantity: cartItem.cantidad
  //     };
  //   });
  
  //   const payload = {
  //     data: {
  //       attributes: {
  //         currency: "032",
  //         items
  //       }
  //     }
  //   };
  
  //   try {
  //     const response = await createPaymentIntent(payload);

  //     if (response) {
  //       console.log('Payment link succesfully created!');
  //       return response;
  //     } else {
  //       console.error('Error:', response.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };




    return (
        <section className="p-16 flex flex-col max-[500px]:items-center max-[500px]:text-center bg-[#264492]">
            <h1 className={`${pop.className} text-5xl font-bold mb-4`}>Carrito</h1>
            { loading ? (
                <div className="flex h-[50vh] items-center justify-center">
                    <PuffLoader color="#2563EB" size={80}/>
                </div>
            ):
            <section>
              <Products products={products} />
              <Divider />
              <Accesories accessories={accesories} />
              <Divider/>
              <h3 className="text-3xl font-semibold mt-4">Subtotal: ARS${subtotal} </h3>
              <h2 className="font-normal text-xl mt-4">Seleccione el método de pago a usar</h2>
              <div className="flex flex-row max-[967px]:flex-col gap-4 w-auto max-[967px]:w-[40%] max-[579px]:w-[60%] max-[470px]:w-full mt-4 mb-8">
                {/* <Button className="text-lg p-6 hover:bg-[#004481] hover:text-[#14C8BE] border-1 transition-colors ease-linear" onClick={handleOPButton}>Crédito o débito</Button> */}
                <Button onClick={handleEFVOButton} className="text-black hover:bg-green-600 hover:text-white border-1 transition-colors ease-linear text-lg p-6">Efectivo/transferencia</Button>
                <Button onClick={handleMP} className="text-lg p-6 border-1 hover:bg-white transition-colors ease-linear"><img src="/MP_PNGs/azul-horizontal.png" alt="Logo Mercado Pago" className="w-full h-14 max-[470px]:h-20"/></Button>
              </div>
              <Divider/>
              <section className="flex flex-col gap-4 w-auto max-[470px]:w-full mt-4 mb-8">
                <h3 className="font-bold text-3xl">Dirección de envío</h3>
                <p className="text-xl text-wrap">Seleccione su dirección de envío. En caso no se encuentre la dirección deseada, añada una nueva.</p>
                { loading ? (
                    <p className="text-xl text-center">Cargando direcciones...</p>
                  ) : (
                    address.length>0 ? (
                    <section className="flex flex-col max-[500px]:text-center gap-4 mt-4">
                    {address.map(address => (
                      <article key={address.id} className={`${pop.className} rounded-3xl p-5 border-1 border-white bg-default-100 text-white ${selectedAddress === address.id ? 'bg-green-500':'bg-transparent'} w-1/3 max-[750px]:w-2/3 max-[500px]:w-full transition-colors duration-700`}>	
                        <h3 className="font-semibold text-2xl">{address.addressStreet} {address.addressNumber}</h3>
                        <p className="font-normal text-lg mb-4">C.P. {address.postalCode}</p>
                        <Button className={`bg-red-500 text-white font-light px-2 ${selectedAddress === address.id ? 'bg-green-900' : ''}`} onClick={() => setSelectedAddress(address.id)}>{selectedAddress === address.id ? 'Seleccionado' : 'Seleccionar'}</Button>
                      </article>
                  ))}
                  <Button as={Link} href={"/profile/new_address"} className={`bg-blue-600 text-white p-6 w-1/3 ${pop.className} text-lg rounded-3xl`} endContent={<MapPin size={40} weight="light"/>} >Añadir dirección</Button>
                  </section>
              ) : (
              <p className="text-xl text-red-300 font-bold">No hay direcciones registradas. Añada una nueva.</p>
            ))
          }
          </section>
          <Divider/>
          <Button className="bg-red-600 mt-4 w-1/4 max-[1000px]:w-1/2 max-[579px]:w-2/3 max-[450px]:w-full text-white font-semibold text-xl p-6 max-[470px]:text-lg" startContent={<LockKey weight="duotone" size={25}/>} onClick={handlePaymentButton}>Finalizar compra</Button>
          <p className="text-lg mt-4">Ante cualquier inconveniente, no dude en comunicarse directamente con nosotros! 😊</p>
          <Modal isOpen={isModalOpen} onClose={handleModalClose} isDismissable={false} isKeyboardDismissDisabled={false} placement="top-center">
              <ModalContent>
                  <ModalHeader className="text-black flex text-center justify-center">
                      <h2 className="text-3xl font-bold">Confirmación de pago</h2>
                  </ModalHeader>
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
                      ) : 
                        <div className="text-black px-6 py-4">
                          <h2 className="text-2xl font-bold mb-2">Usted pagará ARS${subtotal} con {method==0? 'Efectivo/transferencia':'Mercado Pago'}. Desea continuar?</h2>
                          <p className="text-lg font-semibold">Se le redireccionará a la página de pago adecuada según el método elegido.</p>
                        </div>
                  }
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
                      ) : 
                          <>
                            <Button as={Link} onClick={linkBuilder} className="bg-blue-600 text-white text-medium p-6">{loading? <SyncLoader color="#fff" size={15}/>:'Confirmar pago'}</Button>
                            <Button onClick={handleModalClose} className="bg-red-600 text-white text-medium p-6">Cancelar</Button>
                          </>}
                  </ModalFooter>
              </ModalContent>
          </Modal>
          <ToastContainer position="bottom-right" autoClose={2000} theme="light" closeOnClick draggable transition={Slide} stacked/>
          </section>
        }
           
        </section>
    );
}
