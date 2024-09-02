import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getBrands, deleteBrand, getSuppliers, deleteSupplier, getTypes, deleteTypeOfProduct, getRoles, deleteRoles, getProducts, deleteProduct } from "src/data/data";

const DeleteEntity = ({entity}) => {
  
  //Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]) //Estado para traer datos de la base de datos
  const [selectedItem, setSelectedItem] = useState([]); //Estado para almacenar el item escogido del Dropdown

  const handleDelete = async(e) => {
    e.preventDefault();
    switch(entity){
      case 'producto':
        const response = await deleteProduct();
        if(response.ok){
          toast.success('Producto eliminado con éxito');
        }else{
          toast.error('Error inesperado eliminando el producto');
        }
        break
      case 'marca':
        const responseBrand = await deleteBrand(selectedItem.id)
        if (responseBrand.status === 500) {
          toast.error('No se pudo eliminar la marca: hay un producto existente que hace referencia a ella.');
        } else if (responseBrand.ok) {
          toast.success('Marca eliminada con éxito');
        } else {
          toast.error('Ocurrió un error inesperado.');
        }
        break
      case 'tipo':
        const responseType = await deleteTypeOfProduct(selectedItem.id);
        if (responseType.status === 500) {
          toast.error('No se pudo eliminar el tipo: hay un producto existente que hace referencia a él.');
        } else if (responseType.ok) {
          toast.success('Tipo de producto eliminado con éxito');
        } else {
          toast.error('Ocurrió un error inesperado.');
        }
        break;
      case 'proveedor':
        const responseSupp = await deleteSupplier(selectedItem.id);
        if (responseSupp.status === 500) {
          toast.error('No se pudo eliminar el proveedor: hay un producto existente que hace referencia a él.');
        } else if (responseSupp.ok) {
          toast.success('Proveedor eliminado con éxito');
        } else {
          toast.error('Ocurrió un error inesperado.');
        }
        break;
      case 'rol':
        const responseRol = await deleteRoles(selectedItem.id);
        if (responseRol.status === 500) {
          toast.error('No se pudo eliminar el rol: hay un usuario que hace referencia a él.');
        } else if (responseRol.ok) {
          toast.success('Rol eliminado con éxito')
        } else {
          toast.error('Ocurrió un error inesperado.');
        }
        break;
      default:
        console.error("Entidad no reconocida");
    }
    setIsModalOpen(false);
  }
  useEffect(()=>{
    const fetchData = async() => {
      let result = [];
      try{
        switch(entity){
          case 'producto':
            result = await getProducts();
            setData(result);
            break
          case 'marca':
            result = await getBrands();
            setData(result);
            break
          case 'tipo':
            result = await getTypes();
            setData(result);
            break;
          case 'proveedor':
            result = await getSuppliers();
            setData(result);
            break;
          case 'rol':
            result = await getRoles();
            setData(result);
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
  },[entity])

  return (
    <section className='flex items-center flex-col pt-12'>
      <h1 className="text-2xl font-semibold mb-8">Seleccione el item a eliminar de la base de datos</h1>
      <Dropdown>
        <DropdownTrigger className="w-1/2 text-lg mb-8">
          <Button className="bg-white text-black">{selectedItem.id ? selectedItem.name : `Elegir ${entity}`}</Button>
        </DropdownTrigger>
        <DropdownMenu>
          {data.map(item=>(
            <DropdownItem value={item.id} onClick={()=>setSelectedItem(item)} className="text-black">{item.name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button onClick={()=>setIsModalOpen(true)} className='bg-red-600 text-white text-lg'>Eliminar {entity}</Button>
      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} isDismissable={false} isKeyboardDismissDisabled={false} placement="top-center" className="bg-gray-700">
        <ModalContent>
          <ModalHeader className="font-bold text-2xl">Aviso</ModalHeader>
          <ModalBody>
            <p className="text-lg">Está a punto de eliminar permamentemente un registro de la base de datos. Recuerde que, en caso de arrepentimiento, puede volver a ingresar
              la entidad añadiéndola nuevamente desde el Dashboard.
            </p>
            <p className="text-xl mt-4 font-semibold">Está seguro que desea continuar?</p>
          </ModalBody>
          <ModalFooter className="gap-6">
            <Button onClick={()=>setIsModalOpen(false)}>Cancelar</Button>
            <Button className="bg-red-600 text-white text-medium" onClick={handleDelete}>Eliminar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer position="bottom-right" autoClose={2000} theme="light" closeOnClick draggable transition={Slide}/>
    </section>
  )
}

export default DeleteEntity
