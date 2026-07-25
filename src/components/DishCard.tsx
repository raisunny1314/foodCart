import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { MenuItem } from '../types';
import { addItem, removeItem } from '../store/cartSlice';
import { CustomizationModal } from './CustomizationModal';
import { Star, Plus, Minus } from 'lucide-react';

interface Props {
  restaurantId: string;
  restaurantName: string;
  item: MenuItem;
}

export const DishCard: React.FC<Props> = ({ restaurantId, restaurantName, item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Find total quantity of this dish in cart
  const matchingCartItems = cartItems.filter((i) => i.item.id === item.id);
  const currentQuantity = matchingCartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddClick = () => {
    if (item.isCustomizable && item.optionGroups && item.optionGroups.length > 0) {
      setIsCustomizeOpen(true);
    } else {
      dispatch(
        addItem({
          restaurantId,
          restaurantName,
          item,
        })
      );
    }
  };

  const handleRemoveClick = () => {
    if (matchingCartItems.length > 0) {
      // remove from last matching cart item
      const lastCartItem = matchingCartItems[matchingCartItems.length - 1];
      dispatch(removeItem(lastCartItem.cartItemId));
    }
  };

  return (
    <div className="py-5 border-b border-gray-100 last:border-0 flex items-start justify-between gap-4">
      {/* Left Details */}
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center space-x-2">
          {/* Veg / Non-Veg Indicator */}
          <div
            className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 ${
              item.type === 'veg' ? 'border-green-600' : 'border-red-600'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
              }`}
            />
          </div>

          {/* Bestseller Badge */}
          {item.isBestseller && (
            <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center space-x-1">
              <Star className="w-2.5 h-2.5 fill-amber-800" />
              <span>Bestseller</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-gray-900 line-clamp-1">{item.name}</h4>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-black text-gray-900">₹{item.price}</span>
          {item.originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center space-x-1 text-xs text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{item.rating}</span>
            {item.ratingCount && (
              <span className="text-gray-400 font-normal">({item.ratingCount})</span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed pt-1">
          {item.description}
        </p>

        {item.isCustomizable && (
          <span className="text-[11px] font-bold text-gray-400 block pt-0.5">Customizable</span>
        )}
      </div>

      {/* Right Image & Swiggy ADD Button */}
      <div className="relative shrink-0 w-28 sm:w-36 flex flex-col items-center">
        {item.imageUrl ? (
          <div className="w-28 h-24 sm:w-36 sm:h-28 rounded-2xl overflow-hidden bg-gray-100 shadow-xs border border-gray-100">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-28 h-24 sm:w-36 sm:h-28 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 flex items-center justify-center text-orange-400 font-bold text-xs">
            {item.name}
          </div>
        )}

        {/* ADD Button Overlay */}
        <div className="absolute -bottom-2 z-10 shadow-lg shadow-orange-500/10">
          {currentQuantity === 0 ? (
            <button
              onClick={handleAddClick}
              className="px-6 py-1.5 bg-white border border-gray-200 text-green-700 font-black text-sm rounded-xl hover:bg-green-50 shadow-md active:scale-95 transition-all uppercase tracking-wide"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center space-x-3 px-3 py-1 bg-white border border-green-600 text-green-700 font-black text-sm rounded-xl shadow-md">
              <button
                onClick={handleRemoveClick}
                className="hover:text-green-900 transition-colors"
              >
                <Minus className="w-4 h-4 stroke-[3]" />
              </button>
              <span className="text-sm font-extrabold px-1">{currentQuantity}</span>
              <button onClick={handleAddClick} className="hover:text-green-900 transition-colors">
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customization Popup if applicable */}
      {isCustomizeOpen && (
        <CustomizationModal
          restaurantId={restaurantId}
          restaurantName={restaurantName}
          item={item}
          onClose={() => setIsCustomizeOpen(false)}
        />
      )}
    </div>
  );
};
