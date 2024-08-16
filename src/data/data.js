import { verifyResponse } from "utils/services";

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

// MÉTODOS PARA EL LOGIN: Registro, actualización de usuario para el username en caso el usuario loggea con Google por primera vez, 
// inicio de sesión, desloggeo y búsqueda de token en local para verificar estado del usuario y confirmar su autenticación y, futuramente, su autorización.
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

// MÉTODOS PARA EL DASHBOARD: Actualización de precios
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