import { Input, Button } from "@nextui-org/react"
import { useState } from "react";
import { addNewType, addNewBrand, addNewSupplier, addNewRole } from "src/data/data";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddEntity = ({ entity}) => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        switch(entity){
            case 'producto':
                addProduct(name, image, description, price);
                break;
            case 'marca':
                addNewBrand(name);
                toast.success('Nueva marca añadida con éxito!')
                break;
            case 'tipo':
                addNewType(name);
                toast.success('Nuevo tipo de producto creado con éxito!')
                break;
            case 'proveedor':
                addNewSupplier(name);
                toast.success('Nuevo proveedor añadido con éxito!')
                break;
            case 'rol':
                addNewRole(name);
                toast.success('Nuevo rol añadido con éxito!')
                break;
            default:
                console.error("Entidad no reconocida");
        }
    }
    const addProduct = (name, image, description, price) => {
        // Implementar la lógica para añadir un producto
        console.log(`Producto añadido: ${name}, ${image}, ${description}, ${price}`);
    }

  return (
    <section className='flex flex-wrap items-center p-16'>
        <div className="p-4 w-1/2">
            <h1 className="text-4xl font-bold">{`Añadir ${entity}`}</h1>
            <h2 className="text-lg mt-4">Ingrese los campos solicitados de forma correcta.</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2">
        <fieldset className="my-2 w-full">
            <Input label='Nombre' value={name} onChange={(e) => setName(e.target.value)}/>
        </fieldset>
        {entity === "producto" && (
                <>
                    <fieldset className="my-2 w-full">
                        <Input label='Imagen' fullWidth value={image} onChange={(e) => setImage(e.target.value)}/>
                    </fieldset>
                    <fieldset className="my-2 w-full">
                        <Input label='Descripción del producto' fullWidth value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </fieldset>
                    <fieldset className="my-2 w-full">
                        <Input label='Precio' type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </fieldset>
                </>
            )}
        <Button type="submit" className="my-4">Añadir</Button>
      </form>
      <ToastContainer position="bottom-right" autoClose={1500} transition={Slide} theme="light" closeOnClick draggable/>
    </section>
  )
}

export default AddEntity
