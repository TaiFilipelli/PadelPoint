import React, {useState, useEffect} from 'react'
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from '@nextui-org/react';
import { updateNAMEONLYEntities, updateProductPriceOrSupplier, getSuppliers} from '../data/dashboardData';
import { getBrands, getProducts, getTypes } from '../data/storeData';

const EditEntity = ({entity}) => {

  const [data, setData] = useState([]) //Estado para traer datos de la base de datos
  const [selectedItem, setSelectedItem] = useState([]); //Estado para almacenar el item escogido del Dropdown
  const [selectedSupplier, setSelectedSupplier] = useState([]);

  const [updatedName, setUpdatedName] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(null);
  const [supplier, setSupplier] = useState([]);

  useEffect(()=>{
    const fetchData = async() => {
        let result = [];
        let suppliers = [];
        try{
          switch(entity){
            case 'producto':
              result = await getProducts();
              suppliers = await getSuppliers();
              setData(result.recourse);
              setSupplier(suppliers.recourse);
              break
            case 'marca':
              result = await getBrands();
              setData(result.recourse);
              break
            case 'tipo':
              result = await getTypes();
              setData(result.recourse);
              break;
            case 'proveedor':
              result = await getSuppliers();
              setData(result.recourse);
              break;
            default:
              console.error("Entidad no reconocida");
          }
        }catch(error){
          toast.error('Error adquiriendo la información de la base de datos')
        }
      };
      setSelectedItem([]);
      fetchData();
  }, [entity])

  const handleEdit = async(e) => {
    e.preventDefault();
    switch(entity){
        case 'marca':
            await updateNAMEONLYEntities(selectedItem.id, updatedName, 'brand');
            toast.success('Marca actualizada correctamente')
            break
        case 'producto':
            const product = await updateProductPriceOrSupplier(selectedItem.id, updatedPrice, selectedSupplier.id)
            toast.success('Producto actualizado con éxito')
            break
        case 'tipo':
            await updateNAMEONLYEntities(selectedItem.id, updatedName, 'type');
            toast.success('Tipo de producto actualizado correctamente')
            break
        case 'proveedor':
            await updateNAMEONLYEntities(selectedItem.id, updatedName, 'supplier');
            toast.success('Proveedor actualizado correctamente')
            break
        default:
            toast.error('Error inesperado al editar entidades.');
            break
    }
  }

  return (
    <section className='flex items-center flex-col p-10 max-[470px]:p-2'>
        <h1 className='font-semibold text-2xl mt-4'>Editar {entity}</h1>
        <h3 className='font-normal text-xl mb-8'>Elija el item que quiera editar y llene los campos que desee.</h3>
        <Dropdown>
            <DropdownTrigger className='w-1/2 max-[750px]:w-full text-medium'>
                <Button className='bg-white text-black'>{selectedItem.id ? selectedItem.name : `Elegir ${entity} a editar`}</Button>
            </DropdownTrigger>
        <DropdownMenu className='text-black'>
            {data.map(item => (
            <DropdownItem key={item.id} value={item.id} onClick={() => setSelectedItem(item)}>{item.name}</DropdownItem>
            ))}
        </DropdownMenu>
        </Dropdown>
        {entity === 'producto' ? 
        <>
            <Input type='number' placeholder={ selectedItem.id ? `Precio viejo: $${selectedItem.price}` : 'Precio viejo: $???'} onChange={(e)=>setUpdatedPrice(e.target.value)} className='w-2/6 max-[750px]:w-1/2 mb-4 text-black mt-4'/>
            <Dropdown>
            <DropdownTrigger className='w-1/2 text-lg mb-8 max-[780px]:w-full'>
                <Button className='bg-white text-black'>{selectedSupplier.id ? selectedSupplier.name : `Elegir proveedor`}</Button>
            </DropdownTrigger>
            <DropdownMenu className='text-black'>
                {supplier.map(supp => (
                    <DropdownItem key={supp.id} value={supp.id} onClick={() => setSelectedSupplier(supp)}>{supp.name}</DropdownItem>
                ))}
            </DropdownMenu>
            </Dropdown>
        </>
        :
            <Input type='text' placeholder='Nuevo nombre...' className='w-2/6 max-[780px]:w-full text-black mb-4 mt-4' onChange={(e)=>setUpdatedName(e.target.value)} isClearable/>
    }
        <Button onClick={handleEdit} className='bg-blue-600 text-white text-lg'>Actualizar</Button>
      <ToastContainer position="bottom-right" autoClose={2000} theme="light" closeOnClick draggable transition={Slide}/>
    </section>
  )
}

export default EditEntity
