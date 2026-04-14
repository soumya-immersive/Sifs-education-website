"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Course } from "../../types/courses-page"; // Using the unified Course type

/* ---------------- Animations ---------------- */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const buttonVariants: Variants = {
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

interface GraphProps {
  course: Course; // Changed from Book to Course
}

export default function BookCard({
  course: book, // alias to 'book' to keep code readable
}: GraphProps) {

  const stripHtml = (htmlContent: string) => {
    if (typeof window === 'undefined') return htmlContent;
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className={`
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md transition-shadow p-4
        flex flex-col h-full relative group
      `}
    >
      {/* BOOK COVER IMAGE */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-4 shadow-inner">
        <div className="w-full h-full relative">
          <Image
            src={book.image || "/books/hero.png"} // Mapped from coverImage to image
            alt={stripHtml(book.title)}
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
          <div dangerouslySetInnerHTML={{ __html: book.author || "Unknown Author" }} />
        </div>

        <h3 className="font-bold text-gray-900 mb-2 leading-tight text-lg min-h-[2.5rem] line-clamp-2">
          <div dangerouslySetInnerHTML={{ __html: book.title }} />
        </h3>

        <div className="text-sm text-gray-500 mb-6 line-clamp-3">
          <div dangerouslySetInnerHTML={{ __html: book.overview || book.description || "" }} />
        </div>

        {/* STICK TO BOTTOM */}
        <div className="mt-auto">
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link
              href={`/books/${book.programSlug}/${book.slug}`}
              className="
                  inline-block w-full text-center
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  text-white px-6 py-3 rounded-lg
                  text-sm font-semibold transition-all
                "
            >
              View Book Details
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}