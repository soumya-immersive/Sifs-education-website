"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ApiComment } from "@/types/course";

/* ---------------- Animations ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

interface Props {
  enquiries?: ApiComment[];
}

const ITEMS_PER_PAGE = 5;

export default function EnquiriesSection({ enquiries = [] }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Use dynamic enquiries if available, otherwise fall back to empty or static (User requested dynamic)
  const items = enquiries && enquiries.length > 0 ? enquiries : [];

  if (items.length === 0) return null;

  // Pagination Logic
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenIndex(null); // Close accordion on page change
  };

  return (
    <motion.section
      className="relative mb-12 px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Zigzag */}
      <div className="absolute top-0 left-0 w-full">
        <Image
          src="/course/zigzag.png"
          alt="Divider"
          width={1920}
          height={60}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-2xl font-semibold text-black text-center mb-8"
        >
          Enquiries from Forensic Learners
        </motion.h2>

        {/* Enquiry List */}
        <motion.div
          key={currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 min-h-[200px]"
        >
          {currentItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div key={item.id || index} variants={itemVariants}>
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-lg text-left transition ${isOpen
                    ? "bg-[#D08522] text-white"
                    : "bg-[#F0F0F0] text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <div className="text-sm font-medium pr-4">
                    {item.query}{" "}
                    <span className={`font-semibold ml-1 ${isOpen ? "text-white/90" : "text-gray-500"}`}>
                      - {item.name}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 shrink-0" />
                  )}
                </button>

                {/* Answer */}
                {isOpen && item.reply && (
                  <div className="px-5 pt-4 text-sm text-gray-600 leading-relaxed bg-white/50 rounded-b-lg">
                    <div dangerouslySetInnerHTML={{ __html: item.reply }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full border border-gray-300 transition-colors ${currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === page
                  ? "bg-[#D08522] text-white"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full border border-gray-300 transition-colors ${currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
