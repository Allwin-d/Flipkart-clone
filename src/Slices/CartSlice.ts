import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // Logic for adding to cart goes here
      console.log(state, action);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
