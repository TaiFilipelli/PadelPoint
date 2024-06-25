import {useAuthStore} from "../../store/auth";
import { verifyResponse, getAuthHeader } from "../../utils/services";
const baseUrl = import.meta.env.VITE_API_URL;

export const getPaletas = async()=>{
    const response = await fetch(`${baseUrl}/racket`);
    return verifyResponse(response);
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
    return verifyResponse(response);
}