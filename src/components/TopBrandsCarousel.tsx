import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchRestaurantById } from '../store/restaurantSlice';
import { Star, Clock } from 'lucide-react';

export const TopBrandsCarousel: React.FC = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state: RootState) => state.restaurant);
  const currentLocation = useSelector((state: RootState) => state.user.currentLocation);

  const topBrands = restaurants.slice(0, 5);

  return (
    <section className="py-6 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Top restaurant chains in {currentLocation.city}
          </h2>
          <p className="text-xs text-gray-500">Most loved dining partners delivered to your doorstep</p>
        </div>

        {/* Scrollable horizontal cards */}
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
          {topBrands.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => dispatch(fetchRestaurantById(restaurant.id) as any)}
              className="group shrink-0 w-64 sm:w-72 bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                <img
                  src={restaurant.imageId}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Offer Tag */}
                {restaurant.aggregatedDiscountInfoV3 && (
                  <div className="absolute bottom-2 left-3 text-white font-black tracking-wider text-sm drop-shadow-md">
                    <span>{restaurant.aggregatedDiscountInfoV3.header} </span>
                    <span className="text-orange-300">{restaurant.aggregatedDiscountInfoV3.subHeader}</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3.5 space-y-1">
                <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-600 transition-colors truncate">
                  {restaurant.name}
                </h3>

                <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                  <div className="flex items-center space-x-1 bg-green-700 text-white px-1.5 py-0.5 rounded-md text-[11px]">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{restaurant.avgRating}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{restaurant.deliveryTimeString}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 truncate mt-1">
                  {restaurant.cuisines.join(', ')}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  {restaurant.locality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
