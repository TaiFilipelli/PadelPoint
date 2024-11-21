import { Input, Button, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/react"
import { useState, useEffect } from "react";
import { getTypes, getBrands, getOneProductById } from "../../data/storeData";
import { addNewBrand, addNewProduct, addNewRole, addNewType, addNewSupplier, getSuppliers, createImage } from "../../data/dashboardData";
import { toast, ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddEntity = ({ entity }) => {

    //Estados que almacenarán los datos ingresados para pasarlos como parámetro y para su posterior adición a la db.
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [shipping, setShipping] = useState('');

    //Estados para almacenar los valores traidos desde la db
    const [brands, setBrands] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [types, setTypes] = useState([]);

    //Estados para almacenar los valores que el admin elija de la dropdown para su posterior ingreso a la db mediante el método addNewProduct
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [secondariesImages, setSecondariesImages] = useState([]);

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
          setBrands(data.recourse);
        } catch (error) {
          console.error("Error fetching brands:", error);
        }
      };
    
      const fetchSuppliers = async () => {
        try {
          const data = await getSuppliers();
          setSuppliers(data.recourse);
        } catch (error) {
          console.error("Error fetching suppliers:", error);
        }
      };
    
      const fetchTypes = async () => {
        try {
          const data = await getTypes()
          setTypes(data.recourse);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching types:", error);
          setLoading(false);
        }
      };

      if (loading && entity === "producto") {
        return <div>Cargando...</div>;
      }

    const addSecondaryImage = () => {
        setSecondariesImages([...secondariesImages, ""]);
    };
    
    const updateSecondaryImage = (index, value) => {
        const updatedImages = secondariesImages.map((img, i) => i === index ? value : img);
        setSecondariesImages(updatedImages);
    };
    
    const removeSecondaryImage = (index) => {
        const updatedImages = secondariesImages.filter((_, i) => i !== index);
        setSecondariesImages(updatedImages);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        switch(entity){
            case 'producto':
                addProduct(name, image, description, price, stock, shipping, selectedBrand, selectedSupplier, selectedType, secondariesImages);
                e.target.reset();
                break;
            case 'imagen':
                addNewImage(name, image);
                toast.success('Nueva imagen añadida con éxito!')
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
    const addProduct = async(name, image, description, price, stock, shipping, brandId, supplierId, typeId /*secondariesImages*/) => {
        const newProduct = {
            name: name,
            image: image,
            description: description,
            // secondariesImages: secondariesImages,
            price: parseFloat(price),
            stock: parseInt(stock),
            shippingCost: parseInt(shipping),
            brandId: brandId.id,
            supplierId: supplierId.id,
            typeId: typeId.id
        };
        console.log(newProduct)
        console.log(image)
        if (image.size > 10 * 1024 * 1024) { 
            toast.error("El archivo es demasiado grande (máximo 10MB).");
            return;
          }
        const result = await addNewProduct(newProduct);
        console.log('Response from API deaum:',result)
        if(result.status === 200){
            toast.success('Producto añadido con éxito!', result.message);
        }else{
            toast.error('Error al añadir el producto');
        }
    }

    const addNewImage = async (id, image) => {
        const product = await getOneProductById(parseInt(id));
        console.log(image)
        console.log(product);
        if(product){
            const result = await createImage(product.recourse.id, image);
            console.log(result);
            // toast.success('Imagen añadida con éxito!', result)
        }
    }

  return (
    <section className='flex flex-wrap max-[950px]:flex-col items-center p-16 max-[600px]:p-10'>
        <div className="p-2 w-1/3 max-[950px]:w-full">
            <h1 className="text-4xl font-semibold">{`Añadir ${entity}`}</h1>
            <h2 className="text-lg font-normal my-4">Ingrese los campos solicitados de forma correcta.</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-2/3 max-[950px]:w-full" encType="multipart/form-data">
        <fieldset className="my-2 w-2/3 max-[450px]:w-full">
            <Input label='Nombre' value={name} onChange={(e) => setName(e.target.value)} isClearable/>
        </fieldset>
        {entity === "producto" && (
                <>
                    <fieldset className="my-2 w-2/3 max-[450px]:w-full">
                        <Input type="file" fullWidth onChange={(e) => setImage(e.target.files[0])} accept="image/*" name="image"/>
                    </fieldset>
                    <fieldset className="my-2 w-2/3 max-[450px]:w-full">
                        <Input label='Descripción del producto' fullWidth value={description} onChange={(e) => setDescription(e.target.value)} isClearable/>
                    </fieldset>
                    <fieldset className="my-2 w-2/3 max-[450px]:w-full">
                        <Input label='Precio' type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} isClearable/>
                    </fieldset>
                    <fieldset className="my-2 w-2/3 max-[450px]:w-full">
                        <Input label='Stock' type="number" fullWidth value={stock} onChange={(e) => setStock(e.target.value)} isClearable/>
                    </fieldset>
                    <fieldset className="my-2 w-2/3 max-[450px]:w-full">
                        <Input label='Coste de envío' type="number" fullWidth value={shipping} onChange={(e) => setShipping(e.target.value)} isClearable/>
                    </fieldset>
                    <div className="flex flex-row max-[550px]:flex-col items-center gap-2 w-full mt-4">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="p-2 mb-4 font-medium text-black bg-white w-[40%] max-[550px]:w-3/4" variant="light" radius="sm">{selectedBrand.id? selectedBrand.name : 'Marca'}</Button>
                        </DropdownTrigger>
                        <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }} selectionMode="single">
                            {brands.map(brand => (
                                <DropdownItem key={brand.id} onClick={()=>setSelectedBrand(brand)} className="text-black">{brand.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="p-2 mb-4 font-medium text-sm text-black bg-white w-[40%] max-[550px]:w-3/4" variant="light" radius="sm">{selectedSupplier.id? selectedSupplier.name : 'Proveedor'}</Button>
                        </DropdownTrigger>
                        <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }} selectionMode="single">
                            {suppliers.map(supplier => (
                                <DropdownItem key={supplier.id} onClick={()=>setSelectedSupplier(supplier)} className="text-black">{supplier.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="p-2 mb-4 font-medium text-black bg-white w-[40%] max-[550px]:w-3/4" variant="light" radius="sm">{selectedType.id? selectedType.name : 'Tipo'}</Button>
                        </DropdownTrigger>
                        <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }} selectionMode="single">
                            {types.map(type => (
                                <DropdownItem key={type.id} onClick={()=>setSelectedType(type)} className="text-black">{type.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                {secondariesImages.map((img, index) => (
                    <fieldset key={index} className="my-2 w-full flex items-center">
                        <Input /*label={`Imagen secundaria ${index + 1}`}*/ fullWidth onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*"/>
                        <Button onClick={() => removeSecondaryImage(index)} className="ml-2 bg-red-600 text-white">Eliminar</Button>
                    </fieldset>
                ))}
            <Button type="button" onClick={addSecondaryImage} className="mt-4">Añadir Imagen Secundaria</Button>
            </>
        )}
        {entity === 'imagen' && (
            <Input type="file" className="mt-4 w-2/5 max-[490px]:w-full bg-blue-600 text-white" accept="image/*" required/>
        )}
        <Button type="submit" className="mt-4 w-2/5 max-[490px]:w-full bg-blue-600 text-white">{`Añadir ${entity}`}</Button>
      </form>
      <ToastContainer position="bottom-right" autoClose={1500} transition={Slide} theme="light" closeOnClick draggable/>
    </section>
  )
}

export default AddEntity
