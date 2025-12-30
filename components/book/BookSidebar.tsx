"use client";

import { Linkedin, Twitter, ShoppingCart, MessageSquare } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Book } from "../../data/books";

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
  // Mapping book data to the sidebar list
  const specificationItems = [
    {
      label: "Price",
      value: book.price || "$0.00",
      icon: "/book/icon-price.png",
      highlight: true,
    },
    {
      label: "Format",
      value: book.format || "Hardcover",
      icon: "/book/icon-format.png",
    },
    {
      label: "Pages",
      value: `${book.pageCount || 0} Pages`,
      icon: "/book/icon-pages.png",
    },
    {
      label: "Language",
      value: book.language || "English",
      icon: "/book/icon-lang.png",
    },
    {
      label: "Stock",
      value: book.inStock ? "Available" : "Out of Stock",
      icon: "/book/icon-stock.png",
    },
  ];

  return (
    <motion.div
      className="sticky top-28 space-y-6 mb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* BOOK ACTIONS & SPECS */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
      >
        <div className="relative group">
          <img
            src={book.coverImage || "/book/sidebar-placeholder.png"}
            alt={book.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </div>

        <div className="p-5">
          <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
            Book Specifications
          </h3>

          <ul className="space-y-4 text-sm">
            {specificationItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt={item.label} className="w-5 h-5 opacity-70" />
                  <span className="text-gray-600">{item.label}</span>
                </div>

                <span
                  className={
                    item.highlight
                      ? "font-bold text-blue-600 text-base"
                      : "text-gray-800 font-medium"
                  }
                >
                  {item.value}
                </span>
              </li>
            ))}

            <li className="pt-4 border-t border-gray-100">
               <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-200">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* AUTHORS / CONTRIBUTORS */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200"
      >
        <h3 className="text-md font-bold text-gray-900 p-5">About the Authors</h3>
        <div className="border-t border-gray-100" />

        <div className="space-y-5 p-5">
          {(book.authors || [{ name: book.author, role: "Principal Author", img: "/book/author-default.png" }]).map((auth) => (
            <div key={auth.name} className="flex items-start gap-3">
              <img
                src={auth.img}
                className="w-12 h-12 rounded-full border-2 border-gray-50 object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                  {auth.name}
                </p>
                <p className="text-xs text-gray-500 mb-2">{auth.role}</p>

                <div className="flex items-center gap-2 text-gray-400">
                  <Linkedin className="w-3.5 h-3.5 hover:text-blue-600 cursor-pointer transition-colors" />
                  <Twitter className="w-3.5 h-3.5 hover:text-blue-600 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* BULK INQUIRY */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-50 rounded-xl border border-gray-200"
      >
        <div className="p-5 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <h3 className="text-md font-bold text-gray-900">Bulk Order Inquiry</h3>
        </div>
        <div className="border-t border-gray-200" />

        <form className="space-y-3 p-5">
          <input
            className="w-full bg-white border border-gray-200 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            placeholder="Full Name"
          />
          <input
            className="w-full bg-white border border-gray-200 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            placeholder="Organization/Library Name"
          />
          <textarea
            rows={2}
            className="w-full bg-white border border-gray-200 text-black rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            placeholder="Expected Quantity & Questions"
          />
          <button className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Send Inquiry
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}