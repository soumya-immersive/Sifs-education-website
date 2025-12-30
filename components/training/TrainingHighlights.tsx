"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Training } from "../../data/trainings";

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

/* ---------------- Component ---------------- */

interface Props {
  training: Training;
}

export default function TrainingHighlights({ training }: Props) {
  return (
    <motion.div
      className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Bold Title - Matching your Hero and Schedule style */}
      <motion.h3
        variants={fadeUp}
        className="text-xl font-black text-[#4559ED] mb-6 uppercase tracking-tight"
      >
        Training Highlights:
      </motion.h3>

      {/* List - Dynamically mapped from training.highlights */}
      <motion.ul
        className="space-y-4 text-sm text-gray-600"
        variants={container}
      >
        {training.highlights?.map((item, index) => (
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
            <span className="text-gray-700 font-medium leading-relaxed">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}