import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../Types/types";

const initialState: CartItem[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action:PayloadAction<CartItem>) => {
      console.log("Action payload", action.payload);
      const existingItem = state.find((item) => {
        return item.id === action.payload.id;
      });
      if (existingItem) {
        existingItem.Quantity += 1;
      } else {
        const newItem = { ...action.payload, Quantity: 1 };
        state.push(newItem);
      }
    },

    removeFromCart: (state, action:PayloadAction<CartItem>) => {
      return state.filter((item) => {
        return item.id !== action.payload.id;
      });
    },

    clearCart: () => {
      return [];
    },

    IncreaseQuantity: (state, action:PayloadAction<CartItem>) => {
      console.log(action.payload);
      const existingItem = state.find((item) => {
        return item.id === action.payload.id;
      });
      if (existingItem) {
        existingItem.Quantity += 1;
      }
      return state;
    },
    DecreaseQuantity: (state, action:PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.Quantity > 1) {
          existingItem.Quantity -= 1;
        } else {
          // remove item completely
          return state.filter((item) => item.id !== action.payload.id);
        }
      }
      return state;
    },
  },
});

export const {
  addtoCart,
  removeFromCart,
  clearCart,
  IncreaseQuantity,
  DecreaseQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
