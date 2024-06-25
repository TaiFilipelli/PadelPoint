import { useAuthStore } from "../store/auth";

export const verifyResponse = async (response) => {
    console.log('Response status:', response.status);
    if (!response.ok) {
        console.error('Error:', response.statusText);
        throw new Error('Failed to fetch');
    }
    try {
        const data = await response.json();
        console.log('Parsed JSON:', data);
        return data;
    } catch (error) {
        console.error('JSON parse error:', error);
        throw new Error('Failed to parse JSON');
    }
};


export const getAuthHeader = ()=>{
    const {token} =useAuthStore.getState();
    return `Bearer ${token}`;
}