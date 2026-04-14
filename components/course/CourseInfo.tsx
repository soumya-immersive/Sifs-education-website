"use client";

import { motion, Variants } from "framer-motion";
import { Course } from "../../types/courses-page";
import { Info } from "lucide-react";

interface Props {
  course: Course;
}

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function CourseInfo({ course }: Props) {
  return (
    <motion.div
      className="bg-white relative mt-12"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-100">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              <div dangerouslySetInnerHTML={{ __html: course.aboutTitle || "About this Course" }} />
            </h2>
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mt-1">
              <div dangerouslySetInnerHTML={{ __html: course.aboutSubtitle || "Information & Overview" }} />
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="block font-bold text-sm text-blue-600 uppercase tracking-tighter">
            <div dangerouslySetInnerHTML={{ __html: course.editionLabel || "2025 Edition" }} />
          </span>
          <span className="text-[10px] font-black text-gray-400 block uppercase tracking-widest">
            <div dangerouslySetInnerHTML={{ __html: course.programLabel || "Professional Program" }} />
          </span>
        </div>
      </motion.div>

      {/* Description / Overview */}
      <motion.div
        className="space-y-6"
        variants={container}
      >
        <motion.div variants={fadeUp} className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-6 py-1 bg-blue-50/30 rounded-r-xl">
          <div dangerouslySetInnerHTML={{ __html: course.overview }} />
        </motion.div>

        <div className="space-y-6">
          {(course.descriptionParts || []).map((part, index) => (
            <motion.div key={index} variants={fadeUp} className="relative group pr-8">
              <div className="text-base text-gray-600 leading-relaxed text-justify">
                <div dangerouslySetInnerHTML={{ __html: part }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 italic text-gray-500 text-sm mt-10 relative"
        >
          <span className="absolute -top-3 left-6 px-3 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">Note</span>
          * This program is part of the SIFS India standard training series and matches
          the requirements for professional certification in forensic sciences.
        </motion.div>
      </motion.div>
    </motion.div>
  );
}