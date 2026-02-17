import React from "react";

export default function CMSPageSkeleton() {
    return (
        <main className="bg-[#F7F9FC] relative min-h-screen">
            {/* AboutHero Skeleton */}
            <section className="py-20 bg-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex flex-col gap-12 items-center text-left">
                        {/* Left Image Skeleton */}
                        <div className="relative w-full max-w-5xl animate-pulse">
                            <div className="h-[300px] bg-gray-200 rounded-2xl w-full" />
                        </div>

                        {/* Right Text Skeleton */}
                        <div className="w-full max-w-4xl animate-pulse space-y-4">
                            <div className="h-10 bg-gray-200 rounded w-1/3" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                                <div className="h-4 bg-gray-200 rounded w-4/5" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* InitiativesSection Skeleton */}
            <section className="py-20 bg-[#f0f0f0]">
                <div className="max-w-7xl mx-auto px-6 animate-pulse">
                    {/* Card Container */}
                    <div className="bg-[#F5F6FA] rounded-2xl p-10">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">

                            {/* Left Panel Image */}
                            <div className="bg-gray-200 rounded-2xl h-[300px] w-full" />

                            {/* Right Panel Text */}
                            <div className="space-y-6">
                                <div className="h-8 bg-gray-200 rounded w-3/4" />

                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-10/12" />
                                    <div className="h-4 bg-gray-200 rounded w-11/12" />
                                </div>

                                {/* Lists Skeleton */}
                                <div className="grid sm:grid-cols-2 gap-8 mt-6">
                                    <div className="space-y-4">
                                        <div className="h-5 bg-gray-200 rounded w-1/2" />
                                        <div className="space-y-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                                                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="h-5 bg-gray-200 rounded w-1/2" />
                                        <div className="space-y-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                                                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Skeleton - Basic blocks */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-12" />
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-gray-100 rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="h-3 bg-gray-200 rounded w-full" />
                                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                                    <div className="space-y-1">
                                        <div className="h-3 bg-gray-200 rounded w-24" />
                                        <div className="h-2 bg-gray-200 rounded w-16" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
