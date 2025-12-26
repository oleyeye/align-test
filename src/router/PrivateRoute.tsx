import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../app/authContext";

export const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading authentication status…</div>;
  }

  // If logged in, render child routes; otherwise redirect to /login
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
