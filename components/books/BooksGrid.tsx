"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import BookCard from "./BookCard"; // Ensure you create this component
import { Book } from "../../data/books"; // Ensure this type exists

/* ---------------- Props ---------------- */

interface Props {
  books: Book[];
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

export default function BooksGrid({ books }: Props) {
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

  if (!books || books.length === 0) {
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {books.slice(0, visibleCount).map((book) => (
          <motion.div key={book.id} variants={fadeUp}>
            <BookCard book={book} />
          </motion.div>
        ))}
      </motion.div>

      {/* ACTIONS */}
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
          books.length > ITEMS_PER_LOAD && (
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
          )
        )}
      </motion.div>
    </section>
  );
}