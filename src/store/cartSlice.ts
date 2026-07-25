import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Coupon, MenuItem, UserAddress } from '../types';
import { INITIAL_USER_ADDRESSES } from '../data/mockData';

interface CartState {
  items: CartItem[];
  appliedCoupon: Coupon | null;
  deliveryTip: number;
  deliveryFee: number;
  selectedAddress: UserAddress | null;
}

const initialState: CartState = {
  items: [],
  appliedCoupon: null,
  deliveryTip: 20,
  deliveryFee: 35,
  selectedAddress: INITIAL_USER_ADDRESSES[0] || null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        restaurantId: string;
        restaurantName: string;
        item: MenuItem;
        selectedOptions?: { groupName: string; optionName: string; price: number }[];
      }>
    ) => {
      const { restaurantId, restaurantName, item, selectedOptions } = action.payload;

      // If adding item from a different restaurant, clear cart or check
      if (state.items.length > 0 && state.items[0].restaurantId !== restaurantId) {
        state.items = [];
        state.appliedCoupon = null;
      }

      const optionsPrice = (selectedOptions || []).reduce((sum, opt) => sum + opt.price, 0);
      const unitPrice = item.price + optionsPrice;
      const optionsKey = (selectedOptions || []).map((o) => `${o.groupName}:${o.optionName}`).sort().join('|');
      const cartItemId = `${item.id}_${optionsKey}`;

      const existingIndex = state.items.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
        state.items[existingIndex].totalPrice = state.items[existingIndex].quantity * unitPrice;
      } else {
        state.items.push({
          cartItemId,
          restaurantId,
          restaurantName,
          item,
          quantity: 1,
          selectedOptions,
          totalPrice: unitPrice,
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      const index = state.items.findIndex((i) => i.cartItemId === cartItemId);
      if (index >= 0) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
          const optionsPrice = (state.items[index].selectedOptions || []).reduce((sum, opt) => sum + opt.price, 0);
          const unitPrice = state.items[index].item.price + optionsPrice;
          state.items[index].totalPrice = state.items[index].quantity * unitPrice;
        } else {
          state.items.splice(index, 1);
        }
      }

      if (state.items.length === 0) {
        state.appliedCoupon = null;
      }
    },
    updateQuantity: (state, action: PayloadAction<{ cartItemId: string; quantity: number }>) => {
      const { cartItemId, quantity } = action.payload;
      const index = state.items.findIndex((i) => i.cartItemId === cartItemId);
      if (index >= 0) {
        if (quantity <= 0) {
          state.items.splice(index, 1);
        } else {
          state.items[index].quantity = quantity;
          const optionsPrice = (state.items[index].selectedOptions || []).reduce((sum, opt) => sum + opt.price, 0);
          const unitPrice = state.items[index].item.price + optionsPrice;
          state.items[index].totalPrice = quantity * unitPrice;
        }
      }

      if (state.items.length === 0) {
        state.appliedCoupon = null;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
    },
    applyCoupon: (state, action: PayloadAction<Coupon>) => {
      state.appliedCoupon = action.payload;
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
    },
    setDeliveryTip: (state, action: PayloadAction<number>) => {
      state.deliveryTip = action.payload;
    },
    setSelectedAddress: (state, action: PayloadAction<UserAddress>) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  setDeliveryTip,
  setSelectedAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
