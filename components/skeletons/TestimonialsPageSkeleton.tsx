import React from "react";

export default function TestimonialsPageSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 mt-16">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative bg-white border border-gray-100 rounded-2xl p-8 pt-16 shadow-sm">
                        {/* User Image Placeholder - Floating */}
                        <div className="absolute -top-12 left-8">
                            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white" />
                        </div>

                        <div className="mt-2 space-y-4">
                            {/* Name */}
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />

                            {/* Comment Lines */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>

                            {/* Rank */}
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
