// components/events/Participatory.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ParticipatoryData } from "../../types/events-page";

// --------------------
//     VARIANTS FIXED
// --------------------

// Main container (stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

// Logo animation
const logoItemVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
};

// Text fade-up
const textItemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

interface ParticipatoryProps {
  data: ParticipatoryData;
}

export default function Participatory({
  data,
}: ParticipatoryProps) {

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Bottom layers */}
          <div className="absolute inset-x-4 -bottom-5 h-5 rounded-2xl bg-white/80 shadow-md" />
          <div className="absolute inset-x-8 -bottom-10 h-5 rounded-2xl bg-white/60 shadow-sm" />

          {/* Main card */}
          <div className="relative rounded-3xl bg-white px-6 py-10 shadow-xl md:px-10">
            <div className="text-center">
              <motion.h2
                className="text-2xl font-extrabold text-gray-900 md:text-3xl"
                variants={textItemVariants}
              >
                <div dangerouslySetInnerHTML={{ __html: data.title }} />
              </motion.h2>

              <motion.div
                className="mt-2 text-sm text-gray-500 md:text-base"
                variants={textItemVariants}
              >
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </motion.div>
            </div>

            {/* Logos */}
            <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-4">
              {data.partners.map((partner, index) => (
                <motion.div
                  key={partner.name + index}
                  className="group relative flex h-16 w-28 items-center justify-center md:h-32 md:w-40"
                  variants={logoItemVariants}
                  initial="visible"
                  animate="visible"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
