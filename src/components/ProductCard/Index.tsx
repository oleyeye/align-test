import { useNavigate } from "react-router";
import "./style.css";
import type { Product } from "../../app/interface";

interface ProductCardProps {
  product: Product;
  className?: string;
  detailLink: string;
}

export default function ProductCard({
  product,
  className,
  detailLink,
}: ProductCardProps) {
  const formattedPrice = product.price.toFixed(2);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(detailLink);
  };

  return (
    <div
      className={`cardContainer ${className || ""}`}
      onClick={() => handleClick()}
    >
      <div className="productId">ID: {product.id}</div>
      <h3 className="productName">{product.name}</h3>
      <div className="productPrice">{formattedPrice}</div>
    </div>
  );
}
