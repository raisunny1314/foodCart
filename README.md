# foodCart 🍽️

A Swiggy-like food ordering frontend built with **React** and **Redux Toolkit**.  
This project fetches **live Swiggy data** for restaurants and menus and includes a fully working **Add to Cart** system.

---

## ✨ Features

- 🍴 Browse Restaurants, click->>DineOut, Grocery sections
- 📄 Detailed restaurant menus (live data)
- 🛒 Add to Cart, update quantities, remove items
- 💵 Auto calculation of total price
- 🔍 Search functionality for food & restaurants
- ⚡ Optimized state management with Redux Toolkit
- 🎨 Responsive UI built with React components

---

## 🧰 Tech Stack

- **React 18**
- **Redux Toolkit** + **React-Redux**
- **React Router**
- **Parcel Bundler**
- **Fetch API**

---

## 🚀 Getting Started

### 1) Clone & Install

```bash
git clone https://github.com/your-username/foodCart.git
cd foodCart
npm install
```

### 2) Run (Development)

```bash
npx parcel src/index.html
```

Parcel will start the dev server at `http://localhost:1234/`.

The output will be generated in the `dist/` folder.

## 📂 Project Structure

```text
src/
├── components/
│   ├── CartDrawer.tsx
│   ├── CustomizationModal.tsx
│   ├── DineoutSection.tsx
│   ├── DishCard.tsx
│   ├── FavoritesOrdersModal.tsx
│   ├── FoodCategories.tsx
│   ├── InstamartCheckoutModal.tsx
│   ├── InstamartSection.tsx
│   ├── LocationModal.tsx
│   ├── Navbar.tsx
│   ├── OffersModal.tsx
│   ├── OrderTrackingModal.tsx
│   ├── RestaurantCard.tsx
│   ├── RestaurantDetail.tsx
│   ├── RestaurantFilters.tsx
│   ├── SearchView.tsx
│   └── TopBrandsCarousel.tsx
│
│
├── store/
│   ├── cartSlice.ts
│   ├── dineoutSlice.ts
│   ├── grocerySlice.ts
│   ├── index.ts
│   ├── orderSlice.ts
│   ├── restaurantSlice.ts
│   └── userSlice.ts
│
├── App.tsx
├── index.css
├── main.tsx
└── types.ts
```

## 📸 Screenshots

![Home Page](<image/Screenshot (280).png>)
![InstaMart Page](<image/Screenshot (281).png>)
![Food Choice](<image/Screenshot (282).png>)
![Add to Cart](<image/Screenshot (283).png>)
![Cart](<image/Screenshot (284).png>)
![Payment](<image/Screenshot (285).png>)

## ⚠️ Disclaimer

This project is made **only for learning/demo purposes**.

## 📜 License

MIT © 2025 SunnyRajbhar
