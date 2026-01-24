import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Slices/CartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Represents the type of the entire Redux state tree
export type AppDispatch = typeof store.dispatch; // Represents the type of the dispatch function for sending actions

export default store;
