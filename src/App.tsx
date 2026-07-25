import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState } from './store';
import { fetchRestaurants } from './store/restaurantSlice';
import { Navbar } from './components/Navbar';
import { FoodCategories } from './components/FoodCategories';
import { TopBrandsCarousel } from './components/TopBrandsCarousel';
import { RestaurantFilters } from './components/RestaurantFilters';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetail } from './components/RestaurantDetail';
import { InstamartSection } from './components/InstamartSection';
import { DineoutSection } from './components/DineoutSection';
import { SearchView } from './components/SearchView';
import { LocationModal } from './components/LocationModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { OffersModal } from './components/OffersModal';
import { FavoritesOrdersModal } from './components/FavoritesOrdersModal';
import { InstamartCheckoutModal } from './components/InstamartCheckoutModal';
import { Utensils, ShoppingBag, Sparkles, MapPin, Store, CalendarCheck } from 'lucide-react';

const MainAppContent: React.FC = () => {

  const dispatch = useDispatch();
  const { activeTab, currentLocation } = useSelector((state: RootState) => state.user);
  const { restaurants, selectedRestaurant, loading, error } = useSelector(
    (state: RootState) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchRestaurants() as any);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 antialiased selection:bg-orange-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Router based on Active Tab */}
      {selectedRestaurant ? (
        <RestaurantDetail />
      ) : activeTab === 'instamart' ? (
        <InstamartSection />
      ) : activeTab === 'dineout' ? (
        <DineoutSection />
      ) : activeTab === 'search' ? (
        <SearchView />
      ) : (
        /* Default Food Delivery View */
        <main className="pb-24">
          {/* Hero Banner Strip */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-white py-6 px-4 sm:px-8 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center space-x-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>SWIGGY EXCLUSIVE DEALS</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Hungry in <span className="underline decoration-amber-300">{currentLocation.area || currentLocation.city}</span>?
                </h1>
                <p className="text-xs sm:text-sm text-orange-100 font-medium">
                  Order from top restaurants with lightning fast 20-minute delivery!
                </p>
              </div>

              {/* Badges */}
              <div className="flex items-center space-x-3 text-xs font-extrabold bg-black/20 p-3 rounded-2xl border border-white/10 shrink-0">
                <div className="text-center px-2">
                  <span className="block text-amber-300 font-black text-sm">50% OFF</span>
                  <span className="text-[10px] text-white/80">Code SWIGGY50</span>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center px-2">
                  <span className="block text-amber-300 font-black text-sm">⚡ 20 MIN</span>
                  <span className="text-[10px] text-white/80">Average ETA</span>
                </div>
              </div>
            </div>
          </div>

          {/* What's on your mind? Carousel */}
          <FoodCategories />

          {/* Top Restaurant Chains Carousel */}
          <TopBrandsCarousel />

          {/* Filters & Sorting */}
          <RestaurantFilters />

          {/* Restaurant Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-gray-200/80 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : restaurants.length === 0 ? (
              <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-gray-100 p-8 shadow-xs my-6">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full mx-auto flex items-center justify-center">
                  <Utensils className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No restaurants match your filters</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try clearing your filters or search query to discover more food options.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {/* Overlays and Modals */}
      <LocationModal />
      <CartDrawer />
      <InstamartCheckoutModal />
      <OrderTrackingModal />
      <OffersModal />
      <FavoritesOrdersModal />
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainAppContent />
    </Provider>
  );
}
