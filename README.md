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

## 🌐 CORS Note

Swiggy’s data cannot be fetched directly in browsers due to **CORS restrictions**.  
To bypass this, the project uses the **CORS Anywhere Heroku Demo** proxy:

👉 `https://cors-anywhere.herokuapp.com/demo`

When making API calls, prefix the URL like this:

```js
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://www.swiggy.com/dapi/restaurants/list/v5?...";

⚠️ **Important:** Sometimes you need to visit
👉 https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo)
and click **“Request temporary access”** before it works.

---

## 🗂️ Project Structure


```plaintext
├── src/
│ ├── auth/
│ ├── components/
│ │ ├── Cart.js
│ │ ├── DineCard.js
│ │ ├── DineOut.js
│ │ ├── Food.js
│ │ ├── FoodCard.js
│ │ ├── Grocery.js
│ │ ├── GroceryCard.js
│ │ ├── Header.js
│ │ ├── Home.js
│ │ ├── MenuCard.js
│ │ ├── MenuInfo.js
│ │ ├── Restaurant.js
│ │ ├── RestaurantMenu.js
│ │ ├── RestCard.js
│ │ ├── RestHeader.js
│ │ ├── SearchFood.js
│ │ ├── SecondHome.js
│ │ ├── Shimmer.js
│ ├── global/
│ │ ├── CartSlicer.js
│ │ ├── stores.js
│ ├── utils/
│ │ ├── fooddata.js
│ │ ├── groceryData.js
│ │ ├── restoran.js
│ ├── App.js
│ ├── index.css
│ └── index.html
├── package.json
└── README.md

```


## 📸 Screenshots

![Home Page](<images/Screenshot%20(136).png>)
![SignIn Page](<images/Screenshot%20(180).png>)
![LogIn Page](<images/Screenshot%20(182).png>)
![Food Choice](<images/Screenshot%20(137).png>)
![Shimmer Effect](<images/Screenshot%20(138).png>)
![FetchedFOOD](<images/Screenshot%20(175).png>)
![AddTOCart](<images/Screenshot%20(177).png>)
![Responsive](<images/Screenshot%20(183).png>)
![Responsive](<images/Screenshot%20(184).png>)
![Responsive](<images/Screenshot%20(185).png>)
![Cart](<images/Screenshot%20(178).png>)

## ⚠️ Disclaimer

This project is made **only for learning/demo purposes**.

## 📜 License

MIT © 2025 SunnyRajbhar
