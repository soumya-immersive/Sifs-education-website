"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

/* ---------------- Animations ---------------- */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const buttonVariants: Variants = {
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function CourseCard({ course }: any) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className="
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md
        transition
      "
    >
      {/* IMAGE */}
      <div className="h-44 rounded-t-xl overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <p className="text-xs text-[#D08522] font-medium mb-1">
          {course.code}
        </p>

        <h3 className="font-medium text-black mb-2 leading-snug text-lg min-h-12">
          {course.title}
        </h3>

        <p className="text-sm text-[#6B7385] mb-4 min-h-10">
          {course.description}
        </p>

        <motion.div variants={buttonVariants} whileHover="hover">
          <Link
            href={`/courses/${course.slug}`}
            className="
              cursor-pointer inline-block
              bg-gradient-to-r from-purple-500 to-indigo-600
              text-white px-8 py-3 rounded-lg
              text-sm font-medium
            "
          >
            Enroll Now →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
