import { verifyResponse } from "utils/services";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async() => {
    const response = await fetch(`${baseUrl}/product`);
    console.log('Fetching from:', `${baseUrl}/product`);
    const data = await verifyResponse(response);
    console.log('Fetched data:', data);
    return data;
}

export const getOneProductById = async(id) => {
    const response = await fetch(`${baseUrl}/product/${id}`);
    console.log('Fetching from:', `${baseUrl}/product/${id}`);
    const data = await verifyResponse(response);
    console.log('Fetched data:', data);
    return data;
}