import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  togglePureVegFilter,
  toggleFastDeliveryFilter,
  toggleRating4PlusFilter,
  setSortBy,
  setSearchQuery,
  resetFilters,
  fetchRestaurants,
} from '../store/restaurantSlice';
import { SlidersHorizontal, Sparkles, Clock, Star, Leaf, Search } from 'lucide-react';

export const RestaurantFilters: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isPureVegFilter,
    fastDeliveryFilter,
    rating4PlusFilter,
    sortBy,
    searchQuery,
  } = useSelector((state: RootState) => state.restaurant);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(fetchRestaurants() as any);
  };

  const activeFiltersCount =
    (isPureVegFilter ? 1 : 0) +
    (fastDeliveryFilter ? 1 : 0) +
    (rating4PlusFilter ? 1 : 0) +
    (sortBy !== 'relevance' ? 1 : 0);

  return (
    <div className="py-4 bg-white sticky top-20 z-30 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Title & Active Filter count */}
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Restaurants with online food delivery
            </h2>
            {activeFiltersCount > 0 && (
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {activeFiltersCount} Active
              </span>
            )}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search dishes or restaurants..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {/* Reset button if active */}
          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                dispatch(resetFilters());
                dispatch(fetchRestaurants() as any);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors shrink-0"
            >
              Reset ✕
            </button>
          )}

          {/* Pure Veg Filter */}
          <button
            onClick={() => {
              dispatch(togglePureVegFilter());
              dispatch(fetchRestaurants() as any);
            }}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
              isPureVegFilter
                ? 'bg-green-50 border-green-600 text-green-700 shadow-xs'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${isPureVegFilter ? 'text-green-600 fill-green-600' : 'text-green-500'}`} />
            <span>Pure Veg</span>
          </button>

          {/* Fast Delivery */}
          <button
            onClick={() => {
              dispatch(toggleFastDeliveryFilter());
              dispatch(fetchRestaurants() as any);
            }}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
              fastDeliveryFilter
                ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-xs'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>Fast Delivery (&lt;25 mins)</span>
          </button>

          {/* Ratings 4.0+ */}
          <button
            onClick={() => {
              dispatch(toggleRating4PlusFilter());
              dispatch(fetchRestaurants() as any);
            }}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
              rating4PlusFilter
                ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-xs'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Ratings 4.0+</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => {
                dispatch(setSortBy(e.target.value as any));
                dispatch(fetchRestaurants() as any);
              }}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-3.5 py-1.5 pr-8 text-xs font-bold text-gray-700 focus:outline-hidden focus:border-orange-500 cursor-pointer"
            >
              <option value="relevance">Sort By: Relevance</option>
              <option value="delivery_time">Delivery Time</option>
              <option value="rating">Rating: High to Low</option>
              <option value="cost_low_high">Cost: Low to High</option>
              <option value="cost_high_low">Cost: High to Low</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
