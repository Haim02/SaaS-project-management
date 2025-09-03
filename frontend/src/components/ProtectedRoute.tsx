import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";

const ProtectedRoute = () => {
    const {isAuthenticated, isLoading} = useAuth()

    if (isLoading) return <Spinner />

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute
