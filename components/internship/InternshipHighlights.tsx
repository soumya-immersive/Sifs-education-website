"use client";

import Image from "next/image";
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function InternshipHighlights({ internship }: Props) {
  // Use dynamic highlights from the data, or fallback to default internship highlights
  const highlightList = internship.highlights || [
    "Practical hands-on training with real-world case studies",
    "Expert mentorship from seasoned forensic professionals",
    "Comprehensive study modules and research resources",
    "Interactive doubt-clearing sessions and group discussions",
    "Professional networking within the forensic science community",
    "Official certification recognized by industry experts",
  ];

  return (
    <motion.div
      className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Title */}
      <motion.h3
        variants={fadeUp}
        className="text-lg font-bold text-[#4559ED] mb-6"
      >
        Internship Highlights:
      </motion.h3>

      {/* List */}
      <motion.ul
        className="space-y-4 text-sm text-gray-600"
        variants={container}
      >
        {highlightList.map((item, index) => (
          <motion.li
            key={index}
            variants={fadeUp}
            className="flex items-start gap-3"
          >
            <Image
              src="/course/check-circle.png" 
              alt="check"
              width={18}
              height={18}
              className="mt-0.5 shrink-0"
            />
            <span className="leading-relaxed font-medium text-gray-700">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}