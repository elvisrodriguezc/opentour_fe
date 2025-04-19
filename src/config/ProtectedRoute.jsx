import { Navigate, Outlet } from "react-router-dom";

/**
 * Componente para proteger rutas.
 * Verifica si existe un token en localStorage o sessionStorage.
 * Si no existe, redirige a la ruta especificada (por defecto /login).
 * Si existe, renderiza las rutas anidadas a través de <Outlet /> o los children explícitos si se pasan.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children] - Componentes hijos explícitos a renderizar si está permitido. Si no se proveen, se usa <Outlet />.
 * @param {string} [props.redirectPath="/login"] - La ruta a la que redirigir si el usuario no está permitido.
 */
const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
    // 1. Obtener el token de forma más directa.
    //    getItem devuelve null si no existe, || se encarga de pasar al siguiente.
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    // 2. Convertir a booleano de forma concisa.
    //    Si token es una cadena (truthy), isAllowed será true.
    //    Si token es null (falsy), isAllowed será false.
    const isAllowed = !!token; // o puedes usar Boolean(token)

    // 3. Condición de redirección clara.
    if (!isAllowed) {
        // `replace` es importante para no añadir la ruta de login al historial
        // si el usuario intenta acceder a una ruta protegida sin estar logueado.
        return <Navigate to={redirectPath} replace />;
    }

    // 4. Renderizado del contenido protegido.
    //    Prioriza children si se pasan explícitamente, sino usa Outlet
    //    para renderizar las rutas anidadas definidas en tu configuración de rutas.
    //    En la mayoría de los casos de layout/rutas protegidas, solo necesitarás <Outlet />.
    return children ? children : <Outlet />;
};

export default ProtectedRoute;