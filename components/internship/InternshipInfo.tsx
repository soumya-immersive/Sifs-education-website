"use client";

import { motion, Variants } from "framer-motion";
import { Internship } from "../../data/internships";

interface Props {
  internship: Internship;
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

export default function InternshipInfo({ internship }: Props) {
  return (
    <motion.div
      className="bg-white relative mt-10"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Decorative lines */}
      <motion.div
        variants={fadeUp}
        className="absolute -top-2 -left-2 w-12 h-12 bg-[url('/course/lines.svg')] bg-contain bg-no-repeat"
      />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Internship Info
        </h2>

        <div className="text-xs text-gray-500 text-right">
          <span className="ml-2 block font-semibold text-md text-black">
            Upcoming Batch: Jan 2026
          </span>
          <span className="text-xs font-normal text-black block">
            Application Deadline: 31st Dec 2025
          </span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed"
        variants={container}
      >
        {internship.description ? (
          <div dangerouslySetInnerHTML={{ __html: internship.description }} className="prose prose-sm max-w-none text-gray-600 space-y-4" />
        ) : (
          <motion.div variants={fadeUp}>
            <p className="text-gray-700 leading-relaxed">
              {internship.overview || "Join the forensic internship to gain practical skills."}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}