import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../Types/ApiResponse";
import type { PayloadAction } from "@reduxjs/toolkit";
import handleLocalStorage from "../utils/utilityFunctions";

const getLocalStorageProducts = (): CartItem[] => {
  const data = localStorage.getItem("localStorageProducts");
  return data ? JSON.parse(data) : [];
};

const initialState: CartItem[] = getLocalStorageProducts();
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
          quantity: action.payload.quantity ?? 1,
        });
      }

      //handleLocalStorage is a utility function
      handleLocalStorage({
        value: state,
        method: "SET",
      });
    },

    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const exist = state.find((item) => item.id === action.payload.id);

      if (!exist) return;

      let updatedCart = state;

      if (exist.quantity > 1) {
        exist.quantity -= 1;
      } else {
        updatedCart = state.filter((item) => item.id !== action.payload.id);
      }
      handleLocalStorage({
        value: updatedCart,
        method: "SET",
      });
      return updatedCart;
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      handleLocalStorage({
        value: updatedCart,
        method: "SET",
      });
      return updatedCart;
    },
    clearAll: () => {
      handleLocalStorage({
        method: "REMOVE",
      });
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearAll, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
