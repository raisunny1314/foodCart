import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedRestaurant } from '../store/restaurantSlice';
import { DishCard } from './DishCard';
import {
  ArrowLeft,
  Star,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Percent,
  MapPin,
  Leaf,
  Info,
} from 'lucide-react';

export const RestaurantDetail: React.FC = () => {
  const dispatch = useDispatch();
  const selectedRestaurant = useSelector((state: RootState) => state.restaurant.selectedRestaurant);

  const [menuSearch, setMenuSearch] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  if (!selectedRestaurant) return null;

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 animate-fadeIn">
      {/* Top Sticky Header */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => dispatch(setSelectedRestaurant(null))}
            className="flex items-center space-x-2 text-sm font-bold text-gray-700 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Restaurants</span>
          </button>

          <span className="text-xs font-semibold text-gray-400 truncate max-w-[200px]">
            {selectedRestaurant.name}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Restaurant Info Header Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {selectedRestaurant.name}
              </h1>
              <p className="text-xs font-medium text-gray-500 mt-1">
                {selectedRestaurant.cuisines.join(', ')}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {selectedRestaurant.locality}, {selectedRestaurant.areaName} ({selectedRestaurant.distanceKm} km away)
              </p>
            </div>

            {/* Rating Box */}
            <div className="self-start sm:self-center p-3 rounded-2xl bg-gray-50 border border-gray-200 flex sm:flex-col items-center justify-between sm:justify-center text-center gap-2">
              <div className="flex items-center space-x-1 text-green-700 font-black text-sm">
                <Star className="w-4 h-4 fill-green-700" />
                <span>{selectedRestaurant.avgRating}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold border-t sm:border-t border-gray-200 pt-1 sm:pt-0">
                {selectedRestaurant.totalRatingsString}
              </span>
            </div>
          </div>

          {/* Timing & Cost Banner */}
          <div className="flex items-center space-x-6 text-xs font-bold text-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>{selectedRestaurant.deliveryTimeString}</span>
            </div>
            <span>•</span>
            <div>
              <span>{selectedRestaurant.costForTwoString}</span>
            </div>
          </div>

          {/* Offers Carousel */}
          {selectedRestaurant.aggregatedDiscountInfoV3 && (
            <div className="pt-2 flex space-x-3 overflow-x-auto scrollbar-none">
              <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 shrink-0">
                <Percent className="w-5 h-5 text-orange-600" />
                <div>
                  <span className="text-xs font-black text-orange-800 block">
                    {selectedRestaurant.aggregatedDiscountInfoV3.header}{' '}
                    {selectedRestaurant.aggregatedDiscountInfoV3.subHeader}
                  </span>
                  <span className="text-[10px] text-orange-600 font-medium">
                    {selectedRestaurant.aggregatedDiscountInfoV3.discountTag || 'USE SWIGGY50'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Menu Search & Veg Toggle Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search in menu..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-gray-700 flex items-center space-x-1">
              <Leaf className="w-3.5 h-3.5 text-green-600" />
              <span>Veg Only</span>
            </span>
            <button
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                isVegOnly ? 'bg-green-600 justify-end' : 'bg-gray-200 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </div>

        {/* Menu Categories Accordion */}
        <div className="space-y-4">
          {selectedRestaurant.menu?.map((category) => {
            let items = category.items;

            if (isVegOnly) {
              items = items.filter((i) => i.type === 'veg');
            }

            if (menuSearch.trim() !== '') {
              const q = menuSearch.toLowerCase().trim();
              items = items.filter(
                (i) =>
                  i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
              );
            }

            if (items.length === 0) return null;

            const isCollapsed = collapsedCategories[category.id];

            return (
              <div
                key={category.id}
                className="bg-white rounded-3xl p-5 shadow-xs border border-gray-100/90"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between pb-3 border-b border-gray-100 font-black text-gray-900 text-lg text-left"
                >
                  <span>
                    {category.title} ({items.length})
                  </span>
                  {isCollapsed ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Items List */}
                {!isCollapsed && (
                  <div className="divide-y divide-gray-100 pt-2">
                    {items.map((item) => (
                      <DishCard
                        key={item.id}
                        restaurantId={selectedRestaurant.id}
                        restaurantName={selectedRestaurant.name}
                        item={item}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
