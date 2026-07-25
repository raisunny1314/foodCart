import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '../types';
import { MOCK_RESTAURANTS, FOOD_MIND_CATEGORIES } from '../data/mockData';

interface RestaurantState {
  restaurants: Restaurant[];
  mindCategories: typeof FOOD_MIND_CATEGORIES;
  selectedCategory: string;
  selectedRestaurant: Restaurant | null;
  searchQuery: string;
  isPureVegFilter: boolean;
  fastDeliveryFilter: boolean;
  rating4PlusFilter: boolean;
  sortBy: 'relevance' | 'delivery_time' | 'rating' | 'cost_low_high' | 'cost_high_low';
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurants: MOCK_RESTAURANTS,
  mindCategories: FOOD_MIND_CATEGORIES,
  selectedCategory: 'all',
  selectedRestaurant: null,
  searchQuery: '',
  isPureVegFilter: false,
  fastDeliveryFilter: false,
  rating4PlusFilter: false,
  sortBy: 'relevance',
  loading: false,
  error: null,
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { getState }) => {
    const state = getState() as { restaurant: RestaurantState };
    const { searchQuery, selectedCategory, isPureVegFilter, fastDeliveryFilter, rating4PlusFilter, sortBy } =
      state.restaurant;

    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (isPureVegFilter) params.append('isPureVeg', 'true');
    if (fastDeliveryFilter) params.append('fastDelivery', 'true');
    if (rating4PlusFilter) params.append('rating4Plus', 'true');
    if (sortBy) params.append('sortBy', sortBy);

    const response = await fetch(`/api/restaurants?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const data = await response.json();
    return data.data;
  }
);

export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchRestaurantById',
  async (id: string) => {
    const response = await fetch(`/api/restaurants/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant details');
    }
    const data = await response.json();
    return data.restaurant;
  }
);

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    togglePureVegFilter: (state) => {
      state.isPureVegFilter = !state.isPureVegFilter;
    },
    toggleFastDeliveryFilter: (state) => {
      state.fastDeliveryFilter = !state.fastDeliveryFilter;
    },
    toggleRating4PlusFilter: (state) => {
      state.rating4PlusFilter = !state.rating4PlusFilter;
    },
    setSortBy: (state, action: PayloadAction<RestaurantState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSelectedRestaurant: (state, action: PayloadAction<Restaurant | null>) => {
      state.selectedRestaurant = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.isPureVegFilter = false;
      state.fastDeliveryFilter = false;
      state.rating4PlusFilter = false;
      state.sortBy = 'relevance';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.restaurants) {
          state.restaurants = action.payload.restaurants;
        }
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching restaurants';
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.selectedRestaurant = action.payload;
      });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  togglePureVegFilter,
  toggleFastDeliveryFilter,
  toggleRating4PlusFilter,
  setSortBy,
  setSelectedRestaurant,
  resetFilters,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
