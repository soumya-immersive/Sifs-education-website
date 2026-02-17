import React from "react";

export default function BlogPageSkeleton() {
    return (
        <div className="w-full bg-[#FBFCFF] pb-20 animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-[300px] bg-gray-200 flex flex-col items-center justify-center">
                <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
                <div className="h-5 bg-gray-300 w-1/4 rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: BLOG POSTS GRID */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full flex flex-col">
                                    {/* Image */}
                                    <div className="h-56 bg-gray-200" />

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow space-y-4">
                                        {/* Meta */}
                                        <div className="flex gap-4">
                                            <div className="h-3 bg-gray-200 rounded w-20" />
                                            <div className="h-3 bg-gray-200 rounded w-20" />
                                        </div>

                                        {/* Title */}
                                        <div className="space-y-2">
                                            <div className="h-6 bg-gray-200 rounded w-full" />
                                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                                        </div>

                                        {/* Excerpt */}
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-full" />
                                            <div className="h-3 bg-gray-200 rounded w-full" />
                                            <div className="h-3 bg-gray-200 rounded w-2/3" />
                                        </div>

                                        {/* Button */}
                                        <div className="mt-auto pt-4">
                                            <div className="h-10 bg-gray-200 rounded-xl w-full" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Skeleton */}
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                        </div>
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="space-y-8">
                        {/* SEARCH */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                            <div className="h-12 bg-gray-200 rounded-xl w-full" />
                        </div>

                        {/* CATEGORIES */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-10 bg-gray-200 rounded-lg w-full" />
                                ))}
                            </div>
                        </div>

                        {/* RECENT POSTS */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                            <div className="space-y-5">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-full" />
                                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
