import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import MenuCard from "./MenuCard";

export default function RestaurantMenu() {
    let { id } = useParams();
    const [RestData, setRestData] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const proxyServer = "https://cors-anywhere.herokuapp.com/";
            const swiggyAPI = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${id}`;
            const response = await fetch(proxyServer + swiggyAPI);
            const data = await response.json();
            const tempData = data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
            const filterData = tempData?.filter((items => "title" in items?.card?.card));
            setRestData(filterData);
        }
        fetchData();
    }, []);

    return (
        <>
            <div>
                {/* Search bar link */}
                <div className="w-full pt-24 pb-16 bg-gray-50 shadow-sm">
                    <Link to={`/city/delhi/${id}/search`}>
                        <p className="w-full text-center py-6 bg-gray-200 text-2xl sm:text-3xl font-semibold hover:bg-gray-300 transition duration-200">
                            Search for Dishes
                        </p>
                    </Link>
                </div>

                {/* Filter buttons */}
                <div className="w-full pt-16 pb-16 bg-gray-50 min-h-screen">
                    <div className="w-[80%] mx-auto flex flex-wrap gap-4 mb-10 justify-center">
                        <button
                            className={`text-lg font-medium py-2 px-6 rounded-full border transition duration-200 shadow-sm ${selected === "Veg"
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-gray-800 border-gray-300 hover:bg-green-100"
                                }`}
                            onClick={() => setSelected(selected === "Veg" ? null : "Veg")}
                        >
                            Veg
                        </button>

                        <button
                            className={`text-lg font-medium py-2 px-6 rounded-full border transition duration-200 shadow-sm ${selected === "NonVeg"
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white text-gray-800 border-gray-300 hover:bg-red-100"
                                }`}
                            onClick={() => setSelected(selected === "NonVeg" ? null : "NonVeg")}
                        >
                            Non-Veg
                        </button>
                    </div>

                    {/* Menu list */}
                    <div className="w-[80%] mx-auto space-y-10">
                        {
                            RestData?.map((menuItems) => (
                                <MenuCard
                                    key={menuItems?.card?.card?.title}
                                    menuItems={menuItems?.card?.card}
                                    foodSelected={selected}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
