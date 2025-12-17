"use client";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function CourseInfo() {
  return (
    <motion.div
      className="bg-white relative mt-10"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Decorative lines (top-left like screenshot) */}
      <motion.div
        variants={fadeUp}
        className="absolute -top-2 -left-2 w-12 h-12 bg-[url('/course/lines.svg')] bg-contain bg-no-repeat"
      />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between mb-4"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Course Info
        </h2>

        <div className="text-xs text-gray-500 text-right">
          <span className="ml-2 block font-semiBold text-md text-black">
            Dec Batch 2025
          </span>
          <span className="text-xs font-normal text-black block">
            Last Date to Register : 25th Dec 2025
          </span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="space-y-3 text-sm text-gray-600 leading-relaxed"
        variants={container}
      >
        <motion.p variants={fadeUp}>
          The Forensic Science & Criminal Investigation Online Course offered by
          SIFS India is perfect for students looking to gain an in-depth
          understanding of forensic science as a whole.
        </motion.p>

        <motion.p variants={fadeUp}>
          You will learn the science behind solving crimes, the techniques used by
          expert investigators to identify, gather, preserve, and analyze
          evidence, and gain valuable knowledge and skills to excel in this
          field.
        </motion.p>

        <motion.p variants={fadeUp}>
          All the pre-recorded sessions are delivered by subject matter experts
          and are loaded with real-life case studies, preparing you to face
          real-world challenges in forensic investigations.
        </motion.p>

        <motion.p variants={fadeUp}>
          Associate Degree Program comprises of three levels: Level 1
          (certificate), Level 2 (diploma), and Level 3 (Post Graduate Diploma),
          and the entire curriculum is divided among these levels.
        </motion.p>

        <motion.p variants={fadeUp}>
          A few of the topics you will learn about include forensic science
          fundamentals, crime scene investigation, cyber crimes, fingerprint and
          questioned document examination, wildlife forensics, drug and alcohol
          abuse, investigation across cases, crime investigation techniques, the
          role of forensic dentistry, sexual offenses, the role of insects in
          forensics, forensic facial reconstruction, disaster victim
          identification, forensic psychology, the significance of serological
          evidence, photographing crime scenes, forensic ballistics, forensic
          physics, and using toxicological findings for legal purposes.
        </motion.p>

        <motion.p variants={fadeUp}>
          So if you are passionate about solving mysteries and looking for a
          career that combines science with justice, join this course and begin
          your forensic journey.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
