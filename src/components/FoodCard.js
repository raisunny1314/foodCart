export default function FoodCard({ fooddata }) {
    return (
        <>
            <div className="max-width-[250px] flex-none"
            //    className="relative rounded-xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg"
            >

                <a
                    target="_blank"
                    href={fooddata?.action?.link}
                    className="block transform hover:scale-[1.03] transition duration-200"
                >
                    <img className="h-30 overflow-hidden object-cover w-full"
                        // className="w-full h-[180px] object-cover"
                        src={"https://media-assets.swiggy.com/swiggy/image/upload/" + fooddata?.imageId}
                        alt={fooddata?.action?.text || "Food"}
                    />
                </a>
            </ div>
        </>
    );
}
