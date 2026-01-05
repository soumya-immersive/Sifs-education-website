"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import CourseCard from "./CourseCard";
import { Course } from "../../types/courses-page";

/* ---------------- Props ---------------- */

interface Props {
  courses: Course[];
  editMode?: boolean;
  onUpdateCourse?: (id: number, updatedInfo: Partial<Course>) => void;
  onDeleteCourse?: (id: number) => void;
  onAddCourse?: () => void;
  realm?: "courses" | "internships" | "training";
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

export default function CoursesGrid({
  courses,
  editMode,
  onUpdateCourse,
  onDeleteCourse,
  onAddCourse,
  realm = "courses"
}: Props) {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      {/* GRID */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial={editMode ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        {courses.length === 0 && !editMode && (
          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-lg italic">
              No courses found matching your search or filters.
            </p>
          </div>
        )}

        {(editMode ? courses : courses.slice(0, visibleCount)).map((course) => (
          <motion.div
            key={course.id}
            variants={fadeUp}
            initial={editMode ? "visible" : "hidden"}
            animate="visible"
            className="h-full"
          >
            <CourseCard
              course={course}
              editMode={editMode}
              onUpdate={(updatedInfo) => onUpdateCourse?.(course.id, updatedInfo)}
              onDelete={() => onDeleteCourse?.(course.id)}
              realm={realm}
            />
          </motion.div>
        ))}

        {editMode && (
          <motion.div
            variants={fadeUp}
            initial="visible"
            animate="visible"
            onClick={onAddCourse}
            className="h-full min-h-[420px] border-4 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center gap-4 text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all group shadow-sm bg-white cursor-pointer relative z-10"
          >
            <div className="p-6 bg-blue-100 rounded-full group-hover:scale-110 transition-transform shadow-inner">
              <Plus size={40} />
            </div>
            <div className="text-center">
              <span className="font-extrabold text-xl block">Add New {realm === "courses" ? "Course" : realm === "internships" ? "Internship" : "Training"}</span>
              <span className="text-blue-400 text-xs font-medium uppercase tracking-widest mt-1">Create a new program entry</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ACTIONS - Only show if total courses > 3 and NOT in editMode */}
      {!editMode && courses.length > ITEMS_PER_LOAD && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          {visibleCount < courses.length ? (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="
                bg-gradient-to-r from-purple-500 to-indigo-600
                text-white px-10 py-3.5 rounded-xl
                text-sm font-semibold flex items-center gap-2
                disabled:opacity-70 transition-all hover:shadow-xl hover:-translate-y-1
              "
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>Explore More {realm === "courses" ? "Courses" : realm === "internships" ? "Internships" : "Trainings"} →</>
              )}
            </button>
          ) : (
            <button
              onClick={handleLoadLess}
              className="
                bg-white border-2 border-indigo-600 text-indigo-600
                px-10 py-3.5 rounded-xl
                text-sm font-semibold transition-all hover:bg-indigo-50
              "
            >
              Show Less Overview ↑
            </button>
          )}
        </motion.div>
      )}
    </section>
  );
}
