import React from "react";

export default function TermsPageSkeleton() {
    return (
        <div className="min-h-screen bg-[#F0F5F9] pb-36 animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative h-[400px] w-full bg-gray-300 flex items-center justify-center">
                <div className="h-12 bg-gray-400 w-1/3 rounded" />
            </div>

            {/* Content Card Skeleton */}
            <div className="max-w-6xl mx-auto -mt-16 px-4 relative z-10">
                <div className="bg-white shadow-2xl rounded-sm p-8 md:p-16">
                    <div className="space-y-6">
                        {/* Simulate paragraphs */}
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />

                        <div className="h-4 bg-gray-200 rounded w-full mt-8" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />

                        <div className="h-4 bg-gray-200 rounded w-full mt-8" />
                        <div className="h-4 bg-gray-200 rounded w-4/5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
