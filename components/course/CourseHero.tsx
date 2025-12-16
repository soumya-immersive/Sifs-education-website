"use client";

import { Star } from "lucide-react";

export default function CourseHero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24"
      style={{ backgroundImage: "url('/course/hero-bg.png')" }}
    >
      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* Course Code */}
        <span className="inline-block bg-[#FFE9CC] text-[#D97706] text-xs font-semibold px-3 py-1 rounded-full mb-3">
          FSP 101
        </span>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 max-w-3xl">
          Forensic Science and Criminal Investigation
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm text-gray-600">(150+ Ratings)</span>
        </div>
      </div>
    </section>
  );
}
