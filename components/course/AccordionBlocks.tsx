"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Course } from "../../types/courses-page";

interface Props {
  course: Course;
}

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
      height: { duration: 0.25, ease: "easeInOut" },
      opacity: { duration: 0.15 },
    },
  },
};

export default function AccordionBlocks({ course }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-green-500 rounded-full" />
          Course Curriculum & Information
        </h3>
      </div>

      {(course.accordionItems || []).map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen ? "border-indigo-200 shadow-md bg-indigo-50/10" : "border-gray-100 bg-white"
              }`}
            variants={itemFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="relative group">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : index);
                  }
                }}
                className={`w-full flex items-center justify-between px-6 py-5 
                           text-left font-bold transition-all cursor-pointer select-none ${isOpen ? "text-indigo-600 bg-indigo-50/50" : "text-gray-800 hover:bg-gray-50"
                  }`}
              >
                <div dangerouslySetInnerHTML={{ __html: item.title }} />

                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-90 text-indigo-600" : "text-gray-400"
                    }`}
                />
              </div>
            </div>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="px-6 py-6 text-base text-gray-600 bg-white border-t border-indigo-50 leading-relaxed"
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
