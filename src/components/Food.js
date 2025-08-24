import { imageGridCards } from "../utils/fooddata";
import FoodCard from "./FoodCard";

export default function FoodOption() {
    return (
        

        <div className="w-[90%] sm:w-[80%] md:w-[60%] container mx-auto mt-12">

            <div className="flex flex-nowrap overflow-x-auto mt-5 gap-4 pb-4 scroll-smooth">
                {

                    imageGridCards.map((fooddata) => (
                        <FoodCard key={fooddata.id} fooddata={fooddata} />
                    ))
                }
            </div>

        </div>

    );
}
