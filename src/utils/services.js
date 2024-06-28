import {useAuthStore} from "../store/auth";

/**
 * Función asíncrona para verificar la respuesta de una solicitud HTTP.
 * Lanza un error si la respuesta no es exitosa (response.ok es false).
 * 
 * @param {Response} response - Objeto de respuesta de la solicitud HTTP.
 * @returns {Promise<any>} Objeto resultante de parsear el cuerpo JSON de la respuesta.
 * @throws {Error} Si la respuesta no es exitosa, lanza un error con el mensaje de estado.
 */
export const verifyResponse = async(response)=>{
    if(!response.ok){
        throw new Error(response.statusText);
    }
    const result = await response.json();
    return result;
};

/**
 * Función para obtener el encabezado de autorización Bearer con el token de autenticación. Este método se encuentra actualmente deshabilitado.
 * Utiliza el estado global de autenticación para obtener el token.
 * 
 * @returns {string} Encabezado de autorización Bearer con el token.
 */
export const getAuthHeader = ()=>{
    const {token} =useAuthStore.getState();
    return `Bearer ${token}`;
}

/**
 * Función para determinar si un nombre de usuario o correo electrónico es un email.
 * 
 * @param {string} usernameOrEmail - Nombre de usuario o correo electrónico a verificar.
 * @returns {string} Retorna "email" si usernameOrEmail parece ser un correo electrónico, o "username" de lo contrario.
 */
export const checkIfIsEmailOrUsername = (usernameOrEmail) => {
    const isEmail = usernameOrEmail.includes("@");
    return isEmail ? "email" : "username";
  };