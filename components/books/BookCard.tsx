"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Book } from "@/types/book";

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
    x: 4,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  // Strip HTML from description for preview
  const plainDescription = book.description?.replace(/<[^>]*>?/gm, '') || "";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      className="
        bg-white rounded-2xl border border-gray-100
        shadow-[0_4px_20px_-3px_rgba(0,0,0,0.06),0_4px_10px_-2px_rgba(0,0,0,0.03)]
        hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08),0_10px_20px_-3px_rgba(0,0,0,0.05)]
        transition-all duration-300 p-5
        flex flex-col h-full group
      "
    >
      {/* BOOK COVER IMAGE */}
      <Link href={`/books/details/${book.slug}`} className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-6 block bg-gray-50">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {book.featured === 1 && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded shadow-sm text-yellow-900 border border-yellow-500">
            Featured
          </div>
        )}
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow px-1">

        {/* Category Code (Orange text) */}
        <p className="text-sm font-bold text-orange-500 mb-2 uppercase tracking-wide">
          {book.book_code || "BK-01"}
        </p>

        {/* Title */}
        <h3 className="font-extrabold text-[#111827] mb-3 leading-tight text-xl min-h-[56px] line-clamp-2 transition-colors">
          <Link href={`/books/details/${book.slug}`}>
            {book.title}
          </Link>
        </h3>

        {/* Description Snippet */}
        <p className="text-gray-500 text-[14.5px] mb-8 line-clamp-2 leading-relaxed h-11">
          {plainDescription || "Explore the in-depth methodologies and modern techniques in forensic investigation."}
        </p>

        {/* STICK TO BOTTOM */}
        <div className="mt-auto">
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link
              href={`/books/details/${book.slug}`}
              className="
                inline-flex items-center gap-2
                bg-gradient-to-r from-[#9333ea] to-[#4f46e5]
                text-white px-6 py-3 rounded-lg
                text-sm font-bold transition-all shadow-md active:scale-95
              "
            >
              View Details
              <MoveRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}