import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationState, UserAddress } from '../types';
import { CITIES_LOCATIONS, INITIAL_USER_ADDRESSES } from '../data/mockData';

interface UserState {
  activeTab: 'food' | 'instamart' | 'dineout' | 'search';
  currentLocation: LocationState;
  userAddresses: UserAddress[];
  favorites: string[]; // array of restaurant IDs
  isLocationModalOpen: boolean;
  isCartOpen: boolean;
  isOffersModalOpen: boolean;
  isFavoritesModalOpen: boolean;
}

const initialState: UserState = {
  activeTab: 'food',
  currentLocation: {
    city: CITIES_LOCATIONS[0].city,
    area: CITIES_LOCATIONS[0].area,
    fullAddress: CITIES_LOCATIONS[0].fullAddress,
    lat: CITIES_LOCATIONS[0].lat,
    lng: CITIES_LOCATIONS[0].lng,
  },
  userAddresses: INITIAL_USER_ADDRESSES,
  favorites: ['rest_1', 'rest_3'],
  isLocationModalOpen: false,
  isCartOpen: false,
  isOffersModalOpen: false,
  isFavoritesModalOpen: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<UserState['activeTab']>) => {
      state.activeTab = action.payload;
    },
    setCurrentLocation: (state, action: PayloadAction<LocationState>) => {
      state.currentLocation = action.payload;
      state.isLocationModalOpen = false;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const restId = action.payload;
      const index = state.favorites.indexOf(restId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(restId);
      }
    },
    addUserAddress: (state, action: PayloadAction<UserAddress>) => {
      state.userAddresses.unshift(action.payload);
    },
    setLocationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLocationModalOpen = action.payload;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    setOffersModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOffersModalOpen = action.payload;
    },
    setFavoritesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isFavoritesModalOpen = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setCurrentLocation,
  toggleFavorite,
  addUserAddress,
  setLocationModalOpen,
  setCartOpen,
  setOffersModalOpen,
  setFavoritesModalOpen,
} = userSlice.actions;

export default userSlice.reducer;
