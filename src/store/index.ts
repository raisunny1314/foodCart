import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import restaurantReducer from './restaurantSlice';
import groceryReducer from './grocerySlice';
import dineoutReducer from './dineoutSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer,
    grocery: groceryReducer,
    dineout: dineoutReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
