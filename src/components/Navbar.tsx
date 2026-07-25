import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  setActiveTab,
  setLocationModalOpen,
  setCartOpen,
  setOffersModalOpen,
  setFavoritesModalOpen,
} from '../store/userSlice';
import { setInstamartCheckoutOpen } from '../store/grocerySlice';
import {
  MapPin,
  Search,
  Percent,
  ShoppingBag,
  User,
  UtensilsCrossed,
  Store,
  CalendarCheck,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { activeTab, currentLocation } = useSelector((state: RootState) => state.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const groceryCart = useSelector((state: RootState) => state.grocery.groceryCart);
  const activeOrder = useSelector((state: RootState) => state.order.activeOrder);

  const totalFoodCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalFoodAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const totalGroceryCount = groceryCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalGroceryAmount = groceryCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const showGroceryCart = activeTab === 'instamart' || (totalFoodCount === 0 && totalGroceryCount > 0);
  const totalCartCount = showGroceryCart ? totalGroceryCount : totalFoodCount;
  const totalCartAmount = showGroceryCart ? totalGroceryAmount : totalFoodAmount;

  const handleCartClick = () => {
    if (showGroceryCart) {
      dispatch(setInstamartCheckoutOpen(true));
    } else {
      dispatch(setCartOpen(true));
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Section: Logo & Location */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          {/* Logo */}
          <button
            onClick={() => dispatch(setActiveTab('food'))}
            className="flex items-center space-x-2 group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
                food<span className="text-orange-600">Cart</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-orange-500 uppercase -mt-1">
                Swiggy Edition
              </span>
            </div>
          </button>

          {/* Location Selector */}
          <button
            onClick={() => dispatch(setLocationModalOpen(true))}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl hover:bg-orange-50/80 transition-colors group border border-transparent hover:border-orange-200 text-left"
          >
            <MapPin className="w-5 h-5 text-orange-600 shrink-0 group-hover:animate-bounce" />
            <div className="flex flex-col max-w-[180px] lg:max-w-[240px] truncate">
              <span className="text-xs font-bold text-gray-900 flex items-center space-x-1">
                <span className="truncate">{currentLocation.area || currentLocation.city}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-orange-600" />
              </span>
              <span className="text-[11px] text-gray-500 truncate">{currentLocation.fullAddress}</span>
            </div>
          </button>
        </div>

        {/* Center Section: Main Service Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/60">
          <button
            onClick={() => dispatch(setActiveTab('food'))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'food'
                ? 'bg-white text-orange-600 shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Restaurants</span>
          </button>

          <button
            onClick={() => dispatch(setActiveTab('instamart'))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'instamart'
                ? 'bg-white text-purple-700 shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Store className="w-4 h-4 text-purple-600" />
            <span>Instamart Grocery</span>
            <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-md font-bold uppercase">
              10m
            </span>
          </button>

          <button
            onClick={() => dispatch(setActiveTab('dineout'))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'dineout'
                ? 'bg-white text-pink-600 shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-pink-500" />
            <span>DineOut</span>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-md font-bold">
              UPTO 50% OFF
            </span>
          </button>
        </nav>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Button */}
          <button
            onClick={() => dispatch(setActiveTab('search'))}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-orange-50 text-orange-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Search className="w-5 h-5 text-gray-500" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Offers Button */}
          <button
            onClick={() => dispatch(setOffersModalOpen(true))}
            className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Percent className="w-5 h-5 text-orange-500" />
            <span>Offers</span>
          </button>

          {/* Profile & History */}
          <button
            onClick={() => dispatch(setFavoritesModalOpen(true))}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
            <span className="hidden sm:inline">Account</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={handleCartClick}
            className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-white font-bold text-sm shadow-md active:scale-95 transition-all ${
              showGroceryCart
                ? 'bg-purple-700 hover:bg-purple-800 shadow-purple-600/20'
                : 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/20'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden xs:inline">{showGroceryCart ? 'Instamart' : 'Cart'}</span>
            {totalCartCount > 0 ? (
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-black ml-1 ${
                  showGroceryCart ? 'bg-amber-400 text-purple-950' : 'bg-white text-orange-600'
                }`}
              >
                {totalCartCount}
              </span>
            ) : null}
            {totalCartAmount > 0 && (
              <span
                className={`hidden md:inline pl-1 text-xs font-extrabold border-l ${
                  showGroceryCart ? 'border-purple-500' : 'border-orange-400'
                }`}
              >
                ₹{totalCartAmount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-gray-100 px-4 py-2 space-x-2 scrollbar-none">
        <button
          onClick={() => dispatch(setActiveTab('food'))}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 ${
            activeTab === 'food' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>Food Delivery</span>
        </button>

        <button
          onClick={() => dispatch(setActiveTab('instamart'))}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 ${
            activeTab === 'instamart' ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-700'
          }`}
        >
          <Store className="w-3.5 h-3.5" />
          <span>Instamart Grocery</span>
        </button>

        <button
          onClick={() => dispatch(setActiveTab('dineout'))}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 ${
            activeTab === 'dineout' ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-700'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>DineOut</span>
        </button>
      </div>
    </header>
  );
};
