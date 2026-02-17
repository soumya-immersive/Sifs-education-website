import React from "react";

export default function UploadDocumentsSkeleton() {
    return (
        <section className="relative bg-white pt-16 pb-24 px-4 overflow-hidden min-h-screen flex items-center justify-center animate-pulse">
            <div className="max-w-7xl mx-auto relative z-10 text-center mb-12 w-full">
                {/* Badge Skeleton */}
                <div className="inline-flex items-center gap-2 bg-gray-200 w-40 h-8 rounded-full mb-6 mx-auto" />

                {/* Title Skeleton */}
                <div className="h-12 md:h-16 bg-gray-200 rounded-lg w-3/4 md:w-1/2 mx-auto mb-6" />

                {/* Description Skeleton */}
                <div className="space-y-3 max-w-2xl mx-auto mb-10">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto" />
                </div>

                {/* Search Bar Skeleton */}
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-2xl md:rounded-full border border-gray-100 shadow-sm">
                        <div className="flex-1 h-16 bg-gray-200 rounded-full" />
                        <div className="w-full md:w-48 h-16 bg-gray-200 rounded-xl md:rounded-full shrink-0" />
                    </div>

                    {/* Quick Help Skeleton */}
                    <div className="mt-6 h-4 bg-gray-200 rounded w-48 mx-auto" />
                </div>
            </div>
        </section>
    );
}
