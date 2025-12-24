"use client";

import { motion, Variants } from "framer-motion";

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CoursesHero() {
  return (
    <section
      className="relative py-16
        bg-[url('/courses/hero-bg.png')]
        bg-cover bg-center bg-no-repeat
        overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left */}
        <motion.div variants={container}>
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-bold text-gray-900"
          >
            Courses
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-sm text-gray-600 mt-1"
          >
            Associate Degree Program
          </motion.p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          variants={scaleFade}
          className="w-full md:w-[400px] h-[200px] rounded-xl overflow-hidden"
        >
          <img
            src="/courses/hero.png"
            alt="Courses"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
