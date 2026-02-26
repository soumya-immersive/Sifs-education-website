"use client";

import { Linkedin, Twitter, ShoppingCart, MessageSquare, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Book } from "@/types/book";

interface Props {
  book: Book;
}

/* ---------------- Animations ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function BookSidebar({ book }: Props) {
  const specificationItems = [
    {
      label: "Price",
      value: `₹${book.price}` || "Contact Us",
      highlight: true,
    },
    {
      label: "Code",
      value: book.book_code || "N/A",
    },
    {
      label: "Pages",
      value: `${book.page_count || 0} Pages`,
    },
    {
      label: "Language",
      value: "English", // Default from API language_id usually
    },
    {
      label: "Status",
      value: book.status === 1 ? "Available" : "Coming Soon",
    },
  ];

  return (
    <motion.div
      className="sticky top-28 space-y-8 mb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* AUTHORS / CONTRIBUTORS */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">About the Author</h3>
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-20" />
            <img
              src="/book/author-default.png"
              className="relative w-14 h-14 rounded-full border-2 border-white object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-md font-bold text-gray-900 mb-1">
              {book.author}
            </p>
            <p className="text-xs text-blue-600 font-medium mb-3">Principal Author</p>

          </div>
        </div>
      </motion.div>

      {/* BOOK ACTIONS & SPECS */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <div className="p-6">
          <ul className="space-y-4 text-sm mb-6">
            {specificationItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <span className="text-gray-500 font-medium">{item.label}</span>
                <span
                  className={
                    item.highlight
                      ? "font-bold text-blue-600 text-lg"
                      : "text-gray-900 font-semibold"
                  }
                >
                  {item.value}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <Link
              href={`/books/register/${book.slug}`}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-sm font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-100 group"
            >
              Buy Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </motion.div>


    </motion.div>
  );
}