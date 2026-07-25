import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  updateQuantity,
  removeItem,
  applyCoupon,
  removeCoupon,
  setDeliveryTip,
  setSelectedAddress,
} from '../store/cartSlice';
import { setCartOpen } from '../store/userSlice';
import { createOrder } from '../store/orderSlice';
import { COUPONS } from '../data/mockData';
import {
  X,
  Plus,
  Minus,
  MapPin,
  Tag,
  Check,
  Percent,
  Receipt,
  Sparkles,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state: RootState) => state.user.isCartOpen);
  const { items, appliedCoupon, deliveryTip, deliveryFee, selectedAddress } = useSelector(
    (state: RootState) => state.cart
  );
  const userAddresses = useSelector((state: RootState) => state.user.userAddresses);

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI / GPay / PhonePe');

  if (!isCartOpen) return null;

  const restaurantName = items[0]?.restaurantName || 'Restaurant';

  // Item Total
  const itemTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  // Calculate Discount
  let discountAmount = 0;
  if (appliedCoupon && itemTotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((itemTotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, appliedCoupon.maxDiscount);
      }
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  const taxesAndCharges = Math.round((itemTotal - discountAmount) * 0.05) + 15; // 5% GST + packaging
  const grandTotal = Math.max(0, itemTotal - discountAmount + deliveryFee + taxesAndCharges + deliveryTip);

  const handleApplyCouponCode = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    const foundCoupon = COUPONS.find((c) => c.code === code);

    if (!foundCoupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    if (itemTotal < foundCoupon.minOrderValue) {
      setCouponError(`Minimum order value ₹${foundCoupon.minOrderValue} required`);
      return;
    }

    setCouponError('');
    dispatch(applyCoupon(foundCoupon));
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      alert('Please select or add a delivery address');
      return;
    }

    dispatch(
      createOrder({
        cartItems: items,
        deliveryAddress: selectedAddress,
        paymentMethod,
        grandTotal,
      }) as any
    );

    dispatch(setCartOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-600 text-white rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">Your Cart</h2>
                {items.length > 0 && (
                  <p className="text-xs text-gray-500 font-medium">From {restaurantName}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => dispatch(setCartOpen(false))}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items or Empty State */}
          {items.length === 0 ? (
            <div className="p-8 text-center my-auto space-y-4">
              <div className="w-20 h-20 bg-orange-50 text-orange-400 rounded-full mx-auto flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Your cart is empty</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Good food is always cooking! Go back to restaurants and add your favorite dishes.
              </p>
              <button
                onClick={() => dispatch(setCartOpen(false))}
                className="px-6 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-2xl shadow-md uppercase tracking-wider"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Delivery Address Section */}
              <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>Delivery Address</span>
                  </span>
                  <span className="text-[10px] bg-orange-200/60 text-orange-800 font-bold px-2 py-0.5 rounded-md">
                    {selectedAddress?.type || 'HOME'}
                  </span>
                </div>

                <p className="text-xs font-extrabold text-gray-900">
                  {selectedAddress?.flatNo}, {selectedAddress?.addressLine}
                </p>
                <p className="text-[11px] text-gray-500">{selectedAddress?.landmark}</p>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                  Ordered Items ({items.length})
                </h3>

                <div className="divide-y divide-gray-100">
                  {items.map((cartItem) => (
                    <div key={cartItem.cartItemId} className="py-3 flex items-center justify-between">
                      <div className="flex-1 pr-3">
                        <div className="flex items-center space-x-1.5">
                          <div
                            className={`w-3.5 h-3.5 rounded-xs border-2 flex items-center justify-center shrink-0 ${
                              cartItem.item.type === 'veg' ? 'border-green-600' : 'border-red-600'
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                cartItem.item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'
                              }`}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-900 line-clamp-1">
                            {cartItem.item.name}
                          </span>
                        </div>

                        {/* Selected Options */}
                        {cartItem.selectedOptions && cartItem.selectedOptions.length > 0 && (
                          <div className="text-[10px] text-gray-500 pl-5 mt-0.5">
                            {cartItem.selectedOptions.map((o) => o.optionName).join(', ')}
                          </div>
                        )}

                        <span className="text-xs font-bold text-gray-600 pl-5 block mt-0.5">
                          ₹{cartItem.totalPrice}
                        </span>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-2 px-2 py-1 border border-green-600 bg-white rounded-xl text-green-700 font-bold text-xs shadow-2xs">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                cartItemId: cartItem.cartItemId,
                                quantity: cartItem.quantity - 1,
                              })
                            )
                          }
                          className="hover:text-green-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-1 text-xs">{cartItem.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                cartItemId: cartItem.cartItemId,
                                quantity: cartItem.quantity + 1,
                              })
                            )
                          }
                          className="hover:text-green-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupons & Promo Box */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 flex items-center space-x-1">
                    <Tag className="w-4 h-4 text-orange-600" />
                    <span>Apply Coupon Code</span>
                  </span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-green-50 border border-green-300 rounded-xl text-xs font-bold text-green-800">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span>{appliedCoupon.code} APPLIED!</span>
                    </div>
                    <button
                      onClick={() => dispatch(removeCoupon())}
                      className="text-red-600 hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="e.g. SWIGGY50"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase focus:outline-hidden focus:border-orange-500"
                      />
                      <button
                        onClick={() => handleApplyCouponCode()}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs uppercase"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && <p className="text-[11px] font-bold text-red-600">{couponError}</p>}

                    {/* Quick Coupons Bar */}
                    <div className="flex space-x-2 overflow-x-auto pt-1 scrollbar-none">
                      {COUPONS.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => handleApplyCouponCode(c.code)}
                          className="px-2.5 py-1 bg-white border border-gray-200 hover:border-orange-400 rounded-lg text-[10px] font-extrabold text-orange-600 shrink-0"
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Tip Options */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block">
                  Say Thanks to Delivery Partner (Tip)
                </span>
                <div className="flex items-center space-x-2">
                  {[0, 20, 30, 50].map((tip) => (
                    <button
                      key={tip}
                      onClick={() => dispatch(setDeliveryTip(tip))}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        deliveryTip === tip
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {tip === 0 ? 'No Tip' : `₹${tip}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detailed Bill Breakdown */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Item Total</span>
                  <span className="font-bold text-gray-900">₹{itemTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Discount Coupon ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">₹{deliveryFee}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Govt Taxes & Packaging</span>
                  <span className="font-bold text-gray-900">₹{taxesAndCharges}</span>
                </div>

                {deliveryTip > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Partner Tip</span>
                    <span className="font-bold text-gray-900">₹{deliveryTip}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
                  <span>To Pay</span>
                  <span className="text-orange-600 text-base">₹{grandTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    PAYMENT METHOD
                  </span>
                  <span className="text-xs font-bold text-gray-800">{paymentMethod}</span>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-gray-900">₹{grandTotal}</span>
                  {discountAmount > 0 && (
                    <span className="text-[10px] text-green-600 font-bold block">
                      Saved ₹{discountAmount}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
              >
                <span>PROCEED TO PAY</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
