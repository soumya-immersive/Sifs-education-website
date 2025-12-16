"use client";

import Image from "next/image";

export default function CourseHighlights() {
  return (
    <div className="bg-white">
      <h3 className="text-md font-medium text-[#4559ED] mb-4">
        Course Highlights:
      </h3>

      <ul className="space-y-3 text-sm text-gray-600">
        {[
          "Pre-recorded sessions with practical insights about forensic tools and technologies",
          "Experienced mentors with years of real-world experience",
          "In-depth study of various forensic domains",
          "Industry-specific and comprehensive study material and reference books",
          "Networking opportunities with professionals and fellow enthusiasts",
          "Skill development to critically analyze evidence, make accurate conclusions, and present findings effectively",
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <Image
              src="/course/check-circle.png"
              alt=""
              width={16}
              height={16}
              className="mt-0.5 shrink-0"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
