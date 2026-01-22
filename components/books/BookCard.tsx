"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Book } from "../../data/books"; // Ensure this matches your data structure

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

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className="
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md transition-shadow p-4
        flex flex-col h-full
      "
    >
      {/* BOOK COVER IMAGE */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-4 shadow-inner">
        <Image
          src={book.coverImage} // Changed from heroImage
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow">
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
          {book.author} {/* Changed from courseCode */}
        </p>

        <h3 className="font-bold text-gray-900 mb-2 leading-tight text-lg min-h-[2.5rem] line-clamp-2">
          {book.title}
        </h3>

        <p className="text-sm text-gray-500 mb-6 line-clamp-3">
          {book.description} {/* Changed from overview */}
        </p>

        {/* STICK TO BOTTOM */}
        <div className="mt-auto">
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link
              href={`/books/${book.categorySlug}/${book.slug}`}
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