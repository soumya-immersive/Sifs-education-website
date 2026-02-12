"use client";
import Link from "next/link";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import CourseCard from "./CourseCard";
import { Course } from "../../data/courses";
import { useSearchParams } from "next/navigation";

/* ---------------- Props ---------------- */

export interface PaginationData {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  showing_from: number;
  showing_to: number;
  has_previous: boolean;
  has_next: boolean;
}

export interface Props {
  courses: Course[];
  pagination?: PaginationData;
  slug?: string;
  basePath?: string;
}

const ITEMS_PER_LOAD = 10;

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

export default function CoursesGrid({ courses, pagination, slug, basePath = "" }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  // If we have server-side pagination, we don't want to slice locally
  const displayCourses = pagination ? courses : courses.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(visibleCount + ITEMS_PER_LOAD);
      setLoading(false);
    }, 800);
  };

  const handleLoadLess = () => {
    setVisibleCount(ITEMS_PER_LOAD);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNum));
    if (pagination?.per_page) {
      params.set("limit", String(pagination.per_page));
    }
    // Existing params (search, level, duration, sort) are already in 'params' 
    // because we initialized with searchParams.toString()
    return `${basePath}${slug ? `/${slug}` : ''}?${params.toString()}`;
  };

  if (!courses || courses.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 mt-16 text-center">
        <p className="text-gray-500 text-lg">No courses available for this program.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      {/* GRID */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
        key={pagination ? pagination.current_page : visibleCount}
      >
        {displayCourses.map((course) => (
          <motion.div key={course.id} variants={fadeUp}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      {/* SERVER-SIDE PAGINATION */}
      {pagination && pagination.total_pages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10 px-4 border-t border-gray-100 pt-10">
          {/* Left Side: Showing info */}
          <div className="text-[#6B7385] text-sm font-medium">
            Showing <span className="text-gray-900 font-bold">{pagination.showing_from}</span> to <span className="text-gray-900 font-bold">{pagination.showing_to}</span> of <span className="text-gray-900 font-bold">{pagination.total}</span> courses
          </div>

          {/* Right Side: Page navigation */}
          <div className="flex items-center gap-4">
            <Link
              href={pagination.has_previous ? createPageUrl(pagination.current_page - 1) : '#'}
              onClick={(e) => !pagination.has_previous && e.preventDefault()}
              className={`px-4 py-2 rounded-lg border transition-all text-sm font-semibold ${pagination.has_previous
                ? "border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                : "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50/50"
                }`}
            >
              Prev
            </Link>

            {/* Page numbers (show window around current page) */}
            <div className="flex items-center gap-2">
              {(() => {
                const pages: (number | "...")[] = [];
                const total = pagination.total_pages;
                const current = pagination.current_page;
                const delta = 2; // pages to show around current

                const left = Math.max(1, current - delta);
                const right = Math.min(total, current + delta);

                if (left > 1) {
                  pages.push(1);
                  if (left > 2) pages.push("...");
                }

                for (let p = left; p <= right; p++) pages.push(p);

                if (right < total) {
                  if (right < total - 1) pages.push("...");
                  pages.push(total);
                }

                return pages.map((p, idx) => {
                  if (p === "...") {
                    return (
                      <div key={`dots-${idx}`} className="px-3 py-2 text-sm text-gray-500">{p}</div>
                    );
                  }

                  const pageNum = p as number;
                  const isActive = pageNum === current;

                  return (
                    <Link
                      key={`page-${pageNum}`}
                      href={createPageUrl(pageNum)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 border border-transparent hover:bg-gray-50'}`}
                    >
                      {pageNum}
                    </Link>
                  );
                });
              })()}
            </div>

            <Link
              href={pagination.has_next ? createPageUrl(pagination.current_page + 1) : '#'}
              onClick={(e) => !pagination.has_next && e.preventDefault()}
              className={`px-4 py-2 rounded-lg border transition-all text-sm font-semibold ${pagination.has_next
                ? "border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                : "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50/50"
                }`}
            >
              Next
            </Link>
          </div>
        </div>
      )}

      {/* CLIENT-SIDE LOAD MORE (Fallback if no pagination metadata) */}
      {!pagination && courses.length > ITEMS_PER_LOAD && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          {visibleCount < courses.length ? (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-70 transition-all hover:shadow-lg"
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
          ) : (
            <button
              onClick={handleLoadLess}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg text-sm font-medium transition-all hover:shadow-lg"
            >
              Load Less ↑
            </button>
          )}
        </motion.div>
      )}
    </section>
  );
}
