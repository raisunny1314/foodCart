import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRestaurantById } from '../store/restaurantSlice';
import { DishCard } from './DishCard';
import { RestaurantCard } from './RestaurantCard';
import { Search, Utensils, Store, Sparkles, X } from 'lucide-react';

export const SearchView: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ restaurants: any[]; dishes: any[] }>({
    restaurants: [],
    dishes: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults({ restaurants: [], dishes: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        if (data.success) {
          setResults({ restaurants: data.restaurants, dishes: data.dishes });
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 animate-fadeIn">
      {/* Search Bar Container */}
      <div className="bg-white border-b border-gray-100 py-6 px-4 shadow-xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-2xl font-black text-gray-900">Search for Food & Restaurants</h1>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search for 'Biryani', 'Pizza', 'Burger', 'Meghana Foods'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Suggestions */}
          {!searchTerm && (
            <div className="flex items-center space-x-2 overflow-x-auto pt-2 scrollbar-none">
              <span className="text-xs font-bold text-gray-400 shrink-0">Popular Searches:</span>
              {['Biryani', 'Cheese Pizza', 'Chicken Burger', 'Dosa', 'Butter Chicken', 'Lassi'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-xl text-xs font-bold text-gray-700 transition-colors shrink-0"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {loading && (
          <div className="text-center py-12 text-gray-400 font-bold text-sm">
            Searching for delicious food...
          </div>
        )}

        {!loading && searchTerm && results.dishes.length === 0 && results.restaurants.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No results found for &quot;{searchTerm}&quot;</h3>
            <p className="text-xs text-gray-500">Try searching for Biryani, Pizza, Burger, or Meghana Foods</p>
          </div>
        )}

        {/* Matched Dishes */}
        {!loading && results.dishes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-gray-900 flex items-center space-x-2">
              <Utensils className="w-5 h-5 text-orange-600" />
              <span>Matched Dishes ({results.dishes.length})</span>
            </h2>

            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 divide-y divide-gray-100">
              {results.dishes.map((d, idx) => (
                <div key={idx} className="pt-2 first:pt-0">
                  <div
                    onClick={() => dispatch(fetchRestaurantById(d.restaurant.id) as any)}
                    className="text-xs font-bold text-orange-600 hover:underline cursor-pointer mb-1 block"
                  >
                    From {d.restaurant.name} ({d.restaurant.deliveryTimeString}) ★ {d.restaurant.avgRating}
                  </div>
                  <DishCard
                    restaurantId={d.restaurant.id}
                    restaurantName={d.restaurant.name}
                    item={d.item}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Restaurants */}
        {!loading && results.restaurants.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-gray-900 flex items-center space-x-2">
              <Store className="w-5 h-5 text-orange-600" />
              <span>Matched Restaurants ({results.restaurants.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {results.restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
