"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Training } from "../../data/trainings";

interface Props {
  training: Training;
}

// Updated section titles for Training context
const SECTIONS = [
  "Curriculum Details",
  "Learning Objectives",
  "Frequently Asked Questions",
  "Certification Details"
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
      height: { duration: 0.25, ease: "easeInOut" },
      opacity: { duration: 0.15 },
    },
  },
};

export default function TrainingAccordionBlocks({ training }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 pt-4">
      {SECTIONS.map((title, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={title}
            className="bg-[#4559ed12] rounded-lg overflow-hidden border border-[#E3E9FF]"
            variants={itemFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 
                         text-sm font-semibold text-gray-900 hover:bg-[#E8EEFF] transition text-left"
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
                  className="px-5 py-4 text-sm text-gray-600 bg-white border-t border-[#E3E9FF]"
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className="leading-relaxed">
                    Detailed information regarding the **{title.toLowerCase()}** for the {training.title} training. 
                    This program focuses on {training.overview.toLowerCase()} 
                    providing participants with the necessary technical expertise and practical knowledge.
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