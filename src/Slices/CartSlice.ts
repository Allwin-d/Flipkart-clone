import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../Types/types";

const initialState: CartItem[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      console.log(action.payload);
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
      state.filter((item) => {
        item.id !== action.payload.id;
      });
    },

    clearCart: () => {
      return [];
    },
    
    IncreaseQuantity :(state,action)=>{
       
    },
    DecreaseQuantity:(state,action)=>{

    }


  },
});

export const { addtoCart, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
