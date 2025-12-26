import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProductById } from "./productSlice";

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.product.selectedProduct);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(Number(id)));
  }, [id]);

  return (
    <div className="container">
      <h1>id: {state?.id}</h1>
      <h1>id: {state?.name}</h1>
      <h1>id: {state?.price}</h1>
    </div>
  );
}
