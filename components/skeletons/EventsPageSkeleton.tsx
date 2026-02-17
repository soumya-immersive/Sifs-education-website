import React from "react";

export default function EventsPageSkeleton() {
    return (
        <div className="min-h-screen bg-white animate-pulse">
            {/* Hero Section Skeleton */}
            <section className="mx-auto max-w-7xl px-4 py-20 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Image */}
                    <div className="relative h-[420px] w-full bg-gray-200 rounded-xl flex items-center justify-center">
                        <div className="absolute bottom-4 left-4 bg-white/50 w-40 h-8 rounded-lg" />
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6">
                        <div className="h-8 bg-gray-200 rounded-full w-48" />
                        <div className="h-12 bg-gray-200 rounded w-full" />
                        <div className="h-12 bg-gray-200 rounded w-3/4" />

                        <div className="space-y-3 mt-6">
                            <div className="h-5 bg-gray-200 rounded w-1/2" />
                            <div className="h-5 bg-gray-200 rounded w-1/2" />
                        </div>

                        <hr className="my-6 border-gray-100" />

                        <div className="h-12 bg-gray-200 rounded-lg w-48" />
                    </div>
                </div>
            </section>

            {/* Upcoming Events Skeleton */}
            <section className="bg-gradient-to-r from-white via-white to-violet-50 py-16">
                <div className="mx-auto max-w-7xl px-4">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-24" />
                            <div className="h-8 bg-gray-200 rounded w-48" />
                        </div>
                        <div className="h-10 bg-gray-200 rounded-lg w-32" />
                    </div>

                    {/* Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col p-3 bg-white rounded-2xl shadow-sm border border-gray-100 h-full">
                                {/* Image */}
                                <div className="h-44 bg-gray-200 rounded-lg w-full mb-4" />

                                {/* Content */}
                                <div className="flex-1 flex flex-col space-y-3">
                                    <div className="flex justify-between">
                                        <div className="h-3 bg-gray-200 rounded w-16" />
                                        <div className="h-3 bg-gray-200 rounded w-16" />
                                    </div>

                                    <div className="h-5 bg-gray-200 rounded w-full" />
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />

                                    <div className="h-12 bg-gray-200 rounded-md w-full mt-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Generic Lower Section Placeholder */}
            <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
                <div className="h-64 bg-gray-100 rounded-2xl" />
                <div className="h-64 bg-gray-100 rounded-2xl" />
            </div>

        </div>
    );
}
