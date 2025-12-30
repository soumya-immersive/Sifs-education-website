"use client";

import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const trainingImage = "/training/training-pointing.png";

/* ---------------- Framer Motion Easing ---------------- */
const easeOutCubic: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

/* ---------------- Variants ---------------- */

const bannerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const textBlockVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOutCubic,
    },
  },
};

const imageBlockVariants: Variants = {
  hidden: { x: 100, opacity: 0, scale: 0.95 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: easeOutCubic,
    },
  },
};

const buttonItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOutCubic,
    },
  },
};

export default function TrainingLearning() {
  return (
    <div className="max-w-7xl mx-auto p-4 mb-30 pt-12">
      <motion.div
        className="
          relative bg-blue-600 rounded-xl shadow-2xl
          p-6 md:p-10 lg:p-12
          flex flex-col lg:flex-row
          items-center justify-between
          text-white
        "
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(135deg, rgba(255,255,255,0.05), transparent)",
          backgroundSize: "30px 30px, 30px 30px, 100% 100%",
        }}
        variants={bannerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* LEFT CONTENT */}
        <motion.div
          className="lg:w-3/5 z-10 text-left mb-8 lg:mb-0"
          variants={textBlockVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advance Your Skills with Professional Training
          </h2>

          <p className="text-sm md:text-base opacity-90 mb-8 max-w-xl">
            Our training programs are designed for students, professionals, and
            organizations. Gain hands-on exposure, expert guidance, and
            industry-relevant skills through structured learning modules.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Explore Training Button */}
            <motion.button
              variants={buttonItemVariants}
              className="
                flex items-center justify-center
                bg-blue-800 hover:bg-blue-900
                text-white font-semibold
                py-3 px-6 rounded-lg
                transition duration-300
              "
            >
              Explore Training Programs
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>

            {/* Training Guide Button */}
            <motion.button
              variants={buttonItemVariants}
              className="
                flex items-center justify-center
                border-2 border-white
                hover:bg-white hover:text-blue-600
                text-white font-semibold
                py-3 px-6 rounded-lg
                transition duration-300
              "
            >
              Training Guide
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="
            relative w-full lg:w-2/5 h-64 lg:h-auto
            lg:absolute lg:right-0 lg:bottom-0
            flex justify-center lg:justify-end
            mt-4 lg:mt-0
          "
          variants={imageBlockVariants}
        >
          <img
            src={trainingImage}
            alt="Training professional pointing to programs"
            className="h-full w-auto object-cover z-20"
            style={{
              maxHeight: "100%",
              maxWidth: "none",
              objectPosition: "center bottom",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
