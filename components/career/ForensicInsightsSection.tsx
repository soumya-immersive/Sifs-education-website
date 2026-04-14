import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CareerInsightsData } from "@/types/career-page";

// --- 1. TYPE DEFINITION ---
interface ForensicInsightsProps {
  data: CareerInsightsData;
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
const ForensicInsights: React.FC<ForensicInsightsProps> = ({ data }) => {
  return (
    <div className="bg-white py-8 px-0 md:py-16 md:px-0 mt-2 ">
      <motion.div
        className="mx-auto max-w-7xl px-4"
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
          <div className="flex-1">
            <h2 className="text-black text-4xl font-bold mb-1">
              <div dangerouslySetInnerHTML={{ __html: data.heading }} />
            </h2>
            <div className="text-gray-600 text-md">
              <div dangerouslySetInnerHTML={{ __html: data.subheading }} />
            </div>
          </div>

          <button className="mt-4 sm:mt-0 px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC]">
            <span dangerouslySetInnerHTML={{ __html: data.exploreButtonLabel || "Explore" }} />
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={cardsGridVariants}
        >
          <AnimatePresence mode="popLayout">
            {data.cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl overflow-hidden border border-[6B7385] transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative group"
                variants={cardVariants}
              >

                {/* Image */}
                <div className="relative h-56 w-full">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-500 opacity-20 mix-blend-multiply pointer-events-none"></div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <span className="bg-[#EAF8FF] border border-[#00467A] text-black text-xs font-normal px-3 py-1.5 rounded-xs shadow-md inline-block">
                    <div dangerouslySetInnerHTML={{ __html: card.tag }} />
                  </span>

                  <h3 className="text-gray-900 text-xl font-bold mb-3 mt-3 leading-snug">
                    <div dangerouslySetInnerHTML={{ __html: card.title }} />
                  </h3>

                  <div className="text-gray-500 text-sm mb-3 line-clamp-2">
                    <div dangerouslySetInnerHTML={{ __html: card.description }} />
                  </div>

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
                      <span>
                        <div dangerouslySetInnerHTML={{ __html: card.date }} />
                      </span>
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
                      <span>
                        <div dangerouslySetInnerHTML={{ __html: card.author }} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForensicInsights;

