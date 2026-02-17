import React from "react";

export default function ContactPageSkeleton() {
    return (
        <div className="w-full mb-12 animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-[300px] bg-gray-200 flex flex-col items-center justify-center">
                <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
                <div className="h-16 bg-gray-300 w-1/2 rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Form Card Skeleton */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="h-16 bg-gray-100 border-b border-gray-100 w-full" />
                        <div className="p-8 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-200 rounded-lg" />
                                <div className="h-12 bg-gray-200 rounded-lg" />
                                <div className="h-12 bg-gray-200 rounded-lg" />
                                <div className="h-12 bg-gray-200 rounded-lg" />
                            </div>
                            <div className="h-20 bg-gray-200 rounded-lg w-full" />
                            <div className="h-28 bg-gray-200 rounded-lg w-full" />
                            <div className="h-12 bg-gray-200 rounded-lg w-32" />
                        </div>
                    </div>

                    {/* Right Info Card Skeleton */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="h-16 bg-gray-100 border-b border-gray-100 w-full" />
                        <div className="p-8 space-y-8">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-3 bg-gray-200 rounded w-24" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-5 bg-gray-200 rounded w-24" />
                                            <div className="h-4 bg-gray-200 rounded w-48" />
                                            <div className="h-3 bg-gray-200 rounded w-32" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Locations Skeleton */}
                <div className="mt-16 space-y-8">
                    <div className="h-8 bg-gray-200 rounded w-64" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="h-14 bg-gray-100 rounded-xl border border-gray-100" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
