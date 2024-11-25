import { verifyResponse } from "../../utils/services";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// MÉTODOS PARA EL DASHBOARD: Creación, edición y eliminación de registros de la base de datos.

//MÉTODOS USADOS EN EL DASHBOARD PARA AÑADIR ENTIDADES
export const addNewProduct = async(data) => {
    const response = await fetch(`${baseUrl}/product`,{
        method:'POST',
        body:data, 
    }).then((data) => data.json())
    .catch((err)=>console.log('ERROR EN EL METODO:',err));

    console.log('Desde el método addNewProduct', response)
    if(response.status){console.log('New product added to Database succesfully')}
    return response;
}
export const addNewType = async(name) => {
    const response = await fetch(`${baseUrl}/type`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    });
    const result = await verifyResponse(response);
    return result;
}
export const addNewBrand = async(name) => {
    const response = await fetch(`${baseUrl}/brand`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    });
    const result = await verifyResponse(response);
    return result;
}
export const addNewSupplier = async(name) => {
    const response = await fetch(`${baseUrl}/supplier`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    });
    const result = await verifyResponse(response);
    return result;
}
export const getSuppliers = async()=>{
    const response = await fetch(`${baseUrl}/supplier`);
    const data = await verifyResponse(response);
    return data;
}
export const addNewRole = async(name) => {
    const response = await fetch(`${baseUrl}/roles`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    });
    const result = await verifyResponse(response);
    return result;
}

//MÉTODOS USADOS EN EL DASHBOARD PARA ELIMINAR REGISTROS DE ENTIDADES

export const deleteBrand = async(id) => {
    const response = await fetch(`${baseUrl}/brand/${id}`,{
        method:'DELETE',
    });
    return response;
}

export const deleteSupplier = async(id) => {
    const response = await fetch(`${baseUrl}/supplier/${id}`,{
        method:'DELETE',
    });
    return response;
}

export const deleteTypeOfProduct = async(id) => {
    const response = await fetch(`${baseUrl}/type/${id}`,{
        method:'DELETE',
    });
    return response;
}
export const getRoles = async()=>{
    const response = await fetch(`${baseUrl}/roles`);
    const data = await verifyResponse(response);
    return data;
}
export const deleteRoles = async(id) => {
    const response = await fetch(`${baseUrl}/roles/${id}`,{
        method:'DELETE',
    });
    return response;
}
export const deleteProduct = async(id) => {
    const response = await fetch(`${baseUrl}/product/${id}`,{
        method:'DELETE',
    });
    return response;
}

//MÉTODOS USADOS EN EL DASHBOARD PARA ACTUALIZAR ENTIDADES

export const updateNAMEONLYEntities = async(id, name, entity) => {
    const response = await fetch(`${baseUrl}/${entity}/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ name })
    });
    const result = await verifyResponse(response);
    return result;
}
export const updateProductPriceOrSupplier = async (id, price, supplierId) => {
    const numericPrice = parseFloat(price);
    const response = await fetch(`${baseUrl}/product/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price:numericPrice, supplierId })
    });
    console.log("Data sent:", JSON.stringify({ price, supplierId }));
    const result = await verifyResponse(response);
    if (response.ok) {
        console.log("New price updated", result);
    }
    return result;
};

export const createImage = async (id, image) => {
    console.log('Llegaron los params:', id, image)
    const response = await fetch(`${baseUrl}/images/${id}`, {
        method: 'POST',
        body:image
    }).then((data) => data.json())
    .catch((err)=>console.log('ERROR EN EL METODO:',err));
    return response;    
}