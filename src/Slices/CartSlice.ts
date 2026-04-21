import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../Types/ApiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const prod = state.find((item) => item.id === action.payload.id);
      if (prod) {
        prod.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: action.payload.quantity ?? 1, //this is a null coalescing operator , if the left hand side is null or undefined it goes up with the right hand side value
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    clearAll: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearAll } = cartSlice.actions;
export default cartSlice.reducer;
