export default function GroceryCard({ groceryData }) {
    return (
        <>
            <div className="flex-none w-40 sm:w-44">
                <a
                    target="_blank"
                    href={groceryData?.action?.link}
                    className="block transform hover:scale-[1.03] transition duration-200"
                >
                    <img
                        className="w-40 sm:w-44 h-40 sm:h-44 object-cover rounded-xl shadow-md hover:shadow-lg transition"
                        src={"https://media-assets.swiggy.com/swiggy/image/upload/" + groceryData?.imageId}
                        alt={groceryData?.action?.text || "Grocery item"}
                    />
                </a>
                <h2 className="mt-2 font-semibold text-center text-sm sm:text-base text-neutral-800">
                    {groceryData?.action?.text}
                </h2>
            </div>
        </>
    );
}
