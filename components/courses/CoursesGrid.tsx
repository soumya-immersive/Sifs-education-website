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

/* ---------------- Component ---------------- */

export default function CoursesGrid({ courses }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  console.log(`[CoursesGrid] Total courses: ${courses?.length || 0}`);
  console.log(`[CoursesGrid] Visible count: ${visibleCount}`);
  console.log(`[CoursesGrid] Courses data:`, courses);

  const handleLoadMore = () => {
    console.log(`[CoursesGrid] Load More clicked. Current visible: ${visibleCount}, Total: ${courses.length}`);
    setLoading(true);
    setTimeout(() => {
      const newCount = visibleCount + ITEMS_PER_LOAD;
      console.log(`[CoursesGrid] Setting visible count to: ${newCount}`);
      setVisibleCount(newCount);
      setLoading(false);
    }, 800);
  };

  const handleLoadLess = () => {
    console.log(`[CoursesGrid] Load Less clicked`);
    setVisibleCount(ITEMS_PER_LOAD);
    // Optional: Scroll back up to the top of the grid smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const visibleCourses = courses.slice(0, visibleCount);
  console.log(`[CoursesGrid] Rendering ${visibleCourses.length} courses out of ${courses.length}`);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      {/* GRID */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
        key={visibleCount}
      >
        {visibleCourses.map((course, index) => (
          <motion.div
            key={course.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ opacity: 1 }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      {/* ACTIONS - Only show if total courses > 3 */}
      {courses.length > ITEMS_PER_LOAD && (
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
                disabled:opacity-70 transition-all hover:shadow-lg
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
            // Only shows "Load Less" if we are currently showing more than the initial row
            <button
              onClick={handleLoadLess}
              className="
                bg-gradient-to-r from-purple-500 to-indigo-600
                text-white px-8 py-3 rounded-lg
                text-sm font-medium transition-all hover:shadow-lg
              "
            >
              Load Less ↑
            </button>
          )}
        </motion.div>
      )}
    </section>
  );
}
