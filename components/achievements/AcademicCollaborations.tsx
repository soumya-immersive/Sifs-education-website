"use client";

import { useState } from "react";
import Image from "next/image"

export default function AcademicCollaborations() {
  const items = [
    "SketchCop Academy, USA",
    "Tarlac State University, Philippines",
    "Centurion University, Andhra Pradesh",
    "Galgotias University, Greater Noida",
    "Federal University of Technology, Nigeria",
    "Amity University, Noida",
    "Sharda University, Greater Noida",
    "SRM University, Chennai",
    "Lovely Professional University, Punjab",
    "University of Philippines",
  ];

  const INITIAL_COUNT = 6;
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, INITIAL_COUNT);

  return (
    <section className="py-20">
        <div className="text-center">
        <h3 className="text-2xl lg:text-3xl font-semibold text-black mb-6">
            Academic{" "}
            <span className="relative inline-block">
                <span className="relative z-10">Collaborations</span>

                {/* Yellow underline image */}
                <Image
                src="/yellow-underline.png"
                alt=""
                width={200}
                height={16}
                className="absolute left-0 -bottom-1 z-0"
                />
            </span>{" "}
            (MoU)
        </h3>

            <div className="flex flex-wrap justify-center gap-3 max-w-7xl mx-auto">
                {visibleItems.map((item, i) => (
                <span
                    key={i}
                    className="px-5 py-2 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-normal text-black bg-[#E7ECEF] transition"
                >
                    {item}
                </span>
                ))}
            </div>

            {items.length > INITIAL_COUNT && (
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
