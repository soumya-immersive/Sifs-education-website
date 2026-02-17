import React from "react";

export default function FacultyPageSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            {/* Banner Skeleton */}
            <div className="bg-gray-200 h-[250px] flex flex-col items-center justify-center animate-pulse">
                <div className="h-10 bg-gray-300 w-1/3 mx-auto rounded mb-4" />
                <div className="h-5 bg-gray-300 w-1/4 mx-auto rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 mb-12">
                {/* Filters Skeleton */}
                <div className="flex flex-wrap justify-center gap-2 mb-14 items-center animate-pulse">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 w-32 bg-gray-200 rounded-md" />
                    ))}
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="animate-pulse group relative">
                            {/* Image Placeholder */}
                            <div className="h-[240px] bg-gray-200 rounded-xl mb-4" />

                            {/* Info Placeholder */}
                            <div className="flex flex-col items-center gap-2 p-2">
                                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
