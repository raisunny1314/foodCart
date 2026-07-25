export type VegType = 'veg' | 'non-veg' | 'egg';

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItemOptionGroup {
  id: string;
  name: string;
  required: boolean;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  type: VegType;
  imageId: string;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
  isBestseller?: boolean;
  isCustomizable?: boolean;
  optionGroups?: MenuItemOptionGroup[];
  category: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  imageId: string;
  imageUrl?: string;
  cuisines: string[];
  avgRating: number;
  totalRatingsString: string;
  costForTwo: number;
  costForTwoString: string;
  deliveryTimeMinutes: number;
  deliveryTimeString: string;
  distanceKm: number;
  locality: string;
  areaName: string;
  promoted?: boolean;
  aggregatedDiscountInfoV3?: {
    header?: string;
    subHeader?: string;
    discountTag?: string;
  };
  isPureVeg?: boolean;
  menu?: MenuCategory[];
}

export interface CartItem {
  cartItemId: string; // unique ID including selected options
  restaurantId: string;
  restaurantName: string;
  item: MenuItem;
  quantity: number;
  selectedOptions?: {
    groupName: string;
    optionName: string;
    price: number;
  }[];
  totalPrice: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number; // e.g. 50 for 50% or 100 for ₹100 flat
  maxDiscount?: number;
  minOrderValue: number;
  description: string;
}

export interface GroceryProduct {
  id: string;
  name: string;
  quantityInfo: string; // e.g. "500 g", "1 L", "Pack of 2"
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  rating?: number;
}

export interface GroceryCategory {
  id: string;
  name: string;
  icon: string;
  bannerUrl?: string;
}

export interface DineoutRestaurant {
  id: string;
  name: string;
  locality: string;
  cuisines: string[];
  costForTwo: number;
  avgRating: number;
  reviewCount: number;
  discountOffer: string; // e.g. "FLAT 30% OFF ON FOOD BILL"
  imageUrl: string;
  tags: string[];
  address: string;
  openingHours: string;
  availableTimeSlots: string[];
}

export interface TableBooking {
  bookingId: string;
  dineoutRestaurantId: string;
  dineoutRestaurantName: string;
  date: string;
  timeSlot: string;
  guests: number;
  guestName: string;
  guestPhone: string;
  discountOffer: string;
  status: 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

export interface UserAddress {
  id: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  label: string;
  flatNo: string;
  addressLine: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  orderId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  itemTotal: number;
  deliveryFee: number;
  taxesAndCharges: number;
  discountAmount: number;
  deliveryTip: number;
  grandTotal: number;
  couponCodeApplied?: string;
  deliveryAddress: UserAddress;
  paymentMethod: string;
  status: 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  estimatedDeliveryMinutes: number;
  driverName?: string;
  driverPhone?: string;
  placedAt: string;
}

export interface LocationState {
  city: string;
  area: string;
  fullAddress: string;
  lat: number;
  lng: number;
}
