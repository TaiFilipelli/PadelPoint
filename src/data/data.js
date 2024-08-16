import { verifyResponse } from "utils/services";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const buildQuery = (params) => {
    const query = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    return query ? `?${query}` : '';
}

export async function getProducts(params = {}){
    const query = buildQuery(params);
    const response = await fetch(`${baseUrl}/product${query}`);
    const data = await verifyResponse(response);
    console.log('Fetched data:', data);
    return data;
}

export const getOneProductById = async(id) => {
    const response = await fetch(`${baseUrl}/product/${id}`);
    const data = await verifyResponse(response);
    console.log('Fetched data:', data);
    return data;
}

export const getBrands = async()=>{
    const response = await fetch(`${baseUrl}/brand`);
    const data = await verifyResponse(response);
    return data;
}

export const getTypes = async() =>{
    const response = await fetch(`${baseUrl}/type`);
    const data = await verifyResponse(response);
    return data;
}

export const updateProductPrice = async (id, price) => {
    const response = await fetch(`${baseUrl}/product/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price })
    });
    const result = await verifyResponse(response);
    if (response.ok) {
        console.log("New price updated", result);
    }
    return result;
};

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

export const updateOneUser = async(id, username)=>{
    const response = await fetch(`${baseUrl}/user/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });
    const result = await verifyResponse(response);
    if(response.ok){
        console.log('New username:',result)
    }
    return result;
}

export const userLogin = async(credenciales)=>{
    const response = await fetch(`${baseUrl}/auth/login/local`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credenciales)
    });
    const result = await verifyResponse(response);
    if (response.ok) {
        console.log("login succesfully done", result)
    }
    return result;
}

export const checkUserState = async() =>{
    const response = await fetch(`${baseUrl}/auth/status`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', 
    });
    const data = await verifyResponse(response);
    return data;
}
export const userLogout = async() => {
    const response = await fetch(`${baseUrl}/auth/logout`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include',
    });
    const result = await verifyResponse(response);
    if(response.ok){
        console.log('logout succesfull', result)
    }
    return result;
}

export const getUserById = async(id) =>{
    const response = await fetch(`${baseUrl}/user/${id}`);
    const data = await verifyResponse(response);
    return data;
}

export const searchUserAuthenticated = async() =>{
    const response = await fetch(`${baseUrl}/user/cookie`,{
        credentials: 'include'
      });
    const result = await verifyResponse(response);
    if(response.ok){
        console.log("User info from cookie searched");
    }
    return result;
}