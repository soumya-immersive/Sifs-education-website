import React from "react";

export default function ConferencePageSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 animate-pulse">
            {/* Hero Banner Skeleton */}
            <div className="relative bg-gray-200 py-24 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <div className="h-16 bg-gray-300 rounded-xl w-3/4 mx-auto" />
                    <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto" />
                    <div className="flex justify-center gap-4">
                        <div className="h-10 bg-gray-300 rounded-full w-28" />
                        <div className="h-10 bg-gray-300 rounded-full w-28" />
                        <div className="h-10 bg-gray-300 rounded-full w-28" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search & Filter Bar Skeleton */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-12 bg-gray-200 rounded-xl w-full" />
                        <div className="flex gap-2 flex-wrap">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 bg-gray-200 rounded-lg w-24" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Events Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                            {/* Image Area */}
                            <div className="relative h-48 bg-gray-200">
                                <div className="absolute top-4 left-4 h-20 w-16 bg-white/50 rounded-xl" />
                                <div className="absolute top-4 right-4 h-6 w-20 bg-white/50 rounded-full" />
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <div className="h-6 bg-gray-200 rounded w-full" />
                                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-100 rounded w-full" />
                                    <div className="h-3 bg-gray-100 rounded w-full" />
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <div className="h-4 bg-gray-200 rounded w-24" />
                                    <div className="h-4 bg-gray-200 rounded w-16" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <div className="h-12 w-12 bg-gray-200 rounded-xl" />
                    <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                    <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                    <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                    <div className="h-12 w-12 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
