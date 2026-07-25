import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFavoritesModalOpen } from '../store/userSlice';
import { fetchRestaurantById } from '../store/restaurantSlice';
import { addItem } from '../store/cartSlice';
import { X, Heart, Clock, MapPin, User, ShoppingBag, ArrowRight } from 'lucide-react';

export const FavoritesOrdersModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isFavoritesModalOpen, favorites, userAddresses } = useSelector(
    (state: RootState) => state.user
  );
  const restaurants = useSelector((state: RootState) => state.restaurant.restaurants);
  const orderHistory = useSelector((state: RootState) => state.order.orderHistory);

  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses'>('orders');

  if (!isFavoritesModalOpen) return null;

  const favoriteRestaurants = restaurants.filter((r) => favorites.includes(r.id));

  const handleReorder = (order: (typeof orderHistory)[0]) => {
    order.items.forEach((cartItem) => {
      dispatch(
        addItem({
          restaurantId: order.restaurantId,
          restaurantName: order.restaurantName,
          item: cartItem.item,
          selectedOptions: cartItem.selectedOptions,
        })
      );
    });
    dispatch(setFavoritesModalOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold text-lg">
              👤
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Account & Activity</h2>
              <p className="text-xs text-gray-500">Manage orders, saved places & addresses</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(setFavoritesModalOpen(false))}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-100 px-5 pt-3 space-x-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-black transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Past Orders ({orderHistory.length})
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-3 text-xs font-black transition-colors border-b-2 ${
              activeTab === 'favorites'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Favorite Places ({favoriteRestaurants.length})
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 text-xs font-black transition-colors border-b-2 ${
              activeTab === 'addresses'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Saved Addresses ({userAddresses.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Past Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orderHistory.length === 0 ? (
                <div className="text-center py-10 text-gray-400 font-bold text-xs">
                  No past orders yet. Place your first delicious order!
                </div>
              ) : (
                orderHistory.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-3xl border border-gray-100 shadow-xs space-y-3 bg-white"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-sm">
                          {order.restaurantName}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-semibold block">
                          Order #{order.orderId} • {order.placedAt.slice(0, 10)}
                        </span>
                      </div>
                      <span className="text-xs font-black text-orange-600">
                        ₹{order.grandTotal}
                      </span>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1">
                      {order.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {i.quantity}x {i.item.name}
                          </span>
                          <span className="font-bold">₹{i.totalPrice}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                      <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-md uppercase">
                        {order.status}
                      </span>

                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs uppercase tracking-wider"
                      >
                        Reorder All
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-3">
              {favoriteRestaurants.length === 0 ? (
                <div className="text-center py-10 text-gray-400 font-bold text-xs">
                  No saved favorite restaurants yet. Tap the heart icon on any restaurant to save it!
                </div>
              ) : (
                favoriteRestaurants.map((rest) => (
                  <div
                    key={rest.id}
                    onClick={() => {
                      dispatch(fetchRestaurantById(rest.id) as any);
                      dispatch(setFavoritesModalOpen(false));
                    }}
                    className="p-3.5 rounded-2xl border border-gray-100 hover:border-orange-300 bg-white flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={rest.imageId}
                        alt={rest.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{rest.name}</h4>
                        <p className="text-xs text-gray-500">{rest.cuisines.join(', ')}</p>
                        <p className="text-[11px] text-gray-400">{rest.locality}</p>
                      </div>
                    </div>

                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </div>
                ))
              )}
            </div>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-3">
              {userAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-900 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      <span>{addr.label}</span>
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-md">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-gray-800 pt-1">{addr.flatNo}</p>
                  <p className="text-xs text-gray-500">{addr.addressLine}</p>
                  <p className="text-[11px] text-gray-400">{addr.city} - {addr.pincode}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
