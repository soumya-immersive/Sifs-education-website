"use client";

import { motion, Variants } from "framer-motion";
import { Star, BookOpen } from "lucide-react";
import { Book } from "@/types/book";

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

interface Props {
  book: Book;
}

export default function BookHero({ book }: Props) {
  // Strip HTML for overview if needed, or just use as is
  const plainOverview = book.description?.replace(/<[^>]*>?/gm, '').substring(0, 300) + "...";

  return (
    <section
      className="relative bg-white py-16 lg:py-24 overflow-hidden border-b border-gray-100"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Text Content */}
          <div className="lg:w-3/5">
            {/* Book Code / Category Badge */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                <BookOpen size={14} />
                {book.book_code || "Book"}
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                {book.category_name || "Forensic Science"}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-[1.1]"
            >
              {book.title}
            </motion.h1>

            {/* Author */}
            <motion.p
              variants={fadeUp}
              className="text-xl text-gray-700 mb-6 font-medium"
            >
              By <span className="text-blue-600 underline decoration-indigo-200 underline-offset-4">{book.author}</span>
            </motion.p>

            {/* Overview Snippet */}
            <motion.p
              variants={fadeUp}
              className="text-gray-500 text-lg mb-8 max-w-2xl leading-relaxed"
            >
              {plainOverview}
            </motion.p>

            {/* Quick Specs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < 4 ? "currentColor" : "none"} // Mocked rating
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">4.8 / 5.0</span>
              </div>

              <div className="h-4 w-[1px] bg-gray-300 hidden sm:block" />

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  <strong className="text-gray-900">{book.page_count || 100}</strong> Pages
                </span>
              </div>
            </motion.div>
          </div>

          {/* Book Image Display */}
          <motion.div
            variants={fadeUp}
            className="lg:w-2/5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600 blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
              <img
                src={book.image_url}
                alt={book.title}
                className="relative z-10 w-full max-w-[320px] h-auto rounded-lg shadow-[20px_20px_60px_rgba(0,0,0,0.1)] group-hover:shadow-[30px_30px_80px_rgba(0,0,0,0.15)] transition-all duration-500"
              />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}