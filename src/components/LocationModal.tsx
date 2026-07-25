import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setLocationModalOpen, setCurrentLocation } from '../store/userSlice';
import { CITIES_LOCATIONS } from '../data/mockData';
import { MapPin, Navigation, Search, X, Check } from 'lucide-react';

export const LocationModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isLocationModalOpen, currentLocation } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredLocations = CITIES_LOCATIONS.filter(
    (loc) =>
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.fullAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSimulateGPS = () => {
    dispatch(
      setCurrentLocation({
        city: 'Bengaluru',
        area: 'Koramangala 5th Block (Current GPS)',
        fullAddress: '8th Main Road, Koramangala 5th Block, Bengaluru 560095',
        lat: 12.9352,
        lng: 77.6245,
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-2xl">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Select Delivery Location</h2>
              <p className="text-xs text-gray-500">Choose your area to see live available menus</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(setLocationModalOpen(false))}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Current Location GPS Button */}
          <button
            onClick={handleSimulateGPS}
            className="w-full flex items-center space-x-3 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl transition-all shadow-md shadow-orange-500/20 active:scale-98"
          >
            <Navigation className="w-5 h-5 text-white animate-pulse" />
            <div className="text-left flex-1">
              <span className="block font-bold text-sm">Use Current GPS Location</span>
              <span className="block text-xs text-orange-100">Auto-detect Koramangala, Bengaluru</span>
            </div>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search city, area, or landmark..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          {/* Location List */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Popular Delivery Locations
            </span>

            {filteredLocations.map((loc, idx) => {
              const isSelected =
                currentLocation.city === loc.city && currentLocation.area === loc.area;

              return (
                <button
                  key={idx}
                  onClick={() => dispatch(setCurrentLocation(loc))}
                  className={`w-full flex items-start space-x-3 p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/60 font-semibold'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className={`w-5 h-5 mt-0.5 shrink-0 ${isSelected ? 'text-orange-600' : 'text-gray-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">{loc.area}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">
                        {loc.city}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{loc.fullAddress}</p>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-orange-600 shrink-0 ml-2 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
