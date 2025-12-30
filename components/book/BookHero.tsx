"use client";

import { motion, Variants } from "framer-motion";
import { Star, BookOpen } from "lucide-react";
import { Book } from "../../data/books";

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
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-28 overflow-hidden"
      style={{
        // Using book.bannerImage from your interface
        // Added a subtle gradient overlay so the text remains readable regardless of the background image
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.6)), url(${
          book.bannerImage || "/book/hero-bg.png"
        })`,
      }}
    >
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Book Code / ISBN Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide"
        >
          <BookOpen size={14} />
          {book.bookCode}
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4 max-w-4xl leading-tight"
        >
          {book.title}
        </motion.h1>

        {/* Overview Snippet */}
        <motion.p 
          variants={fadeUp}
          className="text-gray-600 text-base md:text-lg mb-6 max-w-2xl leading-relaxed"
        >
          {book.overview}
        </motion.p>

        {/* Rating & Metadata */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(book.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800">
              {book.rating}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-gray-300 hidden sm:block" />

          <span className="text-sm font-medium text-gray-500">
            {book.reviewsCount?.toLocaleString()}+ Reader Reviews
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}