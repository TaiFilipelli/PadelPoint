'use client'
import { useRouter } from "next/navigation";
import { Button, Skeleton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import { useCartStore } from "../../../../data/useCartStore";
import { getOneProductById } from "../../../../data/data";
import Link from "next/link";

import { Poppins } from "next/font/google";
const pop = Poppins({subsets:['latin'], weight:['300','400','600']})

export default function PaymentMethodPage() {

    const cart = useCartStore((state)=>state.cart);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [method, setMethod]=useState('');

    const message = useMemo(() => {
        if (products.length === 0) return '';

        let message = 'Hola! Deseo comprar los siguientes productos:%0A';

        products.forEach((product) => {
            message += `${product.cantidad}x ${product.name} - $${product.price}%0A`;
        });

        const total = products.reduce((acc, product) => acc + (product.cantidad * product.price), 0);
        message += `Total: $${total}`;
        setTotal(total);

        return message;
    }, [products]);

    const linkBuilder = () =>{
        const number = '3364181788';
        // console.log(`https://wa.me/${number}?text=${message}`)
        return `https://wa.me/${number}?text=${message}`;
    }
    const handleModalClose = () => {
      setIsModalOpen(false);
  };
    const handleOPButton = () => {
        setMethod('Crédito/Débito');
        setIsModalOpen(true);
    };
    const handleEFVOButton = () => {
        setMethod('Efectivo/Transferencia');
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchProducts = async () => {
          if (cart.length > 0) {
            const productsData = await Promise.all(cart.map(async item => {
              const res = await getOneProductById(item.id);
              return { ...res, cantidad: item.cantidad };
            }));
            setProducts(productsData);
            setIsLoading(false);
          }
          else{
            setProducts([]);
          }
        };
        fetchProducts();
      }, [cart]);

    return (
        <section className={`${pop.className} p-16 flex flex-col items-center text-center bg-[#264492] h-[50vh] max-[540px]:h-full`}>
            <h1 className="font-semibold text-4xl">Finalizar pago</h1>
            <h3 className="font-normal text-xl mt-4">Seleccione el método de pago deseado.</h3>
            <div className="flex flex-col w-[20%] max-[1150px]:w-[50%] max-[540px]:w-full gap-6 my-10">
            {isLoading? 
                <>
                <Skeleton className="w-full rounded-xl">
                    <div className="bg-secondary-700 p-6"/>
                </Skeleton>
                <Skeleton className="w-full rounded-xl">
                    <div className="bg-secondary-700 p-6"/>
                </Skeleton>
                </>
            :
                <>
                <Button className="text-lg p-6 hover:bg-[#004481] hover:text-[#14C8BE] border-1 transition-colors ease-linear" onClick={handleOPButton}>Crédito o débito</Button>
                <Button onClick={handleEFVOButton} className="text-black hover:bg-green-600 hover:text-white border-1 transition-colors ease-linear text-lg p-6">Efectivo/transferencia</Button>
                </>
        }
            </div>
            <p className="text-lg">Ante cualquier inconveniente, no dude en comunicarse directamente con nosotros! 😊</p>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} isDismissable={false} isKeyboardDismissDisabled={false} placement="top-center">
                <ModalContent>
                    <ModalHeader className="text-black flex text-center justify-center">
                        <h2 className="text-3xl font-bold">Confirmación de pago</h2>
                    </ModalHeader>
                    <ModalBody className="text-black px-6 py-4">
                        <h2 className="text-2xl font-bold mb-2">Usted pagará USD${total} con {method}. Desea continuar?</h2>
                        <p className="text-lg font-semibold">Se le redireccionará a la página de pago adecuada según el método elegido.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button as={Link} href={linkBuilder()} className="bg-blue-600 text-white text-medium">Confirmar pago</Button>
                        <Button onClick={handleModalClose} className="bg-red-600 text-white text-medium">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
}