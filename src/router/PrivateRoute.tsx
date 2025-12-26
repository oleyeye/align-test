import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../app/authContext";

export const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If logged in, render child routes; otherwise redirect to /login
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
