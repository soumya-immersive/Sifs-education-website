"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import { Internship } from "../../data/internships";

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
  internship: Internship;
}

export default function InternshipHero({ internship }: Props) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${
          internship.bannerImage || "/internship/hero-bg.png"
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
        {/* Internship Code Badge */}
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
          {internship.internshipCode}
        </motion.span>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 max-w-3xl"
        >
          {internship.title}
        </motion.h1>

        {/* Overview / Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-gray-700 text-sm md:text-base max-w-2xl leading-relaxed opacity-90"
        >
          {internship.overview}
        </motion.p>

        {/* Optional: Rating (Only if your data eventually supports it) */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 mt-4"
        >
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm text-gray-600">(4.8+ Ratings)</span>
        </motion.div> 
      </motion.div>
    </section>
  );
}