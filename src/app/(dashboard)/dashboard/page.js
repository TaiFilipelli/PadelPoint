'use client';
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { Pencil, Plus, Eraser } from "@phosphor-icons/react";
import { Button } from "@nextui-org/react";
import { getAllOrders } from "../../../data/dashboardData";
import { useEffect, useState } from "react";

const mont = Montserrat({subsets:['latin'],weight:'600'});

export default function Dashboard(){

  const [orders, setOrders] = useState([]);

  const getOrders = async()=>{
    try{
      const toDate = new Date();
      const fromDate = new Date(toDate.getMonth()-1);

      const toDateString = toDate.toISOString();
      const fromDateString = fromDate.toISOString();

      const params = {
        minDate:fromDateString.trim(),
        maxDate:toDateString.trim()
      }

      const response = await getAllOrders(params);
      if(response.status){
      setOrders(response.recourse);
    }else{
      setOrders([])
    }}catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getOrders();
  },[])

  return (
    <main className="gap-10 flex flex-col w-full ">
    <section className="flex items-center flex-col p-10 bg-black rounded-lg w-full">
      <h1 className={`${mont.className} text-3xl my-2 max-[410px]:my-8`}>Menú de Administrador</h1>
      <h2 className={`${mont.className} text-xl mb-8`}>Elija la opción que desee.</h2>
      <div className="w-full max-[1000px]:flex-col flex justify-between items-center gap-5 mb-5">
        <Button radius="large" as={Link} href="/dashboard/edit" variant="shadow" startContent={<Pencil size={25} />} className="w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg">
          Editar
        </Button>
        <Button radius="large" as={Link} href="/dashboard/add" variant="shadow" startContent={<Plus size={25} />} className="w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg">
          Añadir
        </Button>
        <Button radius="large" as={Link} href="/dashboard/delete" variant="shadow" startContent={<Eraser size={25} />} className="w-[12rem] h-[3rem] bg-gradient-to-br from-cyan-300 to-violet-300 text-lg">
          Borrar
        </Button>
      </div>
      <Link href="/" className="hover:underline">Volver a la tienda</Link>
    </section>
  
    <section className={`flex items-center flex-col p-4 bg-black rounded-lg w-full ${mont.className}`}>
      <h2 className="text-3xl mb-4 max-[410px]:my-8 text-white">Últimas órdenes del mes</h2>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full bg-white text-black rounded-lg text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Comprador</th>
              <th className="px-4 py-2">C.P. Destino</th>
              <th className="px-4 py-2">Precio neto</th>
              <th className="px-4 py-2">Método</th>
              <th className="px-4 py-2">Productos comprados</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => {

            const productsSummary = order.items
            .map(item => `${item.quantity}x ${item.product.name}`)
            .join(', ');

          return (
          <tr key={index} className="bg-white hover:bg-gray-400 transition-all duration-300 ease-in-out whitespace-nowrap">
            <td className="border px-4 py-2">{order.paymentId}</td>
            <td className="border px-4 py-2">{order.user.email}</td>
            <td className="border px-4 py-2">{order.destination.postalCode}</td>
            <td className="border px-4 py-2">{order.netPrice}$</td>
             <td className="border px-4 py-2">MP_TRANSFER</td>  {/* En un futuro, cambiar esto a order.method */}
            <td className="border px-4 py-2">{productsSummary}</td>
            <td className="border px-4 py-2">{order.total}$</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7" className="border px-4 py-2 text-center">No hay órdenes disponibles.</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </section>
  </main>
  );}