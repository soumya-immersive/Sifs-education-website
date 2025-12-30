"use client";

import { useState } from "react";
import { ChevronRight, BookOpen, ScrollText, Star, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Book } from "../../data/books";

interface Props {
  book: Book;
}

// Defining sections specifically for book metadata
const SECTIONS = [
  { id: "toc", title: "Table of Contents", icon: <ScrollText className="w-4 h-4" /> },
  { id: "note", title: "Author's Note", icon: <BookOpen className="w-4 h-4" /> },
  { id: "specs", title: "Technical Specifications", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "reviews", title: "Reader Reviews", icon: <Star className="w-4 h-4" /> },
];

/* ---------------- Animations ---------------- */

const itemFade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const accordionContent: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: "easeOut" },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2, ease: "easeInOut" },
      opacity: { duration: 0.1 },
    },
  },
};

export default function BookAccordionBlocks({ book }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {SECTIONS.map((section, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={section.id}
            className={`rounded-xl overflow-hidden border transition-all duration-300 ${
              isOpen ? "border-blue-200 shadow-sm shadow-blue-50" : "border-gray-100 bg-gray-50/30"
            }`}
            variants={itemFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`w-full flex items-center justify-between px-6 py-4 
                         text-sm font-bold transition-all
                         ${isOpen ? "text-blue-700 bg-blue-50/50" : "text-gray-700 hover:bg-gray-100/50"}`}
            >
              <div className="flex items-center gap-3">
                <span className={isOpen ? "text-blue-600" : "text-gray-400"}>
                  {section.icon}
                </span>
                {section.title}
              </div>

              <ChevronRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? "rotate-90 text-blue-600" : "text-gray-400"
                }`}
              />
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="bg-white border-t border-blue-50"
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="px-6 py-5 text-sm text-gray-600 leading-relaxed">
                    {/* Render Table of Contents from Data */}
                    {section.id === "toc" && (
                      <div className="space-y-3">
                        {/* The '&&' ensures we only map if tableOfContents exists */}
                        {book.tableOfContents && book.tableOfContents.length > 0 ? (
                          book.tableOfContents.map((chapter, i) => (
                            <div key={i} className="flex justify-between items-center group">
                              <span className="group-hover:text-blue-600 transition-colors">
                                {i + 1}. {chapter.title}
                              </span>
                              <div className="flex-grow border-b border-dotted border-gray-200 mx-2 mb-1" />
                              <span className="text-gray-400 font-mono">p.{chapter.page}</span>
                            </div>
                          ))
                        ) : (
                          <p className="italic text-gray-400">Detailed chapter list is available in the physical copy.</p>
                        )}
                      </div>
                    )}

                    {/* Technical Specs View */}
                    {section.id === "specs" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-gray-50">
                          <p className="text-[10px] uppercase tracking-wider text-gray-400">ISBN-13</p>
                          <p className="font-semibold text-gray-900">{book.bookCode || "TBA"}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <p className="text-[10px] uppercase tracking-wider text-gray-400">Category</p>
                          <p className="font-semibold text-gray-900 capitalize">{book.categorySlug.replace(/-/g, ' ')}</p>
                        </div>
                      </div>
                    )}

                    {/* Fallback for other sections */}
                    {section.id !== "toc" && section.id !== "specs" && (
                      <p>
                        Information regarding the {section.title.toLowerCase()} for 
                        <strong> {book.title}</strong> is currently being updated by our editorial team.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}