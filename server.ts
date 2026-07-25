import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  MOCK_RESTAURANTS,
  FOOD_MIND_CATEGORIES,
  INSTAMART_CATEGORIES,
  INSTAMART_PRODUCTS,
  DINEOUT_RESTAURANTS,
  COUPONS,
  CITIES_LOCATIONS,
} from './src/data/mockData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'foodCart' });
  });

  // Cities & Locations
  app.get('/api/locations', (_req, res) => {
    res.json({ success: true, locations: CITIES_LOCATIONS });
  });

  // Restaurants List with filters & sorting
  app.get('/api/restaurants', (req, res) => {
    const { query, category, isPureVeg, fastDelivery, rating4Plus, sortBy } = req.query;

    let result = [...MOCK_RESTAURANTS];

    if (query && typeof query === 'string' && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
          r.locality.toLowerCase().includes(q)
      );
    }

    if (category && typeof category === 'string' && category !== 'all') {
      const cat = category.toLowerCase();
      result = result.filter((r) =>
        r.cuisines.some((c) => c.toLowerCase().includes(cat)) ||
        r.menu?.some((m) => m.title.toLowerCase().includes(cat) || m.items.some(i => i.name.toLowerCase().includes(cat)))
      );
    }

    if (isPureVeg === 'true') {
      result = result.filter((r) => r.isPureVeg);
    }

    if (fastDelivery === 'true') {
      result = result.filter((r) => r.deliveryTimeMinutes <= 25);
    }

    if (rating4Plus === 'true') {
      result = result.filter((r) => r.avgRating >= 4.0);
    }

    if (sortBy === 'cost_low_high') {
      result.sort((a, b) => a.costForTwo - b.costForTwo);
    } else if (sortBy === 'cost_high_low') {
      result.sort((a, b) => b.costForTwo - a.costForTwo);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.avgRating - a.avgRating);
    } else if (sortBy === 'delivery_time') {
      result.sort((a, b) => a.deliveryTimeMinutes - b.deliveryTimeMinutes);
    }

    res.json({
      success: true,
      data: {
        mindCategories: FOOD_MIND_CATEGORIES,
        restaurants: result,
      },
    });
  });

  // Single Restaurant detail & menu
  app.get('/api/restaurants/:id', (req, res) => {
    const restaurant = MOCK_RESTAURANTS.find((r) => r.id === req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    return res.json({ success: true, restaurant });
  });

  // Food & Restaurant Search
  app.get('/api/search', (req, res) => {
    const q = (req.query.q as string || '').toLowerCase().trim();
    if (!q) {
      return res.json({ success: true, restaurants: [], dishes: [] });
    }

    const matchedRestaurants = MOCK_RESTAURANTS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q))
    );

    const matchedDishes: { restaurant: Partial<typeof MOCK_RESTAURANTS[0]>; item: any }[] = [];
    MOCK_RESTAURANTS.forEach((r) => {
      r.menu?.forEach((cat) => {
        cat.items.forEach((item) => {
          if (
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
          ) {
            matchedDishes.push({
              restaurant: { id: r.id, name: r.name, avgRating: r.avgRating, deliveryTimeString: r.deliveryTimeString },
              item,
            });
          }
        });
      });
    });

    return res.json({
      success: true,
      restaurants: matchedRestaurants,
      dishes: matchedDishes,
    });
  });

  // Instamart Grocery API
  app.get('/api/instamart', (req, res) => {
    const { category, search } = req.query;
    let products = [...INSTAMART_PRODUCTS];

    if (category && typeof category === 'string' && category !== 'all') {
      products = products.filter((p) => p.category === category);
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.quantityInfo.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      categories: INSTAMART_CATEGORIES,
      products,
    });
  });

  // Dineout API
  app.get('/api/dineout', (_req, res) => {
    return res.json({
      success: true,
      dineoutPlaces: DINEOUT_RESTAURANTS,
    });
  });

  // Coupons API
  app.get('/api/coupons', (_req, res) => {
    return res.json({ success: true, coupons: COUPONS });
  });

  // Create Order API Simulation
  app.post('/api/orders/create', (req, res) => {
    const { cartItems, deliveryAddress, paymentMethod, grandTotal } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderId = `ORD_${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      restaurantId: cartItems[0]?.restaurantId || 'rest_1',
      restaurantName: cartItems[0]?.restaurantName || 'FoodCart Merchant',
      items: cartItems,
      grandTotal: grandTotal || 450,
      deliveryAddress,
      paymentMethod: paymentMethod || 'UPI / Online Payment',
      status: 'PLACED',
      placedAt: new Date().toISOString(),
      estimatedDeliveryMinutes: 25,
      driverName: 'Ramesh Kumar',
      driverPhone: '+91 98765 43210',
    };

    return res.json({ success: true, order: newOrder });
  });

  // Vite development middleware or production static handling
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`foodCart server running on localhost:${PORT}`);
  });
}

startServer();
