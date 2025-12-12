// components/home/Banner.tsx
"use client";

import Image from 'next/image';
import { Sparkles, CheckCircle, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Framer Motion Variants ---

// Parent container for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    }
  }
};

// Slide-up animation for headers/text/buttons
const slideUpItem = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

// Floating stat box animation (takes delay)
const statItem = (delay: number) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, delay, ease: "easeOut" as const }
  }
});

// Main image scale-in animation
const imageVariant = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.3 }
  }
};

export default function Banner() {
  return (
    <>
      <div className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">

        {/* Background */}
        <div className="absolute inset-0 bg-white opacity-70"></div>
        <div
          className="absolute inset-0 z-0 opacity-80"
          style={{
            backgroundImage: 'url(/banner-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute bottom-0 right-0 z-0 h-96 w-96 rounded-full bg-indigo-50 opacity-50 blur-3xl"></div>

        {/* Main Content with Scroll Trigger */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.4 }}
        >

          {/* Left Side */}
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">

            <motion.h1
              className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900"
              variants={slideUpItem}
            >
              We Believe in <span className="text-indigo-600">Innovation</span> &{" "}
              <span className="text-indigo-600">Development</span>
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0"
              variants={slideUpItem}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
              Velit officia consequat.
            </motion.p>

            <motion.div
              className="mt-8 flex justify-center lg:justify-start space-x-4"
              variants={slideUpItem}
            >
              {/* Explore CTA */}
              <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-lg">
                Explore
                <svg className="ml-2 w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>

              {/* Apply Now CTA */}
              <button className="flex items-center text-indigo-600 border border-indigo-300 hover:bg-indigo-50 font-medium py-3 px-8 rounded-lg transition-colors">
                Apply Now
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </motion.div>

            {/* Zigzag */}
            <motion.div className="mt-8" variants={slideUpItem}>
              <svg width="60" height="20" viewBox="0 0 60 20">
                <path d="M2 18C12 8 20 8 30 18C40 8 48 8 58 18" stroke="#D3D3E9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end">

            {/* Main Image */}
            <motion.div
              className="relative w-80 h-80 md:w-[450px] md:h-[450px] transform rotate-45 overflow-hidden rounded-3xl shadow-2xl"
              initial="hidden"
              whileInView="visible"
              variants={imageVariant}
              viewport={{ once: true, amount: 0.4 }}
            >
              <Image
                src="/banner.png"
                alt="Students learning together"
                fill
                className="object-cover transform -rotate-45 scale-125"
              />
            </motion.div>

            {/* Floating Stat Boxes */}
            <motion.div
              className="absolute top-0 right-0 lg:top-1/4 lg:-right-10 bg-white p-4 rounded-xl shadow-xl transform -translate-x-1/2 translate-y-1/2"
              initial="initial"
              whileInView="animate"
              variants={statItem(0.5)}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-sm">Learn at your own pace</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 left-0 lg:bottom-1/3 lg:left-0 bg-white p-4 rounded-xl shadow-xl transform -translate-x-1/2 translate-y-1/2"
              initial="initial"
              whileInView="animate"
              variants={statItem(0.7)}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <div>
                  <span className="block font-extrabold text-lg">36k+</span>
                  <span className="block text-xs text-gray-500">Enrolled Students</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 right-0 lg:bottom-10 lg:right-20 bg-white p-4 rounded-xl shadow-xl transform translate-x-1/2 -translate-y-1/2"
              initial="initial"
              whileInView="animate"
              variants={statItem(0.9)}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-extrabold text-lg">99%</span>
                <span className="text-xs text-gray-500">Satisfied</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </>
  );
}
