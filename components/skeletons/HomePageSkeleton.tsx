import React from "react";

export default function HomePageSkeleton() {
    return (
        <div className="w-full animate-pulse space-y-20 pb-20">
            {/* Banner Skeleton */}
            <section className="relative h-[600px] bg-gray-200 w-full">
                <div className="max-w-7xl mx-auto h-full px-4 flex flex-col justify-center gap-6">
                    <div className="h-4 bg-gray-300 rounded w-48" />
                    <div className="h-16 bg-gray-300 rounded w-3/4" />
                    <div className="h-16 bg-gray-300 rounded w-1/2" />
                    <div className="flex gap-4 mt-4">
                        <div className="h-12 bg-gray-300 rounded-lg w-40" />
                        <div className="h-12 bg-gray-300 rounded-lg w-40" />
                    </div>
                </div>
            </section>

            {/* Global Influence / Stats Skeleton */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-gray-200 rounded-full" />
                            <div className="h-6 bg-gray-200 rounded w-24" />
                            <div className="h-4 bg-gray-100 rounded w-32" />
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us Skeleton */}
            <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div className="h-[400px] bg-gray-200 rounded-2xl w-full" />
                <div className="space-y-6">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-10 bg-gray-200 rounded w-full" />
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                    <div className="h-12 bg-gray-200 rounded-lg w-40" />
                </div>
            </section>

            {/* Grid Sections Placeholder (Events, Courses, etc) */}
            <section className="max-w-7xl mx-auto px-4 space-y-10">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-8 bg-gray-200 rounded w-64" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg w-32" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
                            <div className="h-48 bg-gray-200 rounded-xl w-full" />
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-100 rounded w-full" />
                                <div className="h-4 bg-gray-100 rounded w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Courses Section Skeleton */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center space-y-4 mb-12">
                        <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
                        <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-64 bg-white rounded-xl shadow-sm border border-gray-100" />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
