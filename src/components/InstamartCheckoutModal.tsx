import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addGroceryToCart,
  removeGroceryFromCart,
  clearGroceryCart,
  setInstamartCheckoutOpen,
} from '../store/grocerySlice';
import { createOrder } from '../store/orderSlice';
import { COUPONS } from '../data/mockData';
import {
  X,
  Plus,
  Minus,
  MapPin,
  Tag,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Zap,
  CheckCircle2,
  Receipt,
  Store,
  CreditCard,
  Wallet,
} from 'lucide-react';

export const InstamartCheckoutModal: React.FC = () => {
  const dispatch = useDispatch();
  const { groceryCart, isInstamartCheckoutOpen } = useSelector((state: RootState) => state.grocery);
  const userAddresses = useSelector((state: RootState) => state.user.userAddresses);
  const selectedAddress = useSelector((state: RootState) => state.cart.selectedAddress) || userAddresses[0];

  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [deliveryTip, setDeliveryTip] = useState(15);
  const [paymentMethod, setPaymentMethod] = useState('UPI / GPay / PhonePe');

  if (!isInstamartCheckoutOpen) return null;

  const totalGroceryCount = groceryCart.reduce((sum, item) => sum + item.quantity, 0);
  const itemTotal = groceryCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Calculate Discounts
  let discountAmount = 0;
  if (appliedCouponCode) {
    const coupon = COUPONS.find((c) => c.code === appliedCouponCode) || {
      code: appliedCouponCode,
      discountValue: 100,
      minOrderValue: 200,
      discountType: 'flat',
    };

    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((itemTotal * (coupon.discountValue || 50)) / 100);
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    } else {
      discountAmount = coupon.discountValue || 100;
    }
  }

  const deliveryFee = itemTotal >= 299 ? 0 : 15;
  const handlingFee = 10;
  const grandTotal = Math.max(0, itemTotal - discountAmount + deliveryFee + handlingFee + deliveryTip);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) return;

    if (code === 'INSTA100' || code === 'INSTA50' || code === 'SWIGGY50' || code === 'WELCOME50') {
      if (itemTotal < 150) {
        setCouponError('Minimum order value of ₹150 required for this coupon');
        return;
      }
      setCouponError('');
      setAppliedCouponCode(code);
    } else {
      setCouponError('Invalid coupon code for Instamart');
    }
  };

  const handlePlaceOrder = () => {
    if (groceryCart.length === 0) return;
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    const cartItemsPayload = groceryCart.map((cartItem) => ({
      cartItemId: cartItem.product.id,
      restaurantId: 'instamart',
      restaurantName: 'Swiggy Instamart (10-Min Store)',
      item: {
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: cartItem.product.price,
        description: cartItem.product.quantityInfo,
        imageId: cartItem.product.imageUrl,
        type: 'veg',
        category: cartItem.product.category,
        isBestseller: true,
      },
      quantity: cartItem.quantity,
      totalPrice: cartItem.product.price * cartItem.quantity,
    }));

    dispatch(
      createOrder({
        cartItems: cartItemsPayload,
        deliveryAddress: selectedAddress,
        paymentMethod,
        grandTotal,
      }) as any
    );

    dispatch(clearGroceryCart());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-purple-700/80 rounded-2xl border border-purple-500/30">
                <Store className="w-6 h-6 text-purple-200" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h2 className="text-lg font-black">Instamart Basket</h2>
                  <span className="bg-amber-400 text-purple-950 font-black text-[10px] px-2 py-0.5 rounded-md flex items-center space-x-0.5">
                    <Zap className="w-3 h-3 fill-purple-950" />
                    <span>10 MIN</span>
                  </span>
                </div>
                <p className="text-xs text-purple-200">{totalGroceryCount} Grocery Items added</p>
              </div>
            </div>

            <button
              onClick={() => dispatch(setInstamartCheckoutOpen(false))}
              className="p-2 text-purple-200 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content or Empty State */}
          {groceryCart.length === 0 ? (
            <div className="p-8 text-center my-auto space-y-4">
              <div className="w-20 h-20 bg-purple-50 text-purple-500 rounded-full mx-auto flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Your Instamart Basket is empty</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Explore fresh fruits, vegetables, dairy, snacks & beverages delivered in 10 minutes!
              </p>
              <button
                onClick={() => dispatch(setInstamartCheckoutOpen(false))}
                className="px-6 py-2.5 bg-purple-700 text-white text-xs font-bold rounded-2xl shadow-md uppercase tracking-wider hover:bg-purple-800"
              >
                Explore Instamart
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Delivery Address Section */}
              <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-700" />
                    <span>Deliver to Location</span>
                  </span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded-md">
                    {selectedAddress?.type || 'HOME'}
                  </span>
                </div>

                <p className="text-xs font-extrabold text-gray-900">
                  {selectedAddress?.flatNo}, {selectedAddress?.addressLine}
                </p>
                <p className="text-[11px] text-gray-500">{selectedAddress?.landmark || selectedAddress?.city}</p>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                  Basket Items ({totalGroceryCount})
                </h3>

                <div className="divide-y divide-gray-100">
                  {groceryCart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 pr-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl border border-gray-100 shrink-0"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{product.name}</h4>
                          <p className="text-[10px] text-gray-400">{product.quantityInfo}</p>
                          <span className="text-xs font-black text-gray-800 block mt-0.5">
                            ₹{product.price * quantity}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-2 px-2 py-1 bg-purple-50 border border-purple-200 rounded-xl text-purple-800 font-bold text-xs shadow-2xs">
                        <button
                          onClick={() => dispatch(removeGroceryFromCart(product.id))}
                          className="hover:text-purple-950"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-1 text-xs">{quantity}</span>
                        <button
                          onClick={() => dispatch(addGroceryToCart(product))}
                          className="hover:text-purple-950"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupons Section */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <span className="text-xs font-bold text-gray-800 flex items-center space-x-1">
                  <Tag className="w-4 h-4 text-purple-700" />
                  <span>Instamart Coupons & Offers</span>
                </span>

                {appliedCouponCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-purple-50 border border-purple-300 rounded-xl text-xs font-bold text-purple-900">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>{appliedCouponCode} APPLIED!</span>
                    </div>
                    <button
                      onClick={() => setAppliedCouponCode(null)}
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
                        placeholder="e.g. INSTA100"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase focus:outline-hidden focus:border-purple-500"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs uppercase"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && <p className="text-[11px] font-bold text-red-600">{couponError}</p>}

                    {/* Quick Instamart Coupon Pills */}
                    <div className="flex space-x-2 overflow-x-auto pt-1 scrollbar-none">
                      {['INSTA100', 'INSTA50', 'SWIGGY50'].map((code) => (
                        <button
                          key={code}
                          onClick={() => handleApplyCoupon(code)}
                          className="px-2.5 py-1 bg-white border border-purple-200 hover:border-purple-500 rounded-lg text-[10px] font-extrabold text-purple-700 shrink-0"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Tip */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block">
                  Tip Instamart Express Delivery Partner
                </span>
                <div className="flex items-center space-x-2">
                  {[0, 15, 25, 40].map((tip) => (
                    <button
                      key={tip}
                      onClick={() => setDeliveryTip(tip)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        deliveryTip === tip
                          ? 'bg-purple-700 text-white border-purple-700'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {tip === 0 ? 'No Tip' : `₹${tip}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Grocery Items Subtotal</span>
                  <span className="font-bold text-gray-900">₹{itemTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Instamart Offer Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>10-Min Superfast Delivery</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-green-700 uppercase' : 'text-gray-900'}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Store Handling & Bag Fee</span>
                  <span className="font-bold text-gray-900">₹{handlingFee}</span>
                </div>

                {deliveryTip > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Executive Tip</span>
                    <span className="font-bold text-gray-900">₹{deliveryTip}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
                  <span>To Pay</span>
                  <span className="text-purple-700 text-base">₹{grandTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Checkout Trigger */}
          {groceryCart.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-white space-y-3">
              {/* Payment Selector */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    PAYMENT MODE
                  </span>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-xs font-bold text-gray-800 bg-transparent focus:outline-hidden"
                  >
                    <option value="UPI / GPay / PhonePe">UPI / GPay / PhonePe</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Pay on Delivery (COD)">Pay on Delivery (COD)</option>
                  </select>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-purple-900">₹{grandTotal}</span>
                  {discountAmount > 0 && (
                    <span className="text-[10px] text-green-600 font-bold block">
                      Saved ₹{discountAmount}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-black text-sm rounded-2xl shadow-xl shadow-purple-600/20 active:scale-98 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
              >
                <span>PLACE 10-MIN INSTAMART ORDER</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
