import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Slices/CartSlice";


const store = configureStore({
    reducer:{
        cart:CartSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>; //this is the type for the current rootstate 
export type AppDispatch = typeof store.dispatch; //this is the type for the dispatch Action 


export default store;
