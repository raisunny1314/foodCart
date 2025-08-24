import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa"; // cart icon

export default function RestHeader() {
    const counter = useSelector(state => state.cartSlice.count);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 transition-all duration-300">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    {/* Left: Logo */}
                    <a href="/" className="flex items-center gap-3 group">
                        {/* New SVG Logo Container */}
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 text-orange-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>

                        {/* Updated Brand Name with a nice gradient effect */}
                        <span className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent hidden sm:block">
                            foodCart
                        </span>
                    </a>

                    {/* Center: Navigation (for future) */}
                    <nav className="hidden lg:flex items-center gap-8 text-gray-600 font-semibold">
                       
                        <a href="#" className="hover:text-orange-500 transition-colors">Offers</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Help</a>

                        <NavLink to="/signup" className="hover:text-orange-500 transition-colors">
                            Sign In
                        </NavLink>
                    </nav>

                    {/* Right: Cart */}
                    <Link
                        to="/checkout"
                        className="relative flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 font-bold text-md bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-300 group"
                    >
                        <FaShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Cart</span>
                        {counter > 0 && (
                            <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-orange-500 text-white font-bold text-xs rounded-full border-2 border-white">
                                {counter}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
