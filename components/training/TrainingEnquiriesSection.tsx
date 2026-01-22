"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

/* ---------------- Animations ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const internshipFaqs = [
  {
    question:
      "What is the core difference between the Lab-Based and Online Internship programs?",
    author: "Ananya Sharma",
    answer:
      "Our Lab-Based internships are immersive, on-site programs where you work directly with physical evidence and high-end laboratory equipment at our facility. The Online Internship focuses on digital forensics, case study analysis, and theoretical mastery through virtual simulations. Both tracks provide a verified certificate, but the Lab-Based track is recommended for those seeking hands-on experience with physical investigative tools.",
  },
  {
    question:
      "I am from a non-science background. Am I eligible to apply for a Forensic Internship?",
    author: "Rahul Varma",
    answer:
      "While most of our programs require a basic understanding of science or law, we have specific foundational internships (like Digital Forensics) that are open to students from various backgrounds. We evaluate each applicant based on their interest and prior certifications. Please mention your specific background in the enquiry form for a personalized eligibility check.",
  },
  {
    question:
      "Will I receive a stipend during my tenure, and does this internship count towards university credits?",
    author: "Megha Iyer",
    answer:
      "Stipends are performance-based and are typically discussed during the final interview stage. Regarding credits, SIFS India is a recognized forensic organization; we provide all necessary documentation and completion reports required by universities to validate your internship for academic credit.",
  },
];

export default function InternshipEnquiriesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      className="relative mb-12 px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Zigzag Divider */}
      <div className="absolute top-0 left-0 w-full">
        <Image
          src="/course/zigzag.png"
          alt="Divider"
          width={1920}
          height={60}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-10"
        >
          Enquiries from Prospective Interns
        </motion.h2>

        {/* FAQ List */}
        <motion.div variants={containerVariants} className="space-y-4 max-w-4xl mx-auto">
          {internshipFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div key={index} variants={itemVariants}>
                {/* Question Toggle */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-xl text-left transition-all duration-300 ${
                    isOpen
                      ? "bg-[#D08522] text-white shadow-lg translate-x-1"
                      : "bg-[#F7F7F7] text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-sm md:text-base font-medium pr-4">
                    {faq.question}{" "}
                    <span className={`text-xs block mt-1 opacity-80 ${isOpen ? 'text-white' : 'text-gray-500'}`}>
                      Asked by {faq.author}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 shrink-0" />
                  )}
                </button>

                {/* Answer Content */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-5 text-sm md:text-base text-gray-600 leading-relaxed bg-white border-x border-b border-gray-100 rounded-b-xl -mt-2 shadow-sm">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}