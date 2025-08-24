import React, { useState } from "react";
import ReactDOM from "react-dom/client"
import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import { BrowserRouter, Routes, Route } from "react-router";
import RestaurantMenu from "./components/RestaurantMenu";
// import SearchFood from "./components/SearchFood";
import SecondHome from "./components/SecondHome";
import Cart from "./components/Cart";
import { store } from "./global/stores";
import { Provider } from "react-redux";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";

function App() {
    return <>
        <Provider store={store}>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home></Home>}>

                    </Route>
                    <Route path="/signup" element={<SignUp></SignUp>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route element={<SecondHome></SecondHome>}>

                        <Route path="/restaurant" element={<Restaurant></Restaurant>}></Route>
                        <Route path="/city/delhi/:id" element={<RestaurantMenu></RestaurantMenu>}></Route>

                        <Route path="/checkout" element={<Cart></Cart>}></Route>
                    </Route>

                </Routes>
            </BrowserRouter>

        </Provider>
    </>
}

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>)





/////https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.7040592&lng=77.10249019999999&carousel=true&third_party_vendor=1
// {/* <Route path="/city/delhi/:id/search" element={<SearchFood></SearchFood>}></Route> */}