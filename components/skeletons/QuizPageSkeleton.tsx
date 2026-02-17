import React from "react";

export default function QuizPageSkeleton() {
    return (
        <div className="w-full bg-[#FBFCFF] pb-20 animate-pulse">
            {/* Banner Skeleton */}
            <div className="h-[250px] bg-gray-200 flex flex-col items-center justify-center">
                <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
                <div className="h-5 bg-gray-300 w-1/4 rounded" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* HERO SECTION: ACTIVE QUIZ SKELETON */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div className="h-[300px] bg-gray-200 rounded-2xl w-full" />
                    <div className="space-y-6">
                        <div className="h-8 bg-gray-200 rounded-full w-32" />
                        <div className="h-10 bg-gray-200 rounded w-3/4" />
                        <div className="h-8 bg-gray-200 rounded w-1/2" />

                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div className="h-12 bg-gray-200 rounded" />
                            <div className="h-12 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* LEFT: QUIZ HUB */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="h-6 bg-gray-200 rounded w-48" />
                        <div className="h-10 bg-gray-200 rounded w-64" />

                        {/* Year Tabs */}
                        <div className="flex gap-4 border-b border-gray-200 pb-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-8 bg-gray-200 rounded w-16" />
                            ))}
                        </div>

                        {/* Accordion List */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-16 bg-white border border-gray-100 rounded-lg shadow-sm" />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: APPLICANT FORM */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
                            <div className="h-6 bg-gray-200 rounded w-1/2 border-b border-gray-100 pb-4 mb-4" />
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                                    <div className="h-10 bg-gray-200 rounded-lg w-full" />
                                </div>
                            ))}
                            <div className="h-12 bg-gray-200 rounded-lg w-full mt-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
