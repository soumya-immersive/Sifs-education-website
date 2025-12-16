"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

// --- 1. TYPE DEFINITION ---
interface CardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  imageSrc: string;
}

// --- FIXED EASING (VALID FOR FRAMER MOTION v10+) ---
const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];

// --- Framer Motion Variants ---

// 1. Section container
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

// 2. Header Block
const headerVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
};

// 3. Cards Grid Container
const cardsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// 4. Individual Card animation
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutCubic },
  },
};

// --- 2. MAIN COMPONENT ---
const ForensicInsights: React.FC = () => {
  // Card component
  const Card: React.FC<CardProps> = ({
    title,
    description,
    date,
    author,
    imageSrc,
  }) => (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-[6B7385] transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      variants={cardVariants}
    >
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-green-500 opacity-20 mix-blend-multiply"></div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <span className="bg-[#EAF8FF] border border-[#00467A] text-black text-xs font-normal px-3 py-1.5 rounded-xs shadow-md">
          Tutorial
        </span>

        <h3 className="text-gray-900 text-xl font-bold mb-3 mt-3 leading-snug">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <hr />

        {/* Footer info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span>{date}</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span>{author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Data for cards
  const cardsData: CardProps[] = [
    {
      title: "Hands-on Facial Reconstruction Training Delhi, India",
      description:
        "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focu...",
      date: "2 DEC, 2025",
      author: "John Doe",
      imageSrc: "/forensic-insights1.png",
    },
    {
      title: "Hands-on Facial Reconstruction Training Delhi, India",
      description:
        "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focu...",
      date: "2 DEC, 2025",
      author: "John Doe",
      imageSrc: "/forensic-insights2.png",
    },
    {
      title: "Hands-on Facial Reconstruction Training Delhi, India",
      description:
        "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focu...",
      date: "2 DEC, 2025",
      author: "John Doe",
      imageSrc: "/forensic-insights3.png",
    },
  ];

  return (
    <div className="bg-white p-8 md:p-16">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.header
          className="flex flex-col items-start justify-between sm:flex-row sm:items-center mb-10"
          variants={headerVariants}
        >
          <div>
            <h1 className="text-black text-4xl font-bold mb-1">
              Forensic Insights
            </h1>
            <p className="text-gray-600 text-md">
              Decoding Crime Mysteries: Expand Your Knowledge and Explore the
              Latest Advancements
            </p>
          </div>

          <button className="mt-4 sm:mt-0 px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
            Explore
            <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
        </motion.header>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={cardsGridVariants}
        >
          {cardsData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForensicInsights;
