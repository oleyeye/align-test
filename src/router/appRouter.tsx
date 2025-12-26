import { Route, Routes } from "react-router";
import Product from "../features/products/Product";
import ProductDetail from "../features/products/ProductDetail";
import { PrivateRoute } from "./PrivateRoute";
import Login from "../features/login/Login";
import AppLayout from "./AppLayout";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Login />} />
        <Route path="products" element={<PrivateRoute />}>
          <Route index element={<Product />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
