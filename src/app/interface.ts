export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

export interface Product extends Pick<ProductDetail, "id" | "name" | "price"> {}
