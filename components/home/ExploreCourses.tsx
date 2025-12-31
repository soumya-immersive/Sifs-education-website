// components/ForensicScienceBanner.tsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

const studentImage = "/student-pointing.png";

// --- Framer Motion Easing ---
// Same as easeOut
const easeOutCubic: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// --- Variants ---

const bannerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const textBlockVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOutCubic, // ✔ FIXED
    },
  },
};

const imageBlockVariants: Variants = {
  hidden: { x: 100, opacity: 0, scale: 0.95 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: easeOutCubic, // ✔ FIXED
    },
  },
};

const buttonItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOutCubic, // ✔ FIXED
    },
  },
};

const ForensicScienceBanner = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push("/about");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mb-12 pt-12">
      <motion.div
        className="relative overflow-hidden bg-blue-600 rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 
                   flex flex-col lg:flex-row items-center justify-between text-white"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(135deg, rgba(255,255,255,0.05), transparent)",
          backgroundSize: "30px 30px, 30px 30px, 100% 100%",
        }}
        initial="hidden"
        whileInView="visible"
        variants={bannerContainerVariants}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Left Content */}
        <motion.div
          className="lg:w-3/5 z-10 text-left mb-8 lg:mb-0"
          variants={textBlockVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Forensic Science Institute
          </h2>

          <p className="text-sm md:text-base opacity-90 mb-8 max-w-xl">
            The Sherlock Institute of Forensic Science (SIFS) India was set up
            in 2006 with the mission to make forensic education available to all
            and with a vision to make India a crime-free place to live by
            creating a skilled workforce of forensic experts to assist law
            enforcement agencies and the judiciary in bringing justice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Explore Button */}
            <motion.button
              className="flex items-center justify-center bg-blue-800 hover:bg-blue-900 
                         text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              variants={buttonItemVariants}
              onClick={handleExploreClick}
            >
              Explore
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>

            {/* Watch Video Button */}
            <motion.button
              className="flex items-center justify-center border-2 border-white hover:bg-white hover:text-blue-600 
                         text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              variants={buttonItemVariants}
            >
              Watch Video
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative w-full lg:w-2/5 h-64 lg:h-auto lg:absolute lg:right-0 lg:bottom-0 
                      flex justify-center lg:justify-end mt-4 lg:mt-0"
          variants={imageBlockVariants}
        >
          <img
            src={studentImage}
            alt="Smiling student pointing"
            className="h-full w-auto object-cover lg:max-h-full lg:w-auto z-20"
            style={{ maxHeight: "100%", maxWidth: "none", objectPosition: "center bottom" }}
          />

          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-blue-600 to-transparent z-30 hidden lg:block" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForensicScienceBanner;
