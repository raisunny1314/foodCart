import { useEffect, useState } from "react";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";



export default function Restaurant() {
    const [RestData, setRestData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const proxyServer = "https://cors-anywhere.herokuapp.com/";
            const swiggyAPI = "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.7040592&lng=77.10249019999999&carousel=true";
            const response = await fetch(proxyServer + swiggyAPI);
            const data = await response.json();
            setRestData(data?.data?.cards[4].card?.card?.gridElements?.infoWithStyle?.restaurants);

        }
        fetchData();
    }, [])

    if (RestData?.length == 0) {
        return <Shimmer></Shimmer>
    }
    // console.log(RestData)
    return (
        <>
            <div className="flex flex-wrap w-[80%] mx-auto gap-5">
                {
                    RestData.map((restInfo) => <RestCard key={restInfo?.info?.id} restInfo={restInfo}></RestCard>)

                }
            </div>
        </>
    )
}


