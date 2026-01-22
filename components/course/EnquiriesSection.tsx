"use client";

import { useState } from "react";
<<<<<<< HEAD
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { EnquiriesData, EnquiryItem } from "../../types/courses-page";
import EditableText from "../editable/EditableText";

interface Props {
  data: EnquiriesData;
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<EnquiriesData>) => void;
}
=======
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ApiComment } from "@/types/course";
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

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

<<<<<<< HEAD
export default function EnquiriesSection({ data, editMode, onUpdate }: Props) {
  if (!data) return null;
=======
interface Props {
  enquiries?: ApiComment[];
}

const ITEMS_PER_PAGE = 5;

export default function EnquiriesSection({ enquiries = [] }: Props) {
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
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

  const handleFaqChange = (index: number, updatedItem: Partial<EnquiryItem>) => {
    const updatedFaqs = [...(data.faqs || [])];
    updatedFaqs[index] = { ...updatedFaqs[index], ...updatedItem };
    onUpdate?.({ faqs: updatedFaqs });
  };

  const addFaq = () => {
    const newFaq: EnquiryItem = {
      question: "New Question?",
      author: "Author Name",
      answer: "Answer to the new question goes here..."
    };
    onUpdate?.({ faqs: [...(data.faqs || []), newFaq] });
  };

  const removeFaq = (index: number) => {
    const updatedFaqs = (data.faqs || []).filter((_, i) => i !== index);
    onUpdate?.({ faqs: updatedFaqs });
    if (openIndex === index) setOpenIndex(null);
  };

  return (
    <motion.section
      className="relative mb-24 px-4 py-24 bg-gray-50/50"
      variants={containerVariants}
      initial={editMode ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {/* Zigzag Top */}
      <div className="absolute top-0 left-0 w-full rotate-180 opacity-50">
        <Image
          src="/course/zigzag.png"
          alt="Divider"
          width={1920}
          height={60}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            <EditableText
              html={data.title}
              editMode={!!editMode}
              onChange={(val) => onUpdate?.({ title: val })}
            />
          </h2>
          <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </motion.div>

<<<<<<< HEAD
        {/* FAQ List */}
        <motion.div variants={containerVariants} className="space-y-6">
          {(data.faqs || []).map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div key={index} variants={itemVariants} className="relative group">
=======
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
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                {/* Question */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
<<<<<<< HEAD
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenIndex(isOpen ? null : index);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-8 py-6 rounded-2xl text-left transition-all duration-300 shadow-sm border cursor-pointer select-none ${isOpen
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-100"
                    : "bg-white text-gray-700 border-gray-100 hover:border-indigo-200"
                    }`}
                >
                  <div className="text-lg font-bold flex flex-wrap items-center gap-x-2">
                    <EditableText
                      html={faq.question}
                      editMode={!!editMode}
                      onChange={(val) => handleFaqChange(index, { question: val })}
                    />
                    <span className={`text-sm font-medium opacity-60 flex items-center gap-1 before:content-['—'] before:mr-1`}>
                      <EditableText
                        html={faq.author}
                        editMode={!!editMode}
                        onChange={(val) => handleFaqChange(index, { author: val })}
                      />
=======
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-lg text-left transition ${isOpen
                    ? "bg-[#D08522] text-white"
                    : "bg-[#F0F0F0] text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <div className="text-sm font-medium pr-4">
                    {item.query}{" "}
                    <span className={`font-semibold ml-1 ${isOpen ? "text-white/90" : "text-gray-500"}`}>
                      - {item.name}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="w-6 h-6 shrink-0" />
                  ) : (
                    <ChevronRight className="w-6 h-6 shrink-0" />
                  )}
                </div>

                {/* Answer */}
<<<<<<< HEAD
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white rounded-b-2xl -mt-4 pt-8 px-8 pb-6 border-x border-b border-gray-100 shadow-inner"
                    >
                      <div className="text-base text-gray-600 leading-relaxed">
                        <EditableText
                          html={faq.answer || ""}
                          editMode={!!editMode}
                          onChange={(val) => handleFaqChange(index, { answer: val })}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {editMode && (
                  <button
                    onClick={() => removeFaq(index)}
                    className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 bg-red-50 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove FAQ"
                  >
                    <Trash2 size={16} />
                  </button>
=======
                {isOpen && item.reply && (
                  <div className="px-5 pt-4 text-sm text-gray-600 leading-relaxed bg-white/50 rounded-b-lg">
                    <div dangerouslySetInnerHTML={{ __html: item.reply }} />
                  </div>
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                )}
              </motion.div>
            );
          })}

          {editMode && (
            <motion.button
              variants={itemVariants}
              onClick={addFaq}
              className="w-full py-6 border-2 border-dashed border-indigo-100 rounded-2xl flex items-center justify-center gap-2 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors"
            >
              <Plus size={20} />
              Add New Enquiry / FAQ
            </motion.button>
          )}
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

      {/* Zigzag Bottom */}
      <div className="absolute bottom-0 left-0 w-full opacity-50">
        <Image
          src="/course/zigzag.png"
          alt="Divider"
          width={1920}
          height={60}
          className="w-full h-auto object-contain"
        />
      </div>
    </motion.section>
  );
}
