let appConfig = {};

export const loadConfig = async () => {
    try {
        const response = await fetch('/config.json'); // Relativo a la raíz pública
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        appConfig = await response.json();
        console.log('Configuración cargada:', appConfig);
    } catch (error) {
        console.error("¡Error crítico! No se pudo cargar la configuración:", error);
        // Aquí podrías mostrar un mensaje de error fatal al usuario
        // o usar valores por defecto si tiene sentido.
        appConfig = { /* valores por defecto o vacíos */ };
    }
};

export const getConfig = () => appConfig;