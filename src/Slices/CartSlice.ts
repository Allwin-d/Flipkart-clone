import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const prod = state.find((item) => item.id === action.payload.id);
      if (!prod) {
        return [...state, { ...action.payload }];
      } else {
        return [...state, { ...action.payload, quantity: +1 }];
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
