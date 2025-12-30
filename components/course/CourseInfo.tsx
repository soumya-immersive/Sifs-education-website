"use client";

import { motion, Variants } from "framer-motion";
import { Course } from "../../data/courses"; // 1. Changed from Book to Course
import { Info } from "lucide-react";

interface Props {
  course: Course; // 2. Updated prop name
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
      className="bg-white relative mt-10"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Decorative lines (top-left) */}
      {/*<motion.div
        variants={fadeUp}
        className="absolute -top-2 -left-2 w-12 h-12 bg-[url('/books/lines-blue.svg')] bg-contain bg-no-repeat opacity-50"
      />*/}

      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            About this Course
          </h2>
        </div>

        <div className="text-right">
          <span className="block font-bold text-sm text-blue-600 uppercase tracking-tight">
            2025 Edition
          </span>
          <span className="text-xs font-medium text-gray-400 block">
            Professional Program
          </span>
        </div>
      </motion.div>

      {/* Description / Overview */}
      <motion.div
        className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed"
        variants={container}
      >
        {/* 3. Changed 'book.overview' to 'course.description' (or your actual property) */}
        <motion.p variants={fadeUp} className="font-medium text-gray-800">
          {course.description || "Comprehensive learning program designed for forensic professionals."}
        </motion.p>

        <motion.p variants={fadeUp}>
          This certificate program on <strong>{course.title}</strong> serves as an essential resource 
          for students, practitioners, and forensic enthusiasts. It bridges the gap between 
          theoretical principles and practical field application.
        </motion.p>

        <motion.p variants={fadeUp}>
          Guided by industry veterans, the curriculum delves into the intricacies of evidence analysis, 
          legal frameworks, and the evolving landscape of criminal investigation. Every module is 
          meticulously designed to include the latest advancements in forensic technology.
        </motion.p>

        <motion.p variants={fadeUp}>
          Participants will find a structured approach to complex topics. The inclusion of real-life 
          case studies provides a narrative backbone to the technical data, making it both an 
          educational powerhouse and an engaging learning experience.
        </motion.p>

        <motion.div 
          variants={fadeUp}
          className="p-4 bg-gray-50 rounded-xl border border-gray-100 italic text-gray-500 text-sm"
        >
          * This program is part of the SIFS India standard training series and matches 
          the requirements for professional certification in forensic sciences.
        </motion.div>
      </motion.div>
    </motion.div>
  );
}