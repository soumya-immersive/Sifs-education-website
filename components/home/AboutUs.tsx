// components/home/AboutUs.tsx
"use client";

import { motion } from "framer-motion";

// --- Framer Motion Variants ---

// 1. Image Container (Slide In From Left)
const imageContainerVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" as const,
    } 
  },
};

// 2. Text Content Block (Slide In From Right - Stagger Parent)
const textContainerVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.8,
      ease: "easeOut" as const,
      staggerChildren: 0.05,
    }
  }
};

// 3. Simple Fade In for Text elements
const textItemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.4, ease: "easeOut" as const } 
  }
};

// 4. Staggered Fade In for Checklist Items
const checklistItemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, ease: "easeOut" as const } 
  }
};


export default function AboutUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 lg:flex-row lg:items-start lg:gap-16">

        {/* Left: Image + Badge */}
        <motion.div 
          className="relative w-full max-w-md"
          initial="hidden"
          whileInView="visible"
          variants={imageContainerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden rounded-[120px]">
            <img
              src="/home-about.png"
              alt="Students learning online"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Experience Badge */}
          <div className="absolute left-20 bottom-21 flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 px-6 py-4 text-white shadow-xl">
            <div className="text-3xl font-bold leading-none">19+</div>
            <div className="border-l border-[#5D1FBF] ml-3 pl-3 text-xs font-medium leading-tight uppercase tracking-wide">
              <div>Year of</div>
              <div>Experience</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div 
          className="w-full max-w-xl"
          initial="hidden"
          whileInView="visible"
          variants={textContainerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Pill button */}
          <motion.button 
            className="mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]"
            variants={textItemVariants}
          >
            About Us
          </motion.button>

          {/* Heading */}
          <motion.h2 
            className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl"
            variants={textItemVariants}
          >
            Learn Anywhere, Any Time
          </motion.h2>

          {/* Paragraph */}
          <motion.p 
            className="mb-6 text-md text-[#6B7385]"
            variants={textItemVariants}
          >
            Online learning is one of the most flexible ways to gain knowledge,
            irrespective of location, travel, schedule, and accommodation
            constraints. You can opt for a flexible study routine that fits your
            everyday schedule when you learn online.
          </motion.p>

          {/* Sub-headline */}
          <motion.h3 
            className="mb-3 text-lg font-normal text-gray-900"
            variants={textItemVariants}
          >
            Student Zone
          </motion.h3>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 sm:grid-cols-2">

            {/* List 1 */}
            <motion.ul 
              className="space-y-2"
              initial="hidden"
              whileInView="visible"
              variants={textContainerVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.li className="flex items-center font-normal text-gray-900" variants={checklistItemVariants}>
                <span className="mr-2 text-green-500">✓</span> Admission Letter
              </motion.li>
              <motion.li className="flex items-center font-normal text-gray-900" variants={checklistItemVariants}>
                <span className="mr-2 text-green-500">✓</span> ID Card
              </motion.li>
              <motion.li className="flex items-center font-normal text-gray-900" variants={checklistItemVariants}>
                <span className="mr-2 text-green-500">✓</span> Study Materials
              </motion.li>
            </motion.ul>

            {/* List 2 */}
            <motion.ul 
              className="space-y-2"
              initial="hidden"
              whileInView="visible"
              variants={textContainerVariants}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.li className="flex items-center font-normal text-gray-900" variants={checklistItemVariants}>
                <span className="mr-2 text-green-500">✓</span> Completion Letter
              </motion.li>
              <motion.li className="flex items-center font-normal text-gray-900" variants={checklistItemVariants}>
                <span className="mr-2 text-green-500">✓</span> Certificate of Achievement
              </motion.li>
              <motion.li className="flex items-center font-normal text-gray-900" variants={checklistItemVariants}>
                <span className="mr-2 text-green-500">✓</span> Statement of Mark
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
