"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";

const courses = [
  {
    slug: "forensic-investigation-1",
    code: "FSP 101",
    title: "Forensic Science and Criminal Investigation",
    description:
      "Learn crime scene analysis and criminal investigation techniques.",
    image: "/courses/course1.png",
  },
  {
    slug: "fingerprint-analysis-1",
    code: "FSP 102",
    title: "Fingerprint Examination and Analysis",
    description: "Learn scientific fingerprint identification methods.",
    image: "/courses/course2.png",
  },
  {
    slug: "document-examination-1",
    code: "FSP 103",
    title: "Document and Handwriting Examination",
    description: "Examine questioned documents and handwriting.",
    image: "/courses/course3.png",
  },
  {
    slug: "fingerprint-analysis-2",
    code: "FSP 104",
    title: "Fingerprint Examination and Analysis",
    description: "Learn scientific fingerprint identification methods.",
    image: "/courses/course2.png",
  },
  {
    slug: "document-examination-2",
    code: "FSP 105",
    title: "Document and Handwriting Examination",
    description: "Examine questioned documents and handwriting.",
    image: "/courses/course3.png",
  },
  {
    slug: "forensic-investigation-2",
    code: "FSP 106",
    title: "Forensic Science and Criminal Investigation",
    description:
      "Learn crime scene analysis and criminal investigation techniques.",
    image: "/courses/course1.png",
  },
];

const ITEMS_PER_LOAD = 3;

export default function CoursesGrid() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 2000);
  };

  const handleLoadLess = () => {
    setVisibleCount(ITEMS_PER_LOAD);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.slice(0, visibleCount).map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-12">
        {/* Load More */}
        {visibleCount < courses.length && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="
              bg-gradient-to-r from-purple-500 to-indigo-600
              text-white
              px-8 py-3
              rounded-lg
              text-sm font-medium
              flex items-center gap-2
              disabled:opacity-70
              cursor-pointer
            "
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>Load More →</>
            )}
          </button>
        )}

        {/* Load Less */}
        {visibleCount >= courses.length && (
          <button
            onClick={handleLoadLess}
            className="
                bg-gradient-to-r from-purple-500 to-indigo-600
                text-white
                px-8 py-3
                rounded-lg
                text-sm font-medium
                hover:bg-gray-300
                transition
                cursor-pointer
            "
          >
            Load Less ↑
          </button>
        )}
      </div>
    </section>
  );
}
