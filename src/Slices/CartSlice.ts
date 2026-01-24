import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (action.payload) {
        return [...state, action.payload];
      }
      console.log(state, action);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
