export const verifyResponse = async(response)=>{
    if(!response.ok){
        throw new Error(response.statusText);
    }
    const result = await response.json();
    return result;
};