import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GroceryCategory, GroceryProduct } from '../types';
import { INSTAMART_CATEGORIES, INSTAMART_PRODUCTS } from '../data/mockData';

interface GroceryCartItem {
  product: GroceryProduct;
  quantity: number;
}

interface GroceryState {
  categories: GroceryCategory[];
  products: GroceryProduct[];
  selectedCategory: string;
  groceryCart: GroceryCartItem[];
  searchQuery: string;
  loading: boolean;
  isInstamartCheckoutOpen: boolean;
}

const initialState: GroceryState = {
  categories: INSTAMART_CATEGORIES,
  products: INSTAMART_PRODUCTS,
  selectedCategory: 'all',
  groceryCart: [],
  searchQuery: '',
  loading: false,
  isInstamartCheckoutOpen: false,
};

export const fetchGroceryItems = createAsyncThunk(
  'grocery/fetchItems',
  async (_, { getState }) => {
    const state = getState() as { grocery: GroceryState };
    const { selectedCategory, searchQuery } = state.grocery;

    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
    if (searchQuery) params.append('search', searchQuery);

    const response = await fetch(`/api/instamart?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch instamart products');
    const data = await response.json();
    return data;
  }
);

export const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    setSelectedGroceryCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setGrocerySearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addGroceryToCart: (state, action: PayloadAction<GroceryProduct>) => {
      const product = action.payload;
      const index = state.groceryCart.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        state.groceryCart[index].quantity += 1;
      } else {
        state.groceryCart.push({ product, quantity: 1 });
      }
    },
    removeGroceryFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.groceryCart.findIndex((item) => item.product.id === productId);
      if (index >= 0) {
        if (state.groceryCart[index].quantity > 1) {
          state.groceryCart[index].quantity -= 1;
        } else {
          state.groceryCart.splice(index, 1);
        }
      }
    },
    clearGroceryCart: (state) => {
      state.groceryCart = [];
      state.isInstamartCheckoutOpen = false;
    },
    setInstamartCheckoutOpen: (state, action: PayloadAction<boolean>) => {
      state.isInstamartCheckoutOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroceryItems.fulfilled, (state, action) => {
      if (action.payload?.products) {
        state.products = action.payload.products;
      }
    });
  },
});

export const {
  setSelectedGroceryCategory,
  setGrocerySearchQuery,
  addGroceryToCart,
  removeGroceryFromCart,
  clearGroceryCart,
  setInstamartCheckoutOpen,
} = grocerySlice.actions;

export default grocerySlice.reducer;
