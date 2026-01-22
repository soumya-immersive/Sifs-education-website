"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
  enquiries?: any[];
}

const ITEMS_PER_PAGE = 5;

export default function InternshipEnquiriesSection({ enquiries = [] }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Use dynamic enquiries if available
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
      {/* Zigzag Divider */}
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
          className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-10"
        >
          Enquiries from Prospective Interns
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
                {/* Question Toggle */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-xl text-left transition-all duration-300 ${isOpen
                      ? "bg-[#D08522] text-white shadow-lg translate-x-1"
                      : "bg-[#F7F7F7] text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <div className="text-sm md:text-base font-medium pr-4">
                    {item.query}{" "}
                    <span className={`text-xs block mt-1 opacity-80 ${isOpen ? 'text-white' : 'text-gray-500'}`}>
                      Asked by {item.name || "Student"}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 shrink-0" />
                  )}
                </button>

                {/* Answer Content */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-5 text-sm md:text-base text-gray-600 leading-relaxed bg-white border-x border-b border-gray-100 rounded-b-xl -mt-2 shadow-sm">
                    <div dangerouslySetInnerHTML={{ __html: item.reply || "" }} />
                  </div>
                </motion.div>
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