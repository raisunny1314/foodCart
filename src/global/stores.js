import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlicer";


export const store = configureStore({
    reducer: {
        cartSlice: cartReducer,
    }
})