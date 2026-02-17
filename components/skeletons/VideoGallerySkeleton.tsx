import React from "react";

export default function VideoGallerySkeleton() {
    return (
        <div className="w-full relative mb-12 bg-[#FBFCFF] animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-[250px] bg-gray-200 flex flex-col items-center justify-center">
                <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
                <div className="h-5 bg-gray-300 w-1/4 rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Gallery Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 h-full">
                            {/* Thumbnail */}
                            <div className="h-52 bg-gray-200 rounded-xl w-full mb-5" />

                            {/* Content */}
                            <div className="px-2 space-y-3 pb-2">
                                <div className="h-5 bg-gray-200 rounded w-full" />
                                <div className="h-5 bg-gray-200 rounded w-3/4" />

                                <div className="flex items-center gap-2 mt-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
