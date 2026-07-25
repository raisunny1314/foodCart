import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedCategory, fetchRestaurants } from '../store/restaurantSlice';

export const FoodCategories: React.FC = () => {
  const dispatch = useDispatch();
  const { mindCategories, selectedCategory } = useSelector((state: RootState) => state.restaurant);

  const handleCategoryClick = (catId: string) => {
    const newCategory = selectedCategory === catId ? 'all' : catId;
    dispatch(setSelectedCategory(newCategory));
    dispatch(fetchRestaurants() as any);
  };

  return (
    <section className="py-6 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              What&apos;s on your mind?
            </h2>
            <p className="text-xs text-gray-500">Explore top cravings and culinary delights</p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => handleCategoryClick('all')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-xl transition-colors"
            >
              Clear Filter ✕
            </button>
          )}
        </div>

        {/* Scrollable horizontal list */}
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
          {mindCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group flex flex-col items-center shrink-0 w-24 sm:w-28 text-center transition-transform hover:scale-105 focus:outline-hidden"
              >
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 transition-all ${
                    isSelected
                      ? 'ring-4 ring-orange-500 shadow-lg shadow-orange-500/20 scale-105'
                      : 'ring-1 ring-gray-200 group-hover:ring-orange-300 shadow-xs'
                  }`}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`mt-2 text-xs font-bold transition-colors line-clamp-1 ${
                    isSelected ? 'text-orange-600 font-extrabold' : 'text-gray-800 group-hover:text-orange-600'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
