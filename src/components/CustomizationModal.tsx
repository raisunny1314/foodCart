import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem, MenuItemOptionGroup } from '../types';
import { addItem } from '../store/cartSlice';
import { X, Check } from 'lucide-react';

interface Props {
  restaurantId: string;
  restaurantName: string;
  item: MenuItem;
  onClose: () => void;
}

export const CustomizationModal: React.FC<Props> = ({
  restaurantId,
  restaurantName,
  item,
  onClose,
}) => {
  const dispatch = useDispatch();

  // Selected options state: groupName -> option object
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, { optionName: string; price: number }>
  >(() => {
    const initial: Record<string, { optionName: string; price: number }> = {};
    item.optionGroups?.forEach((og) => {
      if (og.options.length > 0) {
        initial[og.name] = { optionName: og.options[0].name, price: og.options[0].price };
      }
    });
    return initial;
  });

  const handleOptionChange = (groupName: string, optionName: string, price: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupName]: { optionName, price },
    }));
  };

  const calculateTotalPrice = () => {
    const optionsTotal = (Object.values(selectedOptions) as { optionName: string; price: number }[]).reduce(
      (sum, opt) => sum + opt.price,
      0
    );
    return item.price + optionsTotal;
  };

  const handleAddToCart = () => {
    const formattedOptions = (
      Object.entries(selectedOptions) as [string, { optionName: string; price: number }][]
    ).map(([groupName, opt]) => ({
      groupName,
      optionName: opt.optionName,
      price: opt.price,
    }));

    dispatch(
      addItem({
        restaurantId,
        restaurantName,
        item,
        selectedOptions: formattedOptions,
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
          <div>
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
              Customize Item
            </span>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {item.optionGroups?.map((group: MenuItemOptionGroup) => (
            <div key={group.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900">{group.name}</h4>
                {group.required && (
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md">
                    REQUIRED
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {group.options.map((opt) => {
                  const isSelected = selectedOptions[group.name]?.optionName === opt.name;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionChange(group.name, opt.name, opt.price)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/60 font-semibold'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-orange-600 bg-orange-600 text-white' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold text-gray-800">{opt.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-600">
                        {opt.price > 0 ? `+₹${opt.price}` : 'Free'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block font-medium">Total Item Price</span>
            <span className="text-xl font-black text-gray-900">₹{calculateTotalPrice()}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-2xl shadow-md shadow-orange-500/20 active:scale-95 transition-all"
          >
            Add Item to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
