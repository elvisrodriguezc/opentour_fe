import axios from "axios";
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

const fetchManifest = async () => {
    try {
        const response = await fetch('/manifest.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch manifest.json: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading manifest.json:', error);
        return null;
    }
};

const urlFromManifest = async () => {
    const manifest = await fetchManifest();
    return manifest?.url || null;
};

const apiUrlFromManifest = async () => {
    const manifest = await fetchManifest();
    return manifest?.api_url || null;
};

const loadAPIData = async (data) => {
    const token = getToken()

    const contentType = data.multipart ? "multipart/form-data" : "application/json";

    const configData = {
        url: `${apiUrlFromManifest}/api${data.type}`,
        headers: {
            'Access-Control-Allow-Origin': urlFromManifest,
            'Authorization': token ? `Bearer ${token}` : '',
            'Accept': 'application/json',
            'Content-Type': contentType,
        },
        method: data.method,
        params: data.params,
        data: data.data
    };

    return (await axios(configData)).data
};

export { loadAPIData };
