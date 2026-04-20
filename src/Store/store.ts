import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slices/CartSlice";

// 1. Create store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// 2. Infer RootState type
export type RootState = ReturnType<typeof store.getState>;

// 3. Infer AppDispatch type
export type AppDispatch = typeof store.dispatch;
