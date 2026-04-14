"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Course } from "../../types/courses-page";

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function CourseHighlights({ course }: Props) {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {/* Title */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-yellow-500 rounded-full" />
          Course Highlights
        </h3>
      </motion.div>

      {/* List */}
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={container}
      >
        {(course.highlights || []).map((item, index) => (
          <motion.li
            key={index}
            variants={fadeUp}
            className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-transparent hover:border-gray-200 transition-colors relative group"
          >
            <div className="mt-1 shrink-0">
              <Image
                src="/course/check-circle.png"
                alt=""
                width={18}
                height={18}
                className="opacity-80"
              />
            </div>
            <div className="text-sm text-gray-700 leading-snug flex-grow">
              <div dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
