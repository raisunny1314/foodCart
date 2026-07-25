import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

interface OrderState {
  activeOrder: Order | null;
  orderHistory: Order[];
  isTrackingModalOpen: boolean;
  loading: boolean;
}

const initialState: OrderState = {
  activeOrder: null,
  orderHistory: [],
  isTrackingModalOpen: false,
  loading: false,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderPayload: { cartItems: any[]; deliveryAddress: any; paymentMethod: string; grandTotal: number }) => {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });
    if (!response.ok) throw new Error('Order creation failed');
    const data = await response.json();
    return data.order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setActiveOrder: (state, action: PayloadAction<Order | null>) => {
      state.activeOrder = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<Order['status']>) => {
      if (state.activeOrder) {
        state.activeOrder.status = action.payload;
      }
    },
    setTrackingModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isTrackingModalOpen = action.payload;
    },
    clearActiveOrder: (state) => {
      state.activeOrder = null;
      state.isTrackingModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.activeOrder = action.payload;
        state.orderHistory.unshift(action.payload);
        state.isTrackingModalOpen = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setActiveOrder, updateOrderStatus, setTrackingModalOpen, clearActiveOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
