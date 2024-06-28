import {useAuthStore} from "../../store/auth"; // No usada al no tener métodos que necesiten especificamente autorización como para extraer la cabecera
import { verifyResponse, getAuthHeader } from "../../utils/services";
const baseUrl = import.meta.env.VITE_API_URL;


/**
 * Obtiene todas las paletas disponibles desde la API.
 * @returns {Promise<Array>} Un array de objetos que representan las paletas obtenidas.
 * @throws {Error} Si hay un error al obtener los datos desde la API.
 */
export const getPaletas = async () => {
    const response = await fetch(`${baseUrl}/racket`);
    const data = await verifyResponse(response);
    if (data.status) {
      return data.requestResponse;
    } else {
      throw new Error(data.messageDetails || 'Error fetching data');
    }
  };

  /**
 * Obtiene una sola paleta desde la API basado en su ID. Se usa en la página "Product" para develar sus detalles.
 * @param {number} id - El ID de la paleta que se desea obtener.
 * @returns {Promise<Object>} Un objeto que representa la paleta obtenida.
 * @throws {Error} Si hay un error al obtener los datos de la paleta desde la API.
 */
export const getOnePaleta = async(id)=>{
    const response = await fetch(`${baseUrl}/racket/${id}`);
    const data = await verifyResponse(response);
    if(data.status){
        return data.requestResponse;
    }else{
        throw new Error(data.messageDetails || 'Error fetching single data');
    }
};

/**
 * Realiza la autenticación del usuario enviando las credenciales a la API.
 * @param {Object} credenciales - Las credenciales del usuario (nombre de usuario y contraseña).
 * @returns {Promise<Object>} Un objeto con el resultado de la solicitud de autenticación (token o error de la api).
 * @throws {Error} Si hay un error durante el proceso de autenticación.
 */
export const userLogin = async(credenciales)=>{
    const response = await fetch(`${baseUrl}/auth`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credenciales)
    });
    const result = await response.json();
    if (response.ok) {
        const timestamp = new Date().getTime();
        localStorage.setItem('loginTime', timestamp);
    }
    return result;
}

/**
 * Crea un nuevo usuario enviando los datos a la API. Se usa en el register
 * @param {Object} data - Los datos del nuevo usuario a ser creados (nombre, nombre de usuario, correo electrónico y contraseña).
 * @returns {Promise<Object>} Un objeto con el resultado de la creación del usuario.
 * @throws {Error} Si hay un error durante el proceso de creación del usuario.
 */
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