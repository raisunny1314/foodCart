import {dineoutRestaurants} from "../utils/restorant"
import DineCard from "./DineCard"

export default function DineOut() {
    return (
        <>
            <div className="w-[60%] container mx-auto mt-20">
                <p className="text-3xl font-bold">Discovers Best restaurants on DineOut</p>
                <div className="flex flex-nowrap overflow-x-auto mt-4 gap-3 mb-20">
                    {
                        dineoutRestaurants.map((restData) => <DineCard key={restData?.info?.id} restData={restData}></DineCard>)
                    }
                </div>

            </div>
        </>
    )
}