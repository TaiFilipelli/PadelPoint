import {useAuthStore} from "../../store/auth";
import { verifyResponse, getAuthHeader } from "../../utils/services";
const baseUrl = import.meta.env.VITE_API_URL;

export const getPaletas = async () => {
    const response = await fetch(`${baseUrl}/racket`);
    const data = await verifyResponse(response);
    if (data.status) {
      return data.requestResponse;
    } else {
      throw new Error(data.messageDetails || 'Error fetching data');
    }
  };

export const getOnePaleta = async(id)=>{
    const response = await fetch(`${baseUrl}/racket/${id}`);
    const data = await verifyResponse(response);
    if(data.status){
        return data.requestResponse;
    }else{
        throw new Error(data.messageDetails || 'Error fetching single data');
    }
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