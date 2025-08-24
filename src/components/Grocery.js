import { groceryGridCards } from "../utils/groceryData";
import GroceryCard from "./GroceryCard";

export default function Grocery() {
    return (
        <>
            <div className="w-[90%] sm:w-[80%] md:w-[60%] container mx-auto mt-12">
                <h1 className="text-center text-xl sm:text-2xl mt-6 font-bold text-neutral-800">
                    Shop Groceries on Instamart
                </h1>

                <div className="flex flex-nowrap overflow-x-auto mt-5 gap-4 pb-4 scroll-smooth">
                    {
                        groceryGridCards.map((groceryData) => (
                            <GroceryCard key={groceryData.id} groceryData={groceryData} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}
