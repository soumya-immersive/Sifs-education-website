"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import { Course } from "../../data/courses";

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

interface Props {
  course: Course;
}

export default function CourseHero({ course }: Props) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${course.bannerImage || "/course/hero-bg.png"
          })`,
      }}
    >
      <motion.div
        className="relative max-w-7xl mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Course Code */}
        <motion.span
          variants={fadeUp}
          className="
            inline-block
            bg-[#FFE9CC] text-[#D97706]
            text-xs font-semibold
            px-3 py-1 rounded-full
            mb-3
          "
        >
          {course.courseCode}
        </motion.span>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 max-w-3xl"
        >
          {course.title}
        </motion.h1>

        {/* Rating */}
        {/* <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 mb-4"
        >
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(course.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>

          <span className="text-sm text-gray-600">
            ({course.reviewsCount}+ Ratings)
          </span>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
