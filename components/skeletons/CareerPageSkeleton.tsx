import React from "react";

export default function CareerPageSkeleton() {
    return (
        <div className="w-full min-h-screen bg-[#FBFCFF] pb-10 animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-[250px] bg-gray-200 flex flex-col items-center justify-center">
                <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
                <div className="h-5 bg-gray-300 w-1/4 rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar Skeleton */}
                    <div className="w-full lg:w-1/3 xl:w-1/4 sticky top-24 space-y-4">
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                        <div className="h-10 bg-gray-200 rounded-lg w-full" />
                    </div>

                    {/* Job List Skeleton */}
                    <div className="flex-1 w-full flex flex-col gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-1/3" />
                                <div className="mt-6 flex gap-4">
                                    <div className="h-8 bg-gray-200 rounded-full w-24" />
                                    <div className="h-8 bg-gray-200 rounded-full w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
