"use client";

import { useState } from "react";
import Image from "next/image"

interface AcademicCollaborationsProps {
    data: {
        headingPrefix: string;
        headingHighlight: string;
        headingSuffix: string;
        items: string[];
    };
}

export default function AcademicCollaborations({
    data,
}: AcademicCollaborationsProps) {

    if (!data) return null;

    const INITIAL_COUNT = 6;
    const [showAll, setShowAll] = useState(false);

    const visibleItems = showAll ? data.items : data.items.slice(0, INITIAL_COUNT);

    return (
        <section className="py-20">
            <div className="text-center">
                <h3 className="text-2xl lg:text-3xl font-semibold text-black mb-6">
                    <div
                        dangerouslySetInnerHTML={{ __html: data.headingPrefix }}
                        className="inline"
                    />{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10">
                            <div
                                dangerouslySetInnerHTML={{ __html: data.headingHighlight }}
                                className="inline"
                            />
                        </span>

                        {/* Yellow underline image */}
                        <Image
                            src="/yellow-underline.png"
                            alt=""
                            width={200}
                            height={16}
                            className="absolute left-0 -bottom-1 z-0"
                        />
                    </span>{" "}
                    <div
                        dangerouslySetInnerHTML={{ __html: data.headingSuffix }}
                        className="inline"
                    />
                </h3>

                <div className="flex flex-wrap justify-center gap-3 max-w-7xl mx-auto px-4">
                    {visibleItems.map((item, i) => (
                        <div key={i} className="relative group">
                            <span
                                className="inline-block px-5 py-2 rounded-full border border-[#067CB6] text-sm font-normal text-black bg-[#E7ECEF] transition"
                            >
                                <div
                                    dangerouslySetInnerHTML={{ __html: item }}
                                    className="inline"
                                />
                            </span>
                        </div>
                    ))}
                </div>

                {data.items.length > INITIAL_COUNT && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-8 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white font-normal py-3 px-8 rounded-xl shadow-md hover:opacity-90 transition cursor-pointer"
                    >
                        {showAll ? "Load Less ←" : "Load More →"}
                    </button>
                )}
            </div>
        </section>
    );
}
