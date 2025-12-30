"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import { Training } from "../../data/trainings";

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
  training: Training;
}

export default function TrainingHero({ training }: Props) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${
          training.heroImage || "/training/hero-bg.png"
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
        {/* Training Code Badge */}
        <motion.span
          variants={fadeUp}
          className="
            inline-block
            bg-[#E0ECFF] text-[#2563EB]
            text-xs font-semibold
            px-3 py-1 rounded-full
            mb-3
          "
        >
          {training.trainingCode}
        </motion.span>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 max-w-3xl"
        >
          {training.title}
        </motion.h1>

        {/* Overview */}
        <motion.p
          variants={fadeUp}
          className="text-gray-700 text-sm md:text-base max-w-2xl leading-relaxed opacity-90"
        >
          {training.overview}
        </motion.p>

        {/* Rating (Optional UI – static for now) */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 mt-4"
        >
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm text-gray-600">(4.7+ Ratings)</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
