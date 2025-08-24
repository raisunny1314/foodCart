import { useDispatch, useSelector } from "react-redux";
import { addItems, IncrementItems, DecrementItems } from "../global/CartSlicer";

export default function MenuInfo({ menuInfo }) {
    const items = useSelector(state => state.cartSlice.items);
    const dispatch = useDispatch();

    const present = items.find(item => item.id === menuInfo.id);
    const count = present ? present.quantity : 0;

    function handleAdditems() {
        dispatch(addItems(menuInfo));
    }

    function handleIncrementitems() {
        dispatch(IncrementItems(menuInfo));
    }

    function handleDecrementitems() {
        dispatch(DecrementItems(menuInfo));
    }

    return (
        <>
            <div className="flex gap-6 py-8 border-b border-gray-200/80">

                {/* Left Side: Text Info */}
                <div className="flex-1">
                    {/* You can add an icon here for veg/non-veg if you have that data */}
                    {/* <img src="veg-icon.png" alt="Veg" className="w-5 h-5 mb-1"/> */}

                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {menuInfo?.name}
                    </h3>

                    <p className="text-md font-semibold text-gray-800 mb-3">
                        ₹{(menuInfo?.defaultPrice ?? menuInfo?.price ?? 0) / 100}
                    </p>

                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-600 mb-4">
                        <svg className="w-4 h-4 fill-orange-500" xmlns="http://www.w.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.402 8.174L12 18.896l-7.336 3.87 1.402-8.174L.132 9.21l8.2-1.192z" />
                        </svg>
                        <span>
                            {menuInfo?.ratings?.aggregatedRating?.rating ?? "New Item"}
                        </span>
                        <span className="text-gray-400 font-normal">
                            ({menuInfo?.ratings?.aggregatedRating?.ratingCount ?? "0 ratings"})
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {menuInfo?.description}
                    </p>
                </div>

                {/* Right Side: Image + Add / Counter */}
                <div className="w-40 flex-shrink-0 text-center relative">
                    <img
                        className="w-full h-40 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                        src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/" +
                            menuInfo?.imageId
                        }
                        alt={menuInfo?.name || "menu item"}
                    />

                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[100px]">
                        {count === 0 ? (
                            <button
                                onClick={handleAdditems}
                                className="w-full bg-white border-2 border-gray-300 text-green-600 font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 transform hover:scale-105"
                            >
                                ADD
                            </button>
                        ) : (
                            <div className="w-full flex items-center justify-between bg-white border-2 border-gray-300 text-green-600 font-bold text-lg rounded-lg shadow-md transition-all duration-300">
                                <button
                                    className="w-1/3 py-2 rounded-l-md hover:bg-green-600 hover:text-white"
                                    onClick={handleDecrementitems}
                                >
                                    -
                                </button>
                                <span className="w-1/3 text-sm">{count}</span>
                                <button
                                    className="w-1/3 py-2 rounded-r-md hover:bg-green-600 hover:text-white"
                                    onClick={handleIncrementitems}
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
