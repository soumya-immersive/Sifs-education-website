"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Plus } from "lucide-react";
import BookCard from "./BookCard";
import { Course } from "../../types/courses-page"; // Changed from Book to Course

/* ---------------- Props ---------------- */

interface Props {
  books: Course[]; // Changed type to Course
  editMode?: boolean;
  onUpdateCourse?: (id: number, updatedInfo: Partial<Course>) => void;
  onDeleteCourse?: (id: number) => void;
  onAddCourse?: () => void;
}

const ITEMS_PER_LOAD = 6; // Changed to 6 for better view

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

export default function BooksGrid({
  books,
  editMode,
  onUpdateCourse,
  onDeleteCourse,
  onAddCourse
}: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate a small delay for better UX feel
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 600);
  };

  const handleLoadLess = () => {
    setVisibleCount(ITEMS_PER_LOAD);
    // Optional: Scroll back to top of grid when resetting
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if ((!books || books.length === 0) && !editMode) {
    return (
      <section className="max-w-7xl mx-auto px-4 mt-16 text-center">
        <p className="text-gray-500 text-lg italic">
          No books found in this collection.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      {/* BOOKS GRID */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial={editMode ? "visible" : "hidden"} // Don't animate in edit mode to prevent jumpiness
        whileInView="visible"
        viewport={{ once: true }}
      >
        {(editMode ? books : books.slice(0, visibleCount)).map((book) => (
          <motion.div
            key={book.id}
            variants={fadeUp}
            initial={editMode ? "visible" : "hidden"}
            animate="visible"
          >
            <BookCard
              course={book}
              editMode={editMode}
              onUpdate={(updatedInfo) => onUpdateCourse?.(book.id, updatedInfo)}
              onDelete={() => onDeleteCourse?.(book.id)}
            />
          </motion.div>
        ))}

        {/* ADD NEW BOOK CARD */}
        {editMode && (
          <motion.div
            variants={fadeUp}
            initial="visible"
            animate="visible"
            onClick={onAddCourse}
            className="h-full min-h-[400px] border-4 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center gap-4 text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-all group shadow-sm bg-white cursor-pointer relative z-10"
          >
            <div className="p-6 bg-blue-100 rounded-full group-hover:scale-110 transition-transform shadow-inner">
              <Plus size={40} />
            </div>
            <div className="text-center">
              <span className="font-extrabold text-xl block">Add New Book</span>
              <span className="text-blue-400 text-xs font-medium uppercase tracking-widest mt-1">Add to library</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ACTIONS */}
      {!editMode && books.length > ITEMS_PER_LOAD && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mt-12 mb-20"
        >
          {visibleCount < books.length ? (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="
                bg-gradient-to-r from-blue-600 to-cyan-500
                text-white px-8 py-3 rounded-full
                text-sm font-semibold flex items-center gap-2
                hover:shadow-lg transition-all active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Browsing Library...
                </>
              ) : (
                <>View More Books ↓</>
              )}
            </button>
          ) : (
            <button
              onClick={handleLoadLess}
              className="
                border-2 border-blue-600 text-blue-600 
                px-8 py-3 rounded-full text-sm font-semibold
                hover:bg-blue-50 transition-colors
              "
            >
              Show Less
            </button>
          )}
        </motion.div>
      )}
    </section>
  );
}