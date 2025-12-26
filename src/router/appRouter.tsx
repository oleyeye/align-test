import { Route, Routes } from "react-router";
import Home from "../features/home/Home";
import Product from "../features/products/Product";
import ProductDetail from "../features/products/ProductDetail";

export default function AppRouter() {
    return <Routes>
        <Route index element={<Home />} />
        <Route path="products">
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />} />
        </Route>
    </Routes>
}