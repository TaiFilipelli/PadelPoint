import { Input, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react"
import { useState, useEffect } from "react";
import { addNewType, getTypes, addNewBrand, getBrands, addNewSupplier, getSuppliers, addNewRole } from "src/data/data";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddEntity = ({ entity}) => {

    //Estados que almacenarán los datos ingresados para pasarlos como parámetro y para su posterior adición a la db.
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    //Estados para almacenar los valores traidos desde la db
    const [brands, setBrands] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [types, setTypes] = useState([]);

    //Estados para almacenar los valores que el admin elija de la dropdown para su posterior ingreso a la db mediante el método addNewProduct
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState([]);
    const [selectedType, setSelectedType] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (entity === "producto") {
          fetchBrands();
          fetchSuppliers();
          fetchTypes();
        }
      }, [entity]);

      const fetchBrands = async () => {
        try {
          const data = await getBrands();
          setBrands(data);
        } catch (error) {
          console.error("Error fetching brands:", error);
        }
      };
    
      const fetchSuppliers = async () => {
        try {
          const data = await getSuppliers();
          setSuppliers(data);
        } catch (error) {
          console.error("Error fetching suppliers:", error);
        }
      };
    
      const fetchTypes = async () => {
        try {
          const data = await getTypes()
          setTypes(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching types:", error);
          setLoading(false);
        }
      };

      if (loading && entity === "producto") {
        return <div>Cargando...</div>;
      }
    const handleSubmit = (e) => {
        e.preventDefault();
        switch(entity){
            case 'producto':
                addProduct(name, image, description, price, selectedBrand, selectedSupplier, selectedType);
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
    const addProduct = (name, image, description, price, brandId, supplierId, typeId) => {
        // Implementar la lógica para añadir un producto
        console.log(`Producto añadido: ${name}, ${image}, ${description}, ${price}`);
    }

  return (
    <section className='flex flex-wrap items-center p-16'>
        <div className="p-2 w-1/3">
            <h1 className="text-4xl font-semibold">{`Añadir ${entity}`}</h1>
            <h2 className="text-lg font-normal mt-4">Ingrese los campos solicitados de forma correcta.</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-2/3">
        <fieldset className="my-2 w-2/3">
            <Input label='Nombre' value={name} onChange={(e) => setName(e.target.value)}/>
        </fieldset>
        {entity === "producto" && (
                <>
                    <fieldset className="my-2 w-2/3">
                        <Input label='Imagen' fullWidth value={image} onChange={(e) => setImage(e.target.value)}/>
                    </fieldset>
                    <fieldset className="my-2 w-2/3">
                        <Input label='Descripción del producto' fullWidth value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </fieldset>
                    <fieldset className="my-2 w-2/3">
                        <Input label='Precio' type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </fieldset>
                    <Dropdown className="my-4">
                        <DropdownTrigger>
                            <Button className="p-2 mb-4 font-medium text-black bg-white w-1/3" variant="light" radius="sm">{selectedBrand.id? selectedBrand.name : 'Elija marca'}</Button>
                        </DropdownTrigger>
                        <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }} selectionMode="single">
                            {brands.map(brand => (
                                <DropdownItem key={brand.id} onClick={()=>setSelectedBrand(brand)} className="text-black">{brand.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="p-2 mb-4 font-medium text-sm text-black bg-white w-1/3" variant="light" radius="sm">{selectedSupplier.id? selectedSupplier.name : 'Elija proveedor'}</Button>
                        </DropdownTrigger>
                        <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }} selectionMode="single">
                            {suppliers.map(supplier => (
                                <DropdownItem key={supplier.id} onClick={()=>setSelectedSupplier(supplier)} className="text-black">{supplier.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="p-2 mb-4 font-medium text-black bg-white w-1/3" variant="light" radius="sm">{selectedType.id? selectedType.name : 'Elija tipo'}</Button>
                        </DropdownTrigger>
                        <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }} selectionMode="single">
                            {types.map(type => (
                                <DropdownItem key={type.id} onClick={()=>setSelectedType(type)} className="text-black">{type.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </>
            )}
        <Button type="submit" className="mt-4 w-2/5">Añadir</Button>
      </form>
      <ToastContainer position="bottom-right" autoClose={1500} transition={Slide} theme="light" closeOnClick draggable/>
    </section>
  )
}

export default AddEntity
