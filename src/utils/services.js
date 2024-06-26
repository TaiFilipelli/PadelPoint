import {useAuthStore} from "../store/auth";

export const verifyResponse = async(response)=>{
    if(!response.ok){
        throw new Error(response.statusText);
    }
    const result = await response.json();
    return result;
};

export const getAuthHeader = ()=>{
    const {token} =useAuthStore.getState();
    return `Bearer ${token}`;
}
export const checkIfIsEmailOrUsername = (usernameOrEmail) => {
    const isEmail = usernameOrEmail.includes("@");
    return isEmail ? "email" : "username";
  };