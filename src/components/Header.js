import { Link ,NavLink } from "react-router";

export default function Header() {

  const btnBase =
    "py-2 px-4 rounded-full transition border font-semibold";
  const btnWhite =
    `${btnBase} border-white hover:bg-white hover:text-[#ff5200]`;
  const btnBlack =
    `${btnBase} border-black bg-black hover:bg-neutral-800 text-white`;

  return (
    <header className="bg-pink-600 text-white">

      <div className="flex flex-col sm:flex-row justify-between items-center container mx-auto py-4 px-4">
        <div className="flex items-center gap-3">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
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
          <p className="bg-orange-500 px-4 py-2 rounded-lg text-white font-bold tracking-wide">
            foodCart
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 sm:gap-6 items-center mt-4 sm:mt-0 text-sm sm:text-base font-semibold">
          <a
            href="https://www.swiggy.com/corporate/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            foodCart Corporate
          </a>
          <a
            href="https://www.swiggy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Partner With Us
          </a>
          <a
            href="https://www.swiggy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={btnWhite}
          >
            Get The App
          </a>
          <NavLink to="/signup" className="hover:text-black transition-colors">
            Sign In
          </NavLink>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="pt-10 pb-8 relative overflow-hidden">
        <img
          className="h-40 sm:h-52 absolute top-0 left-0"
          src="https://b.zmtcdn.com/data/o2_assets/110a09a9d81f0e5305041c1b507d0f391743058910.png"
          alt=""
          loading="lazy"
        />
        <img
          className="h-40 sm:h-52 absolute top-0 right-0"
          src="https://b.zmtcdn.com/data/o2_assets/316495f4ba2a9c9d9aa97fed9fe61cf71743059024.png"
          alt=""
          loading="lazy"
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Order Food and Groceries. Discover the best restaurants. hurry up!
          </h1>
        </div>

        {/* Search Inputs */}
        {/* Search Inputs */}
        <div className="relative z-10 mt-8 flex flex-col sm:flex-row justify-center gap-4 px-4">
          <input
            className="bg-amber-100 text-gray-700 w-full sm:w-2/5 text-base sm:text-lg px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
            placeholder="Delhi, India"
          />
          <input
            className="bg-amber-100 text-gray-700 w-full sm:w-2/5 text-base sm:text-lg px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
            placeholder="Search for restaurants and items"
          />
        </div>

      </div>

      {/* Category Banners */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 px-4 my-10">
        <Link to="/restaurant" className="flex-1">
          <img
            className="rounded-2xl w-full h-full object-cover hover:scale-[1.02] transition"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png"
            alt="Restaurants"
            loading="lazy"
          />
        </Link>

        <a
          href="https://www.swiggy.com/instamart/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <img
            className="rounded-2xl w-full h-full object-cover hover:scale-[1.02] transition"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png"
            alt="Instamart"
            loading="lazy"
          />
        </a>

        <a
          href="https://www.swiggy.com/genie/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <img
            className="rounded-2xl w-full h-full object-cover hover:scale-[1.02] transition"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png"
            alt="Genie"
            loading="lazy"
          />
        </a>
      </div>
    </header>
  );
}
