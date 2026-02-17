import React from "react";

export default function GalleryPageSkeleton() {
    return (
        <div className="w-full relative mb-24 bg-[#FBFCFF] animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-[250px] bg-gray-200 flex flex-col items-center justify-center">
                <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
                <div className="h-5 bg-gray-300 w-1/4 rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-24">
                {/* Category Tabs Skeleton */}
                <div className="flex gap-3 pb-3 overflow-x-auto">
                    <div className="h-10 bg-gray-200 rounded-full w-24" />
                    <div className="h-10 bg-gray-200 rounded-full w-32" />
                    <div className="h-10 bg-gray-200 rounded-full w-28" />
                    <div className="h-10 bg-gray-200 rounded-full w-24" />
                </div>

                {/* Gallery Grid Skeleton */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 h-full">
                            {/* Image */}
                            <div className="h-48 bg-gray-200 rounded-lg w-full mb-4" />

                            {/* Text */}
                            <div className="space-y-2 mb-4">
                                <div className="h-5 bg-gray-200 rounded w-3/4" />
                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                            </div>

                            {/* Button */}
                            <div className="h-10 bg-gray-200 rounded-lg w-full" />
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex justify-center items-center gap-2 mt-12">
                    <div className="h-10 bg-gray-200 rounded-lg w-24" />
                    <div className="h-10 bg-gray-200 rounded-lg w-10" />
                    <div className="h-10 bg-gray-200 rounded-lg w-10" />
                    <div className="h-10 bg-gray-200 rounded-lg w-24" />
                </div>
            </div>
        </div>
    );
}
