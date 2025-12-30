"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import CourseCard from "./CourseCard";
import { Course } from "../../data/courses";

/* ---------------- Props ---------------- */

interface Props {
  courses: Course[];
}

const ITEMS_PER_LOAD = 3;

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

export default function CoursesGrid({ courses }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 800);
  };

  const handleLoadLess = () => {
    setVisibleCount(ITEMS_PER_LOAD);
  };

  if (!courses || courses.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 mt-16 text-center">
        <p className="text-gray-500 text-lg">
          No courses available for this program.
        </p>
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
        whileInView="visible"
        viewport={{ once: true }}
      >
        {courses.slice(0, visibleCount).map((course) => (
          <motion.div key={course.id} variants={fadeUp}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      {/* ACTIONS */}
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
            className="
              bg-gradient-to-r from-purple-500 to-indigo-600
              text-white px-8 py-3 rounded-lg
              text-sm font-medium flex items-center gap-2
              disabled:opacity-70
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
        ) : (
          <button
            onClick={handleLoadLess}
            className="
              bg-gradient-to-r from-purple-500 to-indigo-600
              text-white px-8 py-3 rounded-lg
              text-sm font-medium
            "
          >
            Load Less ↑
          </button>
        )}
      </motion.div>
    </section>
  );
}
