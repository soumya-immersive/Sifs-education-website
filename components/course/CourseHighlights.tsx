"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

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

export default function CourseHighlights() {
  return (
    <motion.div
      className="bg-white"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Title */}
      <motion.h3
        variants={fadeUp}
        className="text-md font-medium text-[#4559ED] mb-4"
      >
        Course Highlights:
      </motion.h3>

      {/* List */}
      <motion.ul
        className="space-y-3 text-sm text-gray-600"
        variants={container}
      >
        {[
          "Pre-recorded sessions with practical insights about forensic tools and technologies",
          "Experienced mentors with years of real-world experience",
          "In-depth study of various forensic domains",
          "Industry-specific and comprehensive study material and reference books",
          "Networking opportunities with professionals and fellow enthusiasts",
          "Skill development to critically analyze evidence, make accurate conclusions, and present findings effectively",
        ].map((item, index) => (
          <motion.li
            key={index}
            variants={fadeUp}
            className="flex items-start gap-3"
          >
            <Image
              src="/course/check-circle.png"
              alt=""
              width={16}
              height={16}
              className="mt-0.5 shrink-0"
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
