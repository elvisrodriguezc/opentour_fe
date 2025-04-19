import axios from "axios";
import { getConfig } from "../config";
const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
        console.error("Token not found");
        return null;
    }

    let token;
    try {
        token = JSON.parse(tokenString);
    } catch (error) {
        console.error("Invalid token format", error);
        console.log("Token Deleted");
        localStorage.removeItem('token')
        return null;
    }

    // Aquí puedes agregar más validaciones según el formato de tu token
    if (!token || typeof token !== 'string' || token.length < 10) { // Ejemplo de validación básica
        console.error("Token is invalid");
        localStorage.removeItem('token')
        console.log("Token Deleted");
        return null;
    }

    return token;
};



const loadAPIData = async (data) => {
    const config = getConfig()
    const token = getToken()
    const contentType = data.multipart ? "multipart/form-data" : "application/json";
    const apiUrl = config.apiUrl;
    const url = config.url;

    const configData = {
        url: `${apiUrl}/api${data.type}`,
        headers: {
            'Access-Control-Allow-Origin': url,
            'Authorization': token ? `Bearer ${token}` : '',
            'Accept': 'application/json',
            'Content-Type': contentType,
        },
        method: data.method,
        params: data.params,
        data: data.data
    };
    console.log('Sending Data:', configData)
    return (await axios(configData)).data
};

export { loadAPIData };
