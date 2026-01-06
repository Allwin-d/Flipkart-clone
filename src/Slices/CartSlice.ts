import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";

const initialState: Product[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = CartSlice.actions; //we are exporting this because based on these we will dispatch the actions

export default CartSlice.reducer; //here we are exporting this so that we can enable this in the store
