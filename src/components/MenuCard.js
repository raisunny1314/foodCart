import { useState } from "react";
import MenuInfo from "./MenuInfo";


const ChevronIcon = ({ isOpen }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
        />
    </svg>
);

export default function MenuCard({ menuItems, foodSelected }) {
    const [isOpen, setIsOpen] = useState(true);

    if ("categories" in menuItems) {
        return (
            <div className="w-full pt-8 first:pt-0">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        {menuItems.title}
                    </h2>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>
                <div className="space-y-6">
                    {menuItems?.categories?.map((items) => (
                        <MenuCard
                            key={items?.title}
                            menuItems={items}
                            foodSelected={foodSelected}
                        />
                    ))}
                </div>
            </div>
        );
    }

    const getFilteredItems = () => {
        if (!menuItems.itemCards) return [];
        switch (foodSelected) {
            case "Veg":
                return menuItems.itemCards.filter(
                    (food) => food?.card?.info?.isVeg
                );
            case "NonVeg":
                return menuItems.itemCards.filter(
                    (food) => !food?.card?.info?.isVeg
                );
            default:
                return menuItems.itemCards;
        }
    };

    const filteredItems = getFilteredItems();

    if (filteredItems.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden mb-6">
            <div
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50/50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-xl font-bold text-gray-800">
                    {menuItems.title} ({filteredItems.length})
                </h3>
                <ChevronIcon isOpen={isOpen} />
            </div>

            {isOpen && (
                <div className="px-5 divide-y divide-gray-200/80">
                    {filteredItems.map((items) => (
                        <MenuInfo
                            key={items?.card?.info?.id}
                            menuInfo={items?.card?.info}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
