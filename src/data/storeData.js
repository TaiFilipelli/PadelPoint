import { verifyResponse } from "../../utils/services";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// MÉTODOS PARA EL E-COMMERCE: constructor de querys, conseguir todos los productos, buscarlos por id para detalles y tipos y marcas para filtros.
export const buildQuery = (params) => {
    const query = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return query ? `?${query}` : '';
}

export async function getProducts(params = {}){
    const query = buildQuery(params);
    const response = await fetch(`${baseUrl}product${query}`,{
            cache:'force-cache',
        }
    );
    const data = await verifyResponse(response);
    return data;
}

export const getOneProductById = async(id) => {
    const response = await fetch(`${baseUrl}product/${id}`);
    const data = await verifyResponse(response);
    return data;
}

export const getBrands = async()=>{
    const response = await fetch(`${baseUrl}brand`);
    const data = await verifyResponse(response);
    return data;
}

export const getSomeBrands = async()=>{
    const response = await fetch(`${baseUrl}brand?limit=5`); //preguntar qué marcas en particular mostrar.
    const data = await verifyResponse(response);
    return data;
}

export const getTypes = async() =>{
    const response = await fetch(`${baseUrl}type`);
    const data = await verifyResponse(response);
    return data;
}

//MÉTODOS PARA EL PAYTMENT CON OPENPAY Y MERCADO PAGO RESPECTIVAMENTE
export const getOpenpayToken = async () => {
    try{
        const response = await fetch(`${baseUrl}payment/token`,{credentials:'include'});
        const data = await verifyResponse(response)
        return data;
    }catch(error){
        console.log(error)
    }
}
export const createPaymentIntent = async(data) => {
    try{
        const response = await fetch(`${baseUrl}payment/preference`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        const link = await verifyResponse(response);
        console.log(link)
        return link;
    }catch(error){
        console.log(error)
    }
}

export const createMPPreference = async(info) => {
    console.log('ENTRA INFO AL METODO:',info);
    const data = await fetch(`${baseUrl}payment/mp/preference`,{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then(data=>data)
    .catch(error=>console.log(error));
    console.log(data);
    return data;
}

export const createOrder = async(data) => {
    const response = await fetch(`${baseUrl}order`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data=>data)
    .catch(error=>console.log(error));
    console.log(response);
    return response;
}

export const searchAllAddresses = async() =>{ 
    const data = await fetch(`${baseUrl}address`);
    const result = await verifyResponse(data);
    return result;
}

export const getUserAddresses = async(id) =>{ 
    const data = await fetch(`${baseUrl}user/addresses/${id}`,{
        credentials:'include'
    });
    const result = await verifyResponse(data);
    return result;
}

export const getOrdersByUser = async(id) =>{ 
    const response = await fetch(`${baseUrl}order/user/${id}`);
    const result = await verifyResponse(response);
    return result;
}