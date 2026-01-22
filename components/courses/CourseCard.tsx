"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Course } from "../../data/courses";

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

/* ---------------- Component ---------------- */

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className="
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md transition p-4
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 rounded-t-xl overflow-hidden">
        <Image
          src={course.heroImage}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="py-4 py-0">
        <p className="text-xs text-[#D08522] font-medium mb-1">
          {course.courseCode}
        </p>

        <h3 className="font-medium text-black mb-2 leading-snug text-lg min-h-[3rem]">
          {course.title}
        </h3>

        <p className="text-sm text-[#6B7385] mb-4 line-clamp-2">
          {course.overview}
        </p>

        <motion.div variants={buttonVariants} whileHover="hover">
          <Link
            href={`/courses/${course.programSlug}/${course.slug}`}
            className="
              inline-block bg-gradient-to-r
              from-purple-500 to-indigo-600
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
