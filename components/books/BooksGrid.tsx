"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";
import { Book, BooksResponse } from "@/types/book";

/* ---------------- Props ---------------- */

interface Props {
  books: Book[];
  pagination?: BooksResponse["data"]["pageSection"];
  baseUrl: string;
  searchTerm?: string;
}

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

export default function BooksGrid({ books, pagination, baseUrl, searchTerm }: Props) {
  const getPageUrl = (pageNum: string | number) => {
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set("page", pageNum.toString());
    if (searchTerm) {
      url.searchParams.set("sb", searchTerm);
    }
    return `${url.pathname}${url.search}`;
  };

  if (!books || books.length === 0) {
    return (
      <section className="mt-16 text-center py-24 bg-white/50 rounded-2xl border-2 border-dashed border-gray-100">
        <p className="text-gray-400 text-lg italic">
          No books found in this collection.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 px-1">
      {/* BOOKS GRID - 3 Columns */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {books.map((book) => (
          <motion.div key={`${book.id}-${book.slug}`} variants={fadeUp}>
            <BookCard book={book} />
          </motion.div>
        ))}
      </motion.div>

      {/* PAGINATION CONTROLS */}
      {pagination && pagination.last_page > 1 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center gap-3 mt-20"
        >
          {/* Previous Button */}
          {pagination.current_page > 1 ? (
            <Link
              href={getPageUrl(pagination.current_page - 1)}
              className="p-3.5 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all text-gray-400 shadow-sm"
            >
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <div className="p-3.5 rounded-xl border border-gray-50 bg-gray-50/50 text-gray-200 cursor-not-allowed">
              <ChevronLeft size={20} />
            </div>
          )}

          {/* Page Numbers */}
          <div className="flex items-center gap-2.5 mx-2">
            {pagination.links && pagination.links.map((link, idx) => {
              const cleanLabel = link.label
                .replace(/&laquo;/g, '')
                .replace(/&raquo;/g, '')
                .replace(/&lsaquo;/g, '')
                .replace(/&rsaquo;/g, '')
                .replace(/Prev/g, '')
                .replace(/Next/g, '')
                .trim();

              if (!cleanLabel || (isNaN(Number(cleanLabel)) && cleanLabel !== "...")) return null;

              const isPageNumber = !isNaN(Number(cleanLabel));
              const isActive = link.active;

              return isPageNumber ? (
                <Link
                  key={idx}
                  href={getPageUrl(cleanLabel)}
                  className={`
                    w-11 h-11 flex items-center justify-center rounded-xl font-bold text-sm transition-all
                    ${isActive
                      ? "bg-[#6366f1] text-white shadow-xl shadow-indigo-100 scale-110"
                      : "bg-white border border-gray-100 text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30 shadow-sm"
                    }
                  `}
                >
                  {cleanLabel}
                </Link>
              ) : (
                <span key={idx} className="w-11 h-11 flex items-center justify-center text-gray-400 italic">
                  {cleanLabel}
                </span>
              );
            })}
          </div>

          {/* Next Button */}
          {pagination.current_page < pagination.last_page ? (
            <Link
              href={getPageUrl(pagination.current_page + 1)}
              className="p-3.5 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all text-gray-400 shadow-sm"
            >
              <ChevronRight size={20} />
            </Link>
          ) : (
            <div className="p-3.5 rounded-xl border border-gray-50 bg-gray-50/50 text-gray-200 cursor-not-allowed">
              <ChevronRight size={20} />
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}