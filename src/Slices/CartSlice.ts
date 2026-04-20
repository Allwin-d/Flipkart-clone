import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const exists = state.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearAll: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearAll } = cartSlice.actions;
export default cartSlice.reducer;
