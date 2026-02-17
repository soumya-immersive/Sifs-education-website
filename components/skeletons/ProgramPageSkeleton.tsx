import React from "react";

export default function ProgramPageSkeleton() {
    return (
        <div className="min-h-screen bg-[#FBFCFF] animate-pulse">
            {/* Hero Skeleton */}
            <div className="h-[300px] bg-gray-200 w-full flex flex-col justify-center items-center">
                <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
                <div className="h-5 bg-gray-300 w-1/4 rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Filter Bar Skeleton */}
                <div className="h-16 bg-white rounded-xl border border-gray-100 mb-8 w-full" />

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col">
                            <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                            <div className="space-y-3 flex-grow">
                                <div className="h-6 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="h-8 bg-gray-200 rounded w-24" />
                                <div className="h-8 bg-gray-200 rounded w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
