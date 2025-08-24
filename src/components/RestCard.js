import { Link } from "react-router";

export default function RestCard({ restInfo }) {
    return (
        <>
            <Link to={"/city/delhi/" + restInfo?.info?.id}>
                <div  className="mt-10">


                    <div className="group w-full max-w-[300px] bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 cursor-pointer ">

                        {/* Image container with promotions */}
                        <div className="relative overflow-hidden h-48">
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                src={"https://media-assets.swiggy.com/swiggy/image/upload/" + restInfo.info.cloudinaryImageId}
                                alt={restInfo?.info?.name}
                            />
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                            {/* --- Future Improvement: Discount Tag --- */}
                            {/* You can add a div here for promotions like this: */}
                            {/*
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-md">
            50% OFF
        </div>
        */}
                        </div>

                        {/* Content Area */}
                        <div className="p-4 flex flex-col">
                            {/* Restaurant Name & Rating */}
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-900 truncate pr-2" title={restInfo?.info?.name}>
                                    {restInfo?.info?.name}
                                </h3>
                                <div className="flex-shrink-0 flex items-center gap-1 bg-green-600 text-white py-1 px-2 rounded-full text-xs font-bold">
                                    <span>{restInfo?.info?.avgRating}</span>
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.402 8.174L12 18.896l-7.336 3.87 1.402-8.174L.132 9.21l8.2-1.192z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Cuisines & Delivery Time */}
                            <div className="flex justify-between items-center mt-2 text-gray-500">
                                <p className="text-sm truncate pr-2 w-3/4" title={restInfo?.info?.cuisines.join(", ")}>
                                    {restInfo?.info?.cuisines.join(", ")}
                                </p>
                                <span className="text-sm font-semibold text-gray-700">{restInfo?.info?.sla?.slaString}</span>
                            </div>
                        </div>

                        {/* Divider and Quick View button (on hover) */}
                        <div className="border-t border-dashed border-gray-200 mx-4 my-1"></div>
                        <div className="px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="w-full text-center font-bold text-orange-500 uppercase">
                                Quick View
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
