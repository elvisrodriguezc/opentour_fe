import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    let isAllowed = localStorage.getItem('token') ? true : false;
    let redirectPath = "/login"
    if (!isAllowed) {
        return <Navigate replace to={redirectPath} />
    }
    return children ? children : <Outlet />;
}

export default ProtectedRoute;