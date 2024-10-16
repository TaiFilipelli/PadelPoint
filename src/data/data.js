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
    const response = await fetch(`${baseUrl}/product${query}`,{
            cache:'force-cache',
        }
    );
    const data = await verifyResponse(response);
    return data;
}

export const getOneProductById = async(id) => {
    const response = await fetch(`${baseUrl}/product/${id}`);
    const data = await verifyResponse(response);
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
        body: JSON.stringify(credenciales),
        credentials:'include'
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
    const data = await response.json();
    return data;
}

export const refreshUserToken = async() => {
    const response = await fetch(`${baseUrl}/auth/refresh`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        credentials:'include'
    })
    const result = await verifyResponse(response);
    return result;
}

export const sendEmailToResetPass = async(email) =>{
    const response = await fetch(`${baseUrl}/user/reset-pass-code`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ email }),
        credentials:'include'
    })
    console.log(response)
    return response;
}
export const verifyCode = async(email, code) => {
    const numericCode = parseFloat(code)
    const response = await fetch(`${baseUrl}/user/reset-pass-validate-code`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email, code:numericCode}),
        credentials:'include'
    })
    console.log(JSON.stringify({email, code:numericCode}));
    return response;
}
export const changePassword = async(newPassword) => {
    const response = await fetch(`${baseUrl}/user/reset-pass`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ newPassword }),
        credentials:'include'
    })
    console.log(response);
    return response;
}
// MÉTODOS PARA EL DASHBOARD: Creación, edición y eliminación de registros de la base de datos.

//MÉTODOS USADOS EN EL DASHBOARD PARA AÑADIR ENTIDADES
export const addNewProduct = async(data) => {
    const response = await fetch(`${baseUrl}/product`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await verifyResponse(response);
    if(response.ok){console.log('New product added to Database succesfully', result)}
    return result;
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
        method:'PATCH',
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

//MÉTODOS PARA EL PAYTMENT CON OPENPAY
export const getOpenpayToken = async () => {
    try{
        const response = await fetch(`${baseUrl}/payment/token`);
        const data = await verifyResponse(response);
        return data;
    }catch(error){
        console.log(error)
    }
}
export const createPaymentIntent = async(data) => {
    try{
        const response = await fetch(`${baseUrl}/payment/preference`,{
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