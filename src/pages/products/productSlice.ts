import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { ProductDetail, Product } from "../../app/interface";
import { get } from "../../utils/request";

interface ProductState {
  products: Product[];
  selectedProduct?: ProductDetail;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: undefined,
};

export const getAllProducts = createAsyncThunk<Product[]>(
  "products/getAllProducts",
  async () => {
    return await get("api/products");
  }
);

export const getProductById = createAsyncThunk<ProductDetail, number>(
  "products/getProductById",
  async (id: number) => {
    return await get(`api/products/${id}`);
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.products = [];
      })
      .addCase(getAllProducts.pending, (state) => {
        state.products = [];
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const {} = productsSlice.actions;
export const selectCount = (state: RootState) => state.product.products.length;

export default productsSlice.reducer;
