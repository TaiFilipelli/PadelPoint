import { verifyResponse } from "../../utils/services";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
    const result = await response.json();
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
    console.log('Entraron las creds',credenciales);
    const response = await fetch(`${baseUrl}/auth/login/local`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credenciales),
        credentials:'include'
    });
    const result = await response.json();
    if(response.ok){
        console.log('login succesfull', result)
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

export const getAllIdTypes = async()=>{
    const response = await fetch(`${baseUrl}/id-type`);
    const data = await verifyResponse(response);
    return data;
}