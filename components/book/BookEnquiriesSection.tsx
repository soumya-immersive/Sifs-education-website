"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";

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
    question: "Do I get immediate access to the E-Book version after purchasing the Hardcover?",
    author: "Sarah Jenkins",
    answer:
      "Yes! Our 'Bundle & Read' policy ensures that any physical book purchase includes an immediate download link for the E-Book version (PDF and EPUB formats). You will receive an email with the access credentials as soon as your payment is processed.",
  },
  {
    question: "What is your return policy for damaged books or printing errors?",
    author: "Michael Chen",
    answer: "We take pride in our quality control, but if you receive a book with missing pages or shipping damage, we offer a 14-day hassle-free replacement. Simply upload a photo via our support portal and we will ship a new copy at no extra cost.",
  },
  {
    question: "Are there additional study materials or digital resources included with the ISBN?",
    author: "David Miller",
    answer: "Many of our technical and academic titles come with a unique 'Access Code' printed on the inside back cover. This code grants you entry to our online resource center, featuring high-resolution diagrams, practice quizzes, and downloadable datasets.",
  },
];

export default function EnquiriesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      className="relative px-4 py-16 mb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative Top Divider */}
      <div className="absolute top-0 left-0 w-full rotate-180 opacity-30 pointer-events-none">
        <Image
          src="/book/zigzag.png" 
          alt="Divider"
          width={1920}
          height={60}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
             <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Reader Enquiries
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
            Find answers to common questions regarding our forensic publications and distribution.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div variants={containerVariants} className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`group border rounded-2xl transition-all duration-300 ${
                  isOpen ? 'border-blue-200 shadow-md shadow-blue-50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                {/* Question Toggle */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl text-left transition-all ${
                    isOpen
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <div className="text-sm md:text-base font-semibold pr-4 leading-tight">
                    {faq.question}
                    <span className={`block text-[10px] mt-1 uppercase tracking-wider ${
                      isOpen ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      Asked by {faq.author}
                    </span>
                  </div>

                  <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-blue-500' : 'bg-gray-50'}`}>
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-white shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </div>
                </button>

                {/* Animated Answer Section */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 text-sm md:text-base text-gray-600 leading-relaxed border-t border-blue-50 bg-gradient-to-b from-blue-50/50 to-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}