import React from 'react';

const ShimmerCard = () => (
    <div className="w-full max-w-[300px] space-y-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="h-48 w-full bg-gray-200 rounded-xl"></div>
        <div className="space-y-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded-md"></div>
            <div className="h-5 w-1/2 bg-gray-200 rounded-md"></div>
            <div className="h-5 w-5/6 bg-gray-200 rounded-md"></div>
        </div>
    </div>
);

const Shimmer = () => {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
                {Array.from({ length: 8 }).map((_, index) => (
                    <ShimmerCard key={index} />
                ))}
            </div>
        </div>
    );
};

export default Shimmer;