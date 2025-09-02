import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../Types/types";

const initialState: Product[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {

    },
    removeFromCart: (state, action) => {

    },
    clearCart: (state, action) => {
        
    },
  },
});

export const { addtoCart, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
