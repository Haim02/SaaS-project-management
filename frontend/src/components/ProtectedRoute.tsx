import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = () => {
  let isAuthenticated = false;
  let isLoading = false;
  if (isLoading) return <Spinner />;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
