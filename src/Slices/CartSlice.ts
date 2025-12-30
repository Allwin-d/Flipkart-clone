import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";

const initialState: Product[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const exist = state.some((item) => item.id === action.payload.id);
      if (!exist) {
        state.push(action.payload);
      }
    },

    removeFromCart: () => {},
  },
});

export const { addToCart, removeFromCart } = CartSlice.actions; //we are exporting this because based on these we will dispatch the actions

export default CartSlice.reducer; //here we are exporting this so that we can enable this in the store
