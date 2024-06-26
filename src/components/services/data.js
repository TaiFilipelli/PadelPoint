import {useAuthStore} from "../../store/auth";
import { verifyResponse, getAuthHeader } from "../../utils/services";
const baseUrl = import.meta.env.VITE_API_URL;

export const getPaletas = async()=>{
    try{
        const response = await fetch(`${baseUrl}/racket`);
        return verifyResponse(response);
    }catch(error){
        console.error('ERROR EN METODO GETPALETAS:',error);
    }
};

export const getOnePaleta = async(id)=>{
    const response = await fetch(`${baseUrl}/racket/${id}`);
    return verifyResponse(response);
};

export const userLogin = async(credenciales)=>{
    const response = await fetch(`${baseUrl}/auth`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credenciales)
    });
    const result = await response.json();
    return result;
}
export const createOneUser=async(data)=>{
    const response = await fetch(`${baseUrl}/user`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}