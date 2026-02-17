import React from "react";

export default function ConferenceDetailSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative bg-gray-200 py-16 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-6 bg-gray-300 rounded w-32 mb-6" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="h-10 bg-gray-300 rounded-full w-24" />
                            <div className="space-y-3">
                                <div className="h-12 bg-gray-300 rounded w-full" />
                                <div className="h-12 bg-gray-300 rounded w-3/4" />
                            </div>
                            <div className="h-6 bg-gray-300 rounded w-1/2" />
                            <div className="flex flex-wrap gap-4">
                                <div className="h-10 bg-gray-300 rounded-full w-28" />
                                <div className="h-10 bg-gray-300 rounded-full w-28" />
                                <div className="h-10 bg-gray-300 rounded-full w-28" />
                            </div>
                        </div>

                        <div className="h-80 bg-gray-300 rounded-2xl w-full" />
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column Skeleton */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                            <div className="h-8 bg-gray-200 rounded w-48" />
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-100 rounded w-full" />
                                <div className="h-4 bg-gray-100 rounded w-full" />
                                <div className="h-4 bg-gray-100 rounded w-full" />
                                <div className="h-4 bg-gray-100 rounded w-2/3" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                            <div className="h-8 bg-gray-200 rounded w-48" />
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-100 rounded w-full" />
                                <div className="h-4 bg-gray-100 rounded w-full" />
                                <div className="h-4 bg-gray-100 rounded w-5/6" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) Skeleton */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-24 bg-gray-200" />
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-100 rounded w-20" />
                                        <div className="h-8 bg-gray-200 rounded w-32" />
                                    </div>
                                    <div className="h-12 w-12 bg-gray-200 rounded-xl" />
                                </div>
                                <div className="h-14 bg-gray-50 rounded-xl" />
                                <div className="h-14 bg-gray-200 rounded-xl w-full" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-32" />
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-3">
                                    <div className="h-10 w-10 bg-gray-100 rounded" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-3 bg-gray-100 rounded w-16" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
