import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  setSelectedGroceryCategory,
  setGrocerySearchQuery,
  addGroceryToCart,
  removeGroceryFromCart,
  fetchGroceryItems,
  setInstamartCheckoutOpen,
} from '../store/grocerySlice';
import { Store, Search, Plus, Minus, Zap, CheckCircle2, ShoppingBag } from 'lucide-react';

export const InstamartSection: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, products, selectedCategory, groceryCart, searchQuery } = useSelector(
    (state: RootState) => state.grocery
  );

  const handleCategorySelect = (catId: string) => {
    dispatch(setSelectedGroceryCategory(catId));
    dispatch(fetchGroceryItems() as any);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGrocerySearchQuery(e.target.value));
    dispatch(fetchGroceryItems() as any);
  };

  const totalGroceryCount = groceryCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalGroceryPrice = groceryCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-purple-50/30 pb-28 animate-fadeIn">
      {/* Instamart Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white py-8 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-purple-800/80 px-3 py-1 rounded-full border border-purple-600/50 text-xs font-bold text-purple-200">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>SUPERFAST 10 MINUTE DELIVERY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Swiggy <span className="text-purple-400">Instamart</span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-md">
              Fresh vegetables, dairy, munchies, beverages & daily essentials delivered instantly.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search 5,000+ grocery items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-2xl text-sm font-semibold shadow-xl focus:outline-hidden focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Category Pills Slider */}
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-purple-100 border border-gray-200'
            }`}
          >
            All Groceries
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-purple-100 border border-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => {
            const cartEntry = groceryCart.find((i) => i.product.id === product.id);
            const quantity = cartEntry ? cartEntry.quantity : 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-3.5 border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 mb-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Discount Tag */}
                    {product.discountPercentage && (
                      <span className="absolute top-2 left-2 bg-purple-700 text-white font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Quantity Info */}
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    {product.quantityInfo}
                  </span>

                  {/* Product Title */}
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 mt-0.5 group-hover:text-purple-700 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Price & Add Button */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-sm font-black text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-gray-400 line-through block -mt-1">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* ADD / Counter */}
                  {quantity === 0 ? (
                    <button
                      onClick={() => dispatch(addGroceryToCart(product))}
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs rounded-xl border border-purple-200 transition-all uppercase"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 px-2 py-1 bg-purple-700 text-white rounded-xl shadow-md font-bold text-xs">
                      <button
                        onClick={() => dispatch(removeGroceryFromCart(product.id))}
                        className="hover:text-purple-200"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => dispatch(addGroceryToCart(product))}
                        className="hover:text-purple-200"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Instamart Cart Banner */}
      {totalGroceryCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4 animate-slideUp">
          <div className="bg-purple-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between border border-purple-700">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-purple-700 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-purple-200" />
              </div>
              <div>
                <span className="text-xs text-purple-200 font-bold block">Instamart Basket</span>
                <span className="text-base font-black">
                  {totalGroceryCount} Items • ₹{totalGroceryPrice}
                </span>
              </div>
            </div>

            <button
              onClick={() => dispatch(setInstamartCheckoutOpen(true))}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs rounded-xl transition-all shadow-md uppercase tracking-wider active:scale-95"
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
