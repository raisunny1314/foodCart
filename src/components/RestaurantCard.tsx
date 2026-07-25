import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Restaurant } from '../types';
import { fetchRestaurantById } from '../store/restaurantSlice';
import { toggleFavorite } from '../store/userSlice';
import { Star, Clock, Heart } from 'lucide-react';

interface Props {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const isFavorite = favorites.includes(restaurant.id);

  const handleClick = () => {
    dispatch(fetchRestaurantById(restaurant.id) as any);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(restaurant.id));
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100/90 flex flex-col hover:-translate-y-1 relative"
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
        <img
          src={restaurant.imageId}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-xs text-white hover:bg-black/60 transition-colors z-10"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Pure Veg Badge */}
        {restaurant.isPureVeg && (
          <div className="absolute top-3 left-3 bg-green-600 text-white font-black text-[10px] px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
            Pure Veg
          </div>
        )}

        {/* Offer Discount Banner */}
        {restaurant.aggregatedDiscountInfoV3 && (
          <div className="absolute bottom-2 left-3 text-white font-black tracking-wider text-base drop-shadow-md">
            <span>{restaurant.aggregatedDiscountInfoV3.header} </span>
            <span className="text-orange-300">{restaurant.aggregatedDiscountInfoV3.subHeader}</span>
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-orange-600 transition-colors truncate">
            {restaurant.name}
          </h3>

          <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 mt-1">
            <div className="flex items-center space-x-1 bg-green-700 text-white px-2 py-0.5 rounded-md text-xs">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>{restaurant.avgRating}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1 text-gray-700">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{restaurant.deliveryTimeString}</span>
            </div>
            <span>•</span>
            <span className="text-gray-600">{restaurant.costForTwoString}</span>
          </div>

          <p className="text-xs text-gray-500 font-medium truncate mt-2">
            {restaurant.cuisines.join(', ')}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="truncate font-medium">{restaurant.locality}, {restaurant.areaName}</span>
          <span className="font-semibold text-orange-600 shrink-0 ml-2">{restaurant.distanceKm} km</span>
        </div>
      </div>
    </div>
  );
};
