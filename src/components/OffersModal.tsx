import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setOffersModalOpen } from '../store/userSlice';
import { applyCoupon } from '../store/cartSlice';
import { COUPONS } from '../data/mockData';
import { X, Percent, Copy, Check, Sparkles } from 'lucide-react';

export const OffersModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOffersModalOpen } = useSelector((state: RootState) => state.user);
  const [copiedCode, setCopiedCode] = React.useState('');

  if (!isOffersModalOpen) return null;

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    navigator.clipboard.writeText(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleApply = (coupon: (typeof COUPONS)[0]) => {
    dispatch(applyCoupon(coupon));
    dispatch(setOffersModalOpen(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-orange-600 text-white rounded-2xl">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Food & Grocery Offers</h2>
              <p className="text-xs text-gray-500">Copy or tap to apply instantly to your cart</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(setOffersModalOpen(false))}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offers List */}
        <div className="p-5 overflow-y-auto space-y-4">
          {COUPONS.map((coupon) => (
            <div
              key={coupon.code}
              className="p-4 bg-white rounded-2xl border-2 border-dashed border-orange-200 hover:border-orange-500 transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-black bg-orange-100 text-orange-800 px-3 py-1 rounded-xl uppercase tracking-wider inline-block">
                    {coupon.code}
                  </span>
                  <p className="text-xs font-bold text-gray-800 mt-2">{coupon.description}</p>
                  <p className="text-[11px] text-gray-400">
                    Min order value ₹{coupon.minOrderValue}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="p-2 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 rounded-xl transition-colors shrink-0"
                  title="Copy code"
                >
                  {copiedCode === coupon.code ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium">
                  Valid for all food & grocery orders
                </span>

                <button
                  onClick={() => handleApply(coupon)}
                  className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs uppercase tracking-wide"
                >
                  Apply to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
