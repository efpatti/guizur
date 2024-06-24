import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const SharedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default SharedRoutes;
