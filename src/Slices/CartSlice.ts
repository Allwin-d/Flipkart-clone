import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../Types/ApiResponse";

const initialState: Product[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add a product to the cart
    addToCart: (state, action: PayloadAction<Product>) => {
      // Directly mutate the state array using push (Immer handles immutability)
      state.push(action.payload);
    },

    // Remove a product from the cart by its ID
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1); // remove the item at that index
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
