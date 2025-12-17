"use client";

import { Star } from "lucide-react";
import { motion, Variants } from "framer-motion";

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

export default function CourseHero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24 overflow-hidden"
      style={{ backgroundImage: "url('/course/hero-bg.png')" }}
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
          FSP 101
        </motion.span>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 max-w-3xl"
        >
          Forensic Science and Criminal Investigation
        </motion.h1>

        {/* Rating */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 mb-4"
        >
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            (150+ Ratings)
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
