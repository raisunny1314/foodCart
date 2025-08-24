import { useSelector } from "react-redux";

export default function Cart() {
    const items = useSelector(state => state.cartSlice.items);
    console.log(items);

    if (items.length == 0) {
        return (
            <>
                <div className="max-w-3xl mx-auto mt-20 text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
                    <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                        alt="Empty Cart"
                        className="w-64 h-64 mx-auto"
                    />
                    <h2 className="mt-6 text-2xl font-bold text-gray-800">Your cart is empty</h2>
                    <p className="mt-2 text-md text-gray-500">You can go to the home page to view more restaurants.</p>
                    <div className="mt-8">
                        <a
                            href="/"
                            className="rounded-lg bg-orange-500 px-8 py-3 text-center text-md font-semibold text-white shadow-md hover:bg-orange-600 transition-all duration-200"
                        >
                            SEE RESTAURANTS NEAR YOU
                        </a>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className="max-w-4xl mx-auto mt-12 mb-20 p-4 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-dashed border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Cart</h1>
                <span className="text-lg font-bold text-gray-600">{items.length} Items</span>
            </div>

            {/* Cart Items List */}
            <div className="mt-8 flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                    {items.map((item, index) => (
                        <li key={index} className="flex py-6">
                            {/* Image */}
                            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                                <img
                                    src={"https://media-assets.swiggy.com/swiggy/image/upload/" + item.imageId}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                                {/* Name and Price */}
                                <div>
                                    <div className="flex justify-between text-base font-bold text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">₹{(item.defaultPrice
                                            * item.quantity / 100  || item.price * item.quantity/100).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Unit Price: ₹{(item.defaultPrice / 100 || item.price/100) .toFixed(2)}
                                    </p>
                                </div>

                          
                                <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                 
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                                        <span className="px-4 py-1 font-bold text-gray-800">{item.quantity}</span>
                                        <button className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                                    </div>

                                  
                                    <div className="flex">
                                        <button type="button" className="font-medium text-red-500 hover:text-red-700">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Order Summary */}
            <div className="mt-10 border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-3">
                    <div className="flex justify-between text-base text-gray-600">
                        <p>Subtotal</p>
                        <p className="font-semibold">122</p>
                    </div>
                    <div className="flex justify-between text-base text-gray-600">
                        <p>Delivery Fee & Taxes</p>
                        <p className="font-semibold">₹85.50</p>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-300 flex justify-between text-lg font-extrabold text-gray-900">
                    <p>To Pay</p>
                    <p>₹1383.50</p>
                </div>
            </div>

            
            <div className="mt-10">
                <button className="w-full rounded-xl bg-orange-500 px-6 py-4 text-center text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02]">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
