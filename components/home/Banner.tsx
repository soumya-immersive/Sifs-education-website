"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

// --------------------
// EASING (TS SAFE)
// --------------------
const easeOutCubic: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

// --------------------
// ANIMATIONS
// --------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const slideUpItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: easeOutCubic,
    },
  },
};

const imageVariant = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easeOutCubic,
      delay: 0.3,
    },
  },
};

// Floating animation for stat boxes (same as previous components)
const floatingAnimation = {
  y: [-8, 8, -8],
  rotate: [-1, 1, -1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function Banner() {
  const router = useRouter();

  const handleApplyClick = () => {
    router.push("/apply-now");
  };

  const handleExploreClick = () => {
    router.push("/courses/advanced-certificate");
  };

  return (
    <div className="relative overflow-hidden pt-16 pb-32">
      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/40 to-blue-50/20" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url('/banner-bg.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* MAIN CONTENT */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between"
      >
        {/* ---------------- LEFT CONTENT ---------------- */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h1
            variants={slideUpItem}
            className="text-5xl md:text-6xl font-extrabold leading-[1.15] text-gray-900"
          >
            We Believe in{" "}
            <span className="text-[#3E58EE]">Innovation</span> &{" "}
            <span className="text-[#B565E7]">Development</span>
          </motion.h1>

          <motion.p
            variants={slideUpItem}
            className="mt-4 text-lg text-gray-600 max-w-md mx-auto lg:mx-0"
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            variants={slideUpItem}
            className="mt-8 flex justify-center lg:justify-start gap-4"
          >
            <button 
              onClick={handleExploreClick}
              className="flex items-center bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:opacity-90 transition">
              Explore
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            <button 
              onClick={handleApplyClick}
              className="flex items-center border border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition"
            >
              Apply Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          {/* ZIGZAG */}
          <motion.div variants={slideUpItem} className="mt-10">
            <svg width="65" height="24">
              <path
                d="M2 20C12 10 22 10 32 20C42 10 52 10 62 20"
                stroke="#CBC9F1"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* ---------------- RIGHT IMAGE ---------------- */}
        <div className="lg:w-1/2 relative mt-14 lg:mt-0 flex justify-center lg:justify-end">
          {/* MAIN IMAGE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={imageVariant}
            viewport={{ once: true }}
            className="relative w-[420px] h-[550px] md:w-[490px] md:h-[620px] rotate-45 overflow-hidden rounded-3xl"
          >
            <Image
              src="/banner.png"
              alt="Students"
              fill
              className="object-cover -rotate-45 scale-[1.35]"
            />
          </motion.div>

          {/* FLOATING TAG - "Learn at your own pace" */}
<motion.div
  className="absolute -top-6 right-10 bg-white p-4 rounded-xl shadow-xl"
  animate={{
    y: [-8, 8, -8],
    rotate: [-1, 1, -1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
>
  <div className="flex items-center gap-2">
    <Sparkles className="w-5 h-5 text-pink-500" />
    <span className="font-semibold text-black text-md">
      Learn at your <br /> own pace
    </span>
  </div>
</motion.div>

{/* LEFT STAT - "36k+ Enrolled Students" */}
<motion.div
  className="absolute top-1/2 -left-10 bg-white py-3 px-4 rounded-xl shadow-xl"
  animate={{
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.3,
    },
  }}
>
  <div className="flex items-center gap-3">
    <GraduationCap className="w-6 h-6 text-indigo-600" />
    <div>
      <span className="block font-extrabold text-black text-lg mb-0">36k+</span>
      <span className="text-xs text-black">Enrolled Students</span>
    </div>
  </div>
</motion.div>

{/* RIGHT STAT - "99% Satisfied" */}
<motion.div
  className="absolute bottom-4 right-0 bg-white py-3 px-4 rounded-xl shadow-xl"
  animate={{
    y: [-6, 6, -6],
    rotate: [1, -1, 1],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.6,
    },
  }}
>
  <div className="flex items-center gap-2">
    <CheckCircle className="w-5 h-5 text-green-600" />
    <span className="font-extrabold text-black text-lg">99% <br /> 
      <span className="text-xs font-normal text-black">Satisfied</span>
    </span>
  </div>
</motion.div>
        </div>
      </motion.div>
    </div>
  );
}
