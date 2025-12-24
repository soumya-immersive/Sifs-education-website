"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { Course } from "../../data/courses";

interface Props {
  course: Course;
}

const SECTIONS = ["Curriculum", "FAQ", "Case Studies", "Reviews"];

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
    <div className="space-y-3">
      {SECTIONS.map((title, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={title}
            className="bg-[#4559ed26] rounded-lg overflow-hidden border border-[#E3E9FF]"
            variants={itemFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 
                         text-sm font-medium text-black hover:bg-[#E8EEFF] transition"
            >
              {title}

              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="px-5 py-4 text-sm text-gray-600 bg-white"
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p>
                    This is the {title.toLowerCase()} content. You can replace
                    this with actual data or components.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
