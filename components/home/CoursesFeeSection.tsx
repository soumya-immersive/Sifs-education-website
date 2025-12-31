"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Tabs
const tabs = [
  "Associate Degree Program",
  "Foundation Courses",
  "Professional Courses",
  "Values Added Courses",
  "Training and Internship",
];

// Data Mapping
const pricingData: Record<string, { id: number; label: string; price: string }[]> = {
  "Associate Degree Program": [
    { id: 1, label: "Level - I", price: "₹ 11,800" },
    { id: 2, label: "Level - II", price: "₹ 17,700" },
    { id: 3, label: "Level - III", price: "₹ 23,600" },
  ],
  "Foundation Courses": [
    { id: 4, label: "Course Fee", price: "₹ 1,770" },
  ],
  "Professional Courses": [
    { id: 5, label: "Course Fee", price: "₹ 23,600" },
  ],
  "Values Added Courses": [
    { id: 6, label: "UGC NET Program", price: "₹ 2,950" },
    { id: 7, label: "Certification Fee", price: "₹ 4,399" },
    { id: 8, label: "Certification Fee", price: "₹ 7,999" },
  ],
  "Training and Internship": [
    { id: 9, label: "One Month", price: "₹ 5,900" },
    { id: 10, label: "Three Months", price: "₹ 17,700" },
    { id: 11, label: "Six Months", price: "₹ 35,400" },
  ],
};

// --- Framer Motion Variants ---

const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.15 },
  },
};

const itemSlideUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as any },
  },
};

const cardsGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
};

export default function CoursePricing() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  // Track active ID instead of index to maintain highlight state across tabs
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  const currentLevels = pricingData[activeTab];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fbfcff] relative bg-[url('/fee-structure/bg.png')] bg-cover bg-center bg-no-repeat">
      <motion.div
        className="max-w-6xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div variants={itemSlideUpVariants}>
          <h2 className="text-2xl font-semibold text-black">
            Courses &{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Training Fee</span>
              <Image
                src="/yellow-underline.png"
                alt=""
                width={180}
                height={16}
                className="absolute left-0 -bottom-2 z-0"
              />
            </span>
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
            Invest in Your Knowledge: Discover the Right Courses and Training Fees That Fit You
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.nav
          className="flex flex-wrap justify-center gap-6 mt-10"
          variants={itemSlideUpVariants}
        >
          {tabs.map((t) => {
            const active = t === activeTab;
            return (
              <button
                key={t}
                onClick={() => {
                  setActiveTab(t);
                  setActiveLevel(null); // Reset selection when switching tabs
                }}
                className={`relative px-1 pb-2 text-sm font-semibold transition-colors cursor-pointer ${
                  active ? "text-purple-600" : "text-gray-600 hover:text-purple-500"
                }`}
              >
                <span>{t}</span>
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 transition-all ${
                    active ? "bg-purple-600 scale-x-100" : "bg-transparent scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </motion.nav>

        {/* Cards Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={`grid gap-8 mt-14 ${
              currentLevels.length === 1 
                ? "flex justify-center" 
                : "grid-cols-1 sm:grid-cols-3"
            }`}
            variants={cardsGridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {currentLevels.map((l) => {
              const isActive = activeLevel === l.id || (activeLevel === null && currentLevels.indexOf(l) === 1);

              return (
                <motion.div
                  key={l.id}
                  className="relative flex justify-center w-full max-w-md mx-auto"
                  variants={cardVariants}
                >
                  <article
                    onClick={() => setActiveLevel(l.id)}
                    className={`w-full rounded-2xl px-12 pt-8 pb-16 relative cursor-pointer transform transition-all duration-300
                      ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white shadow-2xl scale-[1.03]"
                          : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 shadow-md hover:shadow-lg"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-left">
                        <p className={`font-semibold ${isActive ? "text-white" : "text-gray-800"}`}>
                          {l.label}
                        </p>
                        <h3
                          className={`mt-2 text-2xl font-extrabold ${
                            isActive ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {l.price}
                        </h3>
                      </div>

                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md shrink-0
                          ${
                            isActive
                              ? "bg-white text-purple-600"
                              : "bg-purple-50 text-purple-600"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2L2 7l10 5 10-5-10-5zm0 7.2L6.1 7 12 4.1 17.9 7 12 9.2zM4 10.1v5.6c0 1.2.7 2.3 1.8 2.8L12 21l6.2-2.5c1.1-.45 1.8-1.6 1.8-2.8v-5.6L12 15l-8-4.9z"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>

                  <button
                    onClick={() => setActiveLevel(l.id)}
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-5 px-6 py-2 rounded-lg text-sm font-semibold shadow-md z-10 transition-all cursor-pointer
                      ${
                        isActive
                          ? "bg-white text-purple-600"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                  >
                    Visit List →
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pill */}
        <motion.div className="mt-24 mb-12 relative" variants={itemSlideUpVariants}>
          <span className="inline-block px-6 py-3 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm shadow-sm absolute left-1/2 -translate-x-1/2 bottom-0 whitespace-nowrap">
            All Courses Available On This Affordable Fee
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}