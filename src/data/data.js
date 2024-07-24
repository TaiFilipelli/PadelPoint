import { verifyResponse } from "utils/services";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async() => {
    const response = await fetch(`${baseUrl}/product`);
    console.log('Fetching from:', `${baseUrl}/product`);
    const data = await verifyResponse(response);
    console.log('Fetched data:', data);
    return data;
}

export const getOneProductById = async(id) => {
    const response = await fetch(`${baseUrl}/product/${id}`);
    console.log('Fetching from:', `${baseUrl}/product/${id}`);
    const data = await verifyResponse(response);
    console.log('Fetched data:', data);
    return data;
}

export const getBrands = async()=>{
    const response = await fetch(`${baseUrl}/brand`);
    const data = await verifyResponse(response);
    console.log('Fetched data:',data);
    return data;
}

export const createOneUser = async(credenciales)=>{
    const response = await fetch(`${baseUrl}/user`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credenciales)
    });
    const result = await verifyResponse(response);
    return result;
}

export const userLogin = async(credenciales)=>{
    const response = await fetch(`${baseUrl}/auth`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credenciales)
    });
    const result = await verifyResponse(response);
    if (response.ok) {
        console.log("login exitoso!", result)
    }
    return result;
}
