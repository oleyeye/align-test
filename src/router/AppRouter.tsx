import { Navigate, Route, Routes } from "react-router";
import Product from "../pages/products/Product";
import ProductDetail from "../pages/products/ProductDetail";
import { PrivateRoute } from "./PrivateRoute";
import Login from "../pages/login/Login";
import AppLayout from "./AppLayout";
import Landing from "../pages/landing/Landing";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* <Route index element={<Navigate to="/products" replace />} /> */}
        <Route index element={<Login />} />
        <Route path="login" element={<Navigate to="/" replace />} />
        <Route path="landing" element={<Landing />} />
        <Route path="products" element={<PrivateRoute />}>
          <Route index element={<Product />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
