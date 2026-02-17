import React from "react";

export default function PortfolioPageSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="flex flex-col border border-gray-100 p-4 rounded-lg">
                        {/* Image Skeleton */}
                        <div className="w-full aspect-square bg-gray-200 rounded-md mb-4" />

                        {/* Text Skeleton */}
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mt-2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
