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

export const { addToCart, removeFromCart } = cartSlice.actions; // Exporting the action creators so components can dispatch these actions
export default cartSlice.reducer;                                // Exporting the reducer to include it in the store

