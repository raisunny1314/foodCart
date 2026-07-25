import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedPlace, addBooking, cancelBooking } from '../store/dineoutSlice';
import { DineoutRestaurant, TableBooking } from '../types';
import {
  CalendarCheck,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Users,
  Percent,
} from 'lucide-react';

export const DineoutSection: React.FC = () => {
  const dispatch = useDispatch();
  const { places, selectedPlace, bookings } = useSelector((state: RootState) => state.dineout);

  const [bookingDate, setBookingDate] = useState('2026-07-22');
  const [bookingTime, setBookingTime] = useState('08:00 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [guestName, setGuestName] = useState('Rahul Verma');
  const [guestPhone, setGuestPhone] = useState('+91 98765 43210');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBookTable = (place: DineoutRestaurant) => {
    dispatch(setSelectedPlace(place));
    setBookingTime(place.availableTimeSlots[0] || '08:00 PM');
  };

  const handleConfirmReservation = () => {
    if (!selectedPlace) return;

    const newBooking: TableBooking = {
      bookingId: `BK_${Math.floor(100000 + Math.random() * 900000)}`,
      dineoutRestaurantId: selectedPlace.id,
      dineoutRestaurantName: selectedPlace.name,
      date: bookingDate,
      timeSlot: bookingTime,
      guests: guestsCount,
      guestName,
      guestPhone,
      discountOffer: selectedPlace.discountOffer,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    dispatch(addBooking(newBooking));
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-pink-50/20 pb-20 animate-fadeIn">
      {/* Top Dineout Banner */}
      <div className="bg-gradient-to-r from-pink-900 via-rose-900 to-pink-800 text-white py-10 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-pink-800/80 px-3.5 py-1.5 rounded-full border border-pink-600/50 text-xs font-bold text-pink-200">
            <Percent className="w-4 h-4 text-pink-300" />
            <span>FLAT 25% - 50% OFF ON DINING BILLS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Swiggy <span className="text-pink-400">DineOut</span>
          </h1>
          <p className="text-xs sm:text-sm text-pink-200 max-w-xl">
            Book tables at top restaurants, microbreweries & fine-dining places. Pay bills via Swiggy for instant discount!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Confirmed Bookings Tickets Header */}
        {bookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-black text-gray-900 flex items-center space-x-2">
              <CalendarCheck className="w-5 h-5 text-pink-600" />
              <span>Your Upcoming Table Reservations ({bookings.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className={`p-4 rounded-3xl border shadow-sm bg-white flex flex-col justify-between space-y-3 ${
                    booking.status === 'CONFIRMED' ? 'border-pink-300' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black bg-pink-100 text-pink-800 px-2 py-0.5 rounded-md uppercase">
                        {booking.discountOffer}
                      </span>
                      <h3 className="font-bold text-gray-900 text-base mt-1">
                        {booking.dineoutRestaurantName}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        Booking ID: {booking.bookingId}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-bold text-gray-700 bg-pink-50/50 p-2.5 rounded-2xl">
                    <span>📅 {booking.date}</span>
                    <span>•</span>
                    <span>⏰ {booking.timeSlot}</span>
                    <span>•</span>
                    <span>👥 {booking.guests} Guests</span>
                  </div>

                  {booking.status === 'CONFIRMED' && (
                    <button
                      onClick={() => dispatch(cancelBooking(booking.bookingId))}
                      className="text-xs text-red-600 font-bold hover:underline text-left self-start"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurant List */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            Trending Dining Spots Near You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Discount Offer Overlay */}
                    <div className="absolute bottom-3 left-3 bg-pink-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-lg uppercase tracking-wider">
                      {place.discountOffer}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-pink-600 transition-colors">
                        {place.name}
                      </h3>
                      <div className="flex items-center space-x-1 bg-green-700 text-white px-2 py-0.5 rounded-md text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>{place.avgRating}</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-gray-500 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{place.locality}</span>
                    </p>

                    <p className="text-xs text-gray-500 truncate">{place.cuisines.join(', ')}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {place.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Book Table Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleBookTable(place)}
                    className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-pink-500/20 transition-all uppercase tracking-wider"
                  >
                    Reserve Table & Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Booking Modal */}
      {selectedPlace && !showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-white">
              <div>
                <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                  Reserve Table
                </span>
                <h3 className="text-lg font-black text-gray-900">{selectedPlace.name}</h3>
              </div>
              <button
                onClick={() => dispatch(setSelectedPlace(null))}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3 bg-pink-50 border border-pink-200 rounded-2xl flex items-center space-x-3 text-pink-800 text-xs font-bold">
                <Percent className="w-5 h-5 text-pink-600 shrink-0" />
                <span>Offer Applied: {selectedPlace.discountOffer}</span>
              </div>

              {/* Guests Count */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Number of Guests
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setGuestsCount(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        guestsCount === num
                          ? 'bg-pink-600 text-white border-pink-600'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Time Slot</label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                  >
                    {selectedPlace.availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Guest Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-medium block">Table Deposit</span>
                <span className="text-base font-black text-green-700">FREE RESERVATION</span>
              </div>

              <button
                onClick={handleConfirmReservation}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-2xl shadow-md uppercase tracking-wider"
              >
                Confirm Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-gray-900">Table Reserved Successfully!</h3>
            <p className="text-xs text-gray-500">
              Your reservation at <strong className="text-gray-800">{selectedPlace.name}</strong> for{' '}
              {guestsCount} guests on {bookingDate} at {bookingTime} is confirmed.
            </p>

            <button
              onClick={() => {
                setShowConfirmation(false);
                dispatch(setSelectedPlace(null));
              }}
              className="w-full py-3 bg-gray-900 text-white font-bold text-xs rounded-2xl hover:bg-gray-800 transition-colors uppercase"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
