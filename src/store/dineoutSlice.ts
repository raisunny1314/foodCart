import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DineoutRestaurant, TableBooking } from '../types';
import { DINEOUT_RESTAURANTS } from '../data/mockData';

interface DineoutState {
  places: DineoutRestaurant[];
  bookings: TableBooking[];
  selectedPlace: DineoutRestaurant | null;
  loading: boolean;
}

const initialState: DineoutState = {
  places: DINEOUT_RESTAURANTS,
  bookings: [],
  selectedPlace: null,
  loading: false,
};

export const fetchDineoutPlaces = createAsyncThunk('dineout/fetchPlaces', async () => {
  const response = await fetch('/api/dineout');
  if (!response.ok) throw new Error('Failed to fetch dineout places');
  const data = await response.json();
  return data.dineoutPlaces;
});

export const dineoutSlice = createSlice({
  name: 'dineout',
  initialState,
  reducers: {
    setSelectedPlace: (state, action: PayloadAction<DineoutRestaurant | null>) => {
      state.selectedPlace = action.payload;
    },
    addBooking: (state, action: PayloadAction<TableBooking>) => {
      state.bookings.unshift(action.payload);
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const index = state.bookings.findIndex((b) => b.bookingId === action.payload);
      if (index >= 0) {
        state.bookings[index].status = 'CANCELLED';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDineoutPlaces.fulfilled, (state, action) => {
      if (action.payload) {
        state.places = action.payload;
      }
    });
  },
});

export const { setSelectedPlace, addBooking, cancelBooking } = dineoutSlice.actions;

export default dineoutSlice.reducer;
