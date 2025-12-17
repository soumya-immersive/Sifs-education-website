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

const faqs = [
  {
    question:
      "What are the differences between Level 1, Level 2, and Level 3 courses, and how do they stand apart from each other?",
    author: "Haszel Williams",
    answer:
      "The course curriculum is designed according to the difficulty level and duration needed to complete it. Level 1 is a foundational course lasting 3 months and requires at least a 12th grade education. Level 2 is more advanced, with a 6-month duration, building on Level 1, and also requires a 12th grade qualification. Level 3 is the most advanced, combining content from Levels 1 and 2 with additional topics, and requires a graduation degree. Also, if you have some previous knowledge about this field and are a graduate, you can contact our support team to check your eligibility to directly enroll in Level 3.",
  },
  {
    question:
      "I have no previous experience in forensics. Can I enroll in this course, or do I need to possess a basic understanding of the field?",
    author: "Kevin Johnson",
  },
  {
    question:
      "Can you brief me about the kinds of topics that will be covered in this course? Are real-world case studies also included?",
    author: "Prasath Narayan",
  },
];

export default function EnquiriesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      className="relative mb-12 px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Zigzag */}
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
          className="text-xl md:text-2xl font-semibold text-black text-center mb-8"
        >
          Enquiries from Forensic Learners
        </motion.h2>

        {/* FAQ List */}
        <motion.div variants={containerVariants} className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div key={index} variants={itemVariants}>
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-lg text-left transition ${
                    isOpen
                      ? "bg-[#D08522] text-white"
                      : "bg-[#F0F0F0] text-gray-700"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {faq.question}{" "}
                    <span className="font-semibold">
                      - {faq.author}
                    </span>
                  </div>

                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 shrink-0" />
                  )}
                </button>

                {/* Answer */}
                {isOpen && faq.answer && (
                  <div className="px-5 pt-4 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
