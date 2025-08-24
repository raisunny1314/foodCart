export default function DineCard({ restData }) {
    const imageUrl = "https://media-assets.swiggy.com/swiggy/image/upload/" + restData?.info?.mediaFiles[0]?.url;

    return (
        <div className="max-width-[250px] flex-none">
            <a target="_blank" rel="noopener noreferrer" href={restData?.cta?.link}>
                <div className="relative rounded-xl overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg">
                    
                    {/* Restaurant Image */}
                    <img className ="w-full h-[180px] object-cover"
                        src={imageUrl}
                        alt={restData?.info?.name}
                    />

                    <div className="absolute bottom-0 left-0 right-0 height-20 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    {/* Restaurant Info */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <p className="text-white font-semibold text-small truncate">{restData?.info?.name}</p>
                        <span className="text-white font-semibold text-extra-small bg-green-600 padding-x-2 padding-y-0.5 rounded-md">
                            ⭐ {restData?.info?.rating?.value}
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
}
