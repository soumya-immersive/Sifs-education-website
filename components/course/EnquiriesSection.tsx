"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { EnquiriesData } from "../../types/courses-page";

interface Props {
  data: EnquiriesData;
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
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function EnquiriesSection({ data }: Props) {
  if (!data) return null;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      className="relative mb-24 px-4 py-24 bg-gray-50/50"
      variants={containerVariants}
      initial="hidden"
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
            <div dangerouslySetInnerHTML={{ __html: data.title }} />
          </h2>
          <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </motion.div>

        {/* FAQ List */}
        <motion.div variants={containerVariants} className="space-y-6">
          {(data.faqs || []).map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div key={index} variants={itemVariants} className="relative group">
                {/* Question */}
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
                  className={`w-full flex items-center justify-between px-8 py-6 rounded-2xl text-left transition-all duration-300 shadow-sm border cursor-pointer select-none ${isOpen
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-100"
                    : "bg-white text-gray-700 border-gray-100 hover:border-indigo-200"
                    }`}
                >
                  <div className="text-lg font-bold flex flex-wrap items-center gap-x-2">
                    <div dangerouslySetInnerHTML={{ __html: faq.question }} />
                    <span className={`text-sm font-medium opacity-60 flex items-center gap-1 before:content-['—'] before:mr-1`}>
                      <div dangerouslySetInnerHTML={{ __html: faq.author }} />
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="w-6 h-6 shrink-0" />
                  ) : (
                    <ChevronRight className="w-6 h-6 shrink-0" />
                  )}
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white rounded-b-2xl -mt-4 pt-8 px-8 pb-6 border-x border-b border-gray-100 shadow-inner"
                    >
                      <div className="text-base text-gray-600 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer || "" }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
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
