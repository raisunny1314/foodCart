import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTrackingModalOpen, updateOrderStatus } from '../store/orderSlice';
import { clearCart } from '../store/cartSlice';
import {
  X,
  CheckCircle2,
  ChefHat,
  Bike,
  Home,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isTrackingModalOpen, activeOrder } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (activeOrder && activeOrder.status === 'PLACED') {
      dispatch(clearCart());

      // Simulate status progression
      const timer1 = setTimeout(() => {
        dispatch(updateOrderStatus('PREPARING'));
      }, 4000);

      const timer2 = setTimeout(() => {
        dispatch(updateOrderStatus('OUT_FOR_DELIVERY'));
      }, 10000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [activeOrder, dispatch]);

  if (!isTrackingModalOpen || !activeOrder) return null;

  const getStepStatus = (step: string) => {
    const statuses = ['PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIndex = statuses.indexOf(activeOrder.status);
    const stepIndex = statuses.indexOf(step);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const isInstamartOrder = activeOrder.restaurantId === 'instamart' || activeOrder.restaurantName.includes('Instamart');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div
          className={`p-5 border-b border-gray-100 flex items-center justify-between text-white ${
            isInstamartOrder
              ? 'bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800'
              : 'bg-gradient-to-r from-orange-500 to-amber-500'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-md">
              <Bike className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-100">
                {isInstamartOrder ? '⚡ INSTAMART LIVE TRACKER' : 'LIVE ORDER TRACKER'}
              </span>
              <h2 className="text-xl font-black">{activeOrder.restaurantName}</h2>
            </div>
          </div>
          <button
            onClick={() => dispatch(setTrackingModalOpen(false))}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Estimated Arrival Time Card */}
          <div
            className={`p-5 rounded-3xl border text-center space-y-2 relative overflow-hidden ${
              isInstamartOrder
                ? 'bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 border-purple-200'
                : 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-orange-200'
            }`}
          >
            <div
              className={`inline-flex items-center space-x-2 bg-white/80 px-3 py-1 rounded-full text-xs font-bold shadow-xs ${
                isInstamartOrder ? 'text-purple-800' : 'text-orange-700'
              }`}
            >
              <Clock className={`w-4 h-4 animate-spin ${isInstamartOrder ? 'text-purple-700' : 'text-orange-600'}`} />
              <span>{isInstamartOrder ? 'INSTAMART EXPRESS DELIVERY' : 'ESTIMATED DELIVERY'}</span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">
              {isInstamartOrder ? '8 - 12 Mins' : '18 - 22 Mins'}
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Order #{activeOrder.orderId} • Delivering to {activeOrder.deliveryAddress.label}
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Live Order Progress
            </h4>

            <div className="space-y-4 relative pl-6 border-l-2 border-gray-200 ml-3">
              {/* Step 1: Order Placed */}
              <div className="relative">
                <div
                  className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    getStepStatus('PLACED') === 'completed' || getStepStatus('PLACED') === 'active'
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900">Order Confirmed</h5>
                  <p className="text-xs text-gray-500">Sent to {isInstamartOrder ? 'Dark Store' : 'kitchen'} at {activeOrder.placedAt.slice(11, 16)}</p>
                </div>
              </div>

              {/* Step 2: Preparing */}
              <div className="relative">
                <div
                  className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    getStepStatus('PREPARING') === 'completed'
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : getStepStatus('PREPARING') === 'active'
                      ? `${isInstamartOrder ? 'bg-purple-700 ring-purple-100' : 'bg-orange-600 ring-orange-100'} text-white ring-4 animate-pulse`
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <ChefHat className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900">
                    {isInstamartOrder ? 'Packing Grocery Items at Dark Store' : 'Kitchen Preparing Your Dishes'}
                  </h5>
                  <p className="text-xs text-gray-500">
                    {isInstamartOrder ? 'Store executive is selecting fresh groceries' : 'Master chefs are crafting your food fresh'}
                  </p>
                </div>
              </div>

              {/* Step 3: Out for Delivery */}
              <div className="relative">
                <div
                  className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    getStepStatus('OUT_FOR_DELIVERY') === 'completed'
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : getStepStatus('OUT_FOR_DELIVERY') === 'active'
                      ? `${isInstamartOrder ? 'bg-purple-700 ring-purple-100' : 'bg-orange-600 ring-orange-100'} text-white ring-4 animate-bounce`
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900">
                    {isInstamartOrder ? 'Instamart Express Partner Picked Up' : 'Delivery Partner Picked Up'}
                  </h5>
                  <p className="text-xs text-gray-500">On the way to your door in thermal bag</p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-400">Delivered to Address</h5>
                  <p className="text-xs text-gray-400">Handover to recipient</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Driver Info Card */}
          <div className="bg-gray-50 p-4 rounded-3xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                👨‍✈️
              </div>
              <div>
                <h5 className="text-sm font-bold text-gray-900">{activeOrder.driverName || 'Ramesh Kumar'}</h5>
                <p className="text-xs text-gray-500">Swiggy Valued Delivery Executive • ⭐ 4.9</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={`tel:${activeOrder.driverPhone || '+919876543210'}`}
                className="p-2.5 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => alert(`Messaging executive ${activeOrder.driverName}`)}
                className="p-2.5 bg-gray-200 text-gray-800 rounded-2xl hover:bg-gray-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Order Summary Breakdown */}
          <div className="p-4 bg-gray-50 rounded-3xl border border-gray-200 space-y-2">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Order Items ({activeOrder.items.length})
            </h5>
            <div className="divide-y divide-gray-200 text-xs">
              {activeOrder.items.map((i, idx) => (
                <div key={idx} className="py-2 flex justify-between">
                  <span className="font-semibold text-gray-800">
                    {i.quantity}x {i.item.name}
                  </span>
                  <span className="font-bold text-gray-900">₹{i.totalPrice}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
              <span>Paid via {activeOrder.paymentMethod}</span>
              <span className="text-orange-600">₹{activeOrder.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
