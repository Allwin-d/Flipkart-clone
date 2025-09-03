import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../Types/types";

const initialState: CartItem[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
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

    removeFromCart: (state, action) => {
      return state.filter((item) => {
        return item.id !== action.payload.id;
      });
    },

    clearCart: () => {
      return [];
    },

    IncreaseQuantity: (state, action) => {
      console.log(action.payload);
      const existingItem = state.find((item) => {
        return item.id === action.payload.id;
      });
      if (existingItem) {
        existingItem.Quantity += 1;
      }
    },
    DecreaseQuantity: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.Quantity > 1) {
          existingItem.Quantity -= 1;
        } else {
          // remove item completely
          return state.filter((item) => item.id !== action.payload.id);
        }
      }
      return state; // always return state when using conditional returns
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
