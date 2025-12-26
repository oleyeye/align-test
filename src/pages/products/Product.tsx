import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllProducts } from "./productSlice";
import ProductCard from "../../components/ProductCard/Index";

export default function Product() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="container">
      {state.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          detailLink={`${product.id}`}
        />
      ))}
    </div>
  );
}
