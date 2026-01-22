"use client";

import { motion, Variants } from "framer-motion";
import { Training } from "@/data/trainings";

interface Props {
  training: Training;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function TrainingInfo({ training }: Props) {
  return (
    <motion.div
      className="bg-white relative mt-10"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Decorative element */}
      <motion.div
        variants={fadeUp}
        className="absolute -top-2 -left-2 w-12 h-12 bg-[url('/course/lines.svg')] bg-contain bg-no-repeat"
      />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Training Overview
        </h2>

        <div className="text-xs text-gray-500 text-right">
          <span className="ml-2 block font-semibold text-md text-black">
            Upcoming Batch: Jan 2026
          </span>
          <span className="text-xs font-normal text-black block">
            Enrollment Deadline: 31st Dec 2025
          </span>
        </div>
      </motion.div>

      {/* Content */}
      {/* Content */}
      <motion.div
        className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed"
        variants={container}
      >
        {training.trainingOutline ? (
          <div
            className="prose prose-sm md:prose-base max-w-none text-gray-600 space-y-4"
            dangerouslySetInnerHTML={{ __html: training.trainingOutline }}
          />
        ) : (
          <>
            <motion.p variants={fadeUp}>
              The{" "}
              <span className="font-semibold text-gray-800">
                {training.title}
              </span>{" "}
              training program is designed to equip professionals and students with
              practical, industry-aligned expertise in modern forensic and
              investigative techniques.
            </motion.p>

            <motion.p variants={fadeUp}>
              This training goes beyond theoretical knowledge and focuses on
              real-world application. Participants gain hands-on exposure to tools,
              workflows, and methodologies used by professionals in active
              investigations.
            </motion.p>

            <motion.p variants={fadeUp}>
              Core learning areas include{" "}
              {training.overview.toLowerCase()}, along with structured modules on
              evidence handling, reporting standards, compliance protocols, and
              analytical best practices.
            </motion.p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
