import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: () => {

    },
    removeFromCart: () => {

    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
