"use client";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function InternshipInfo({ internship }: Props) {
  return (
    <motion.div
      className="bg-white relative mt-10"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Decorative lines */}
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
          Internship Info
        </h2>

        <div className="text-xs text-gray-500 text-right">
          <span className="ml-2 block font-semibold text-md text-black">
            Upcoming Batch: Jan 2026
          </span>
          <span className="text-xs font-normal text-black block">
            Application Deadline: 31st Dec 2025
          </span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed"
        variants={container}
      >
        <motion.p variants={fadeUp}>
          The <span className="font-semibold text-gray-800">{internship.title}</span> program 
          offered by SIFS India is designed for aspiring professionals looking to gain 
          practical, industry-standard experience in the specialized field of forensic science.
        </motion.p>

        <motion.p variants={fadeUp}>
          During this internship, you will move beyond theoretical concepts to understand 
          the real-world application of investigative techniques. You will work alongside 
          experts to learn how evidence is identified, gathered, and analyzed using 
          cutting-edge forensic methodology.
        </motion.p>

        <motion.p variants={fadeUp}>
          Our training modules—whether <span className="italic">{internship.programSlug.replace("-", " ")}</span>—are 
          structured to provide a balance of mentorship and independent task execution. 
          You will be exposed to real-life case studies and simulation exercises that 
          prepare you for the rigorous demands of a career in criminal investigation.
        </motion.p>

        <motion.p variants={fadeUp}>
          Key areas of focus include {internship.overview.toLowerCase()} alongside 
          comprehensive modules on crime scene management, digital evidence recovery, 
          and the legal aspects of forensic findings. This program is an ideal stepping 
          stone for those who want to build a formidable portfolio in the justice system.
        </motion.p>

        <motion.p variants={fadeUp}>
          By the end of this tenure, you will have developed a specialized skill set 
          ranging from fingerprint analysis and questioned document examination to 
          advanced cyber-forensic protocols, depending on your chosen stream.
        </motion.p>

        <motion.p variants={fadeUp} className="font-medium text-blue-700">
          If you are ready to apply your scientific passion to the pursuit of justice, 
          this internship is the perfect beginning for your professional forensic journey.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}