import {useAuthStore} from "../store/auth";

export const verifyResponse = (response)=>{
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return response.json();
};

export const getAuthHeader = ()=>{
    const {token} =useAuthStore.getState();
    return `Bearer ${token}`;
}
export const checkIfIsEmailOrUsername = (usernameOrEmail) => {
    const isEmail = usernameOrEmail.includes("@");
    return isEmail ? "email" : "username";
  };