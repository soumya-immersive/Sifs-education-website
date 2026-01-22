// components/home/AboutUs.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useAboutPageData } from "@/hooks/useAboutPageData";

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
  const { data, isLoaded } = useAboutPageData();

  // Always use data, even if not fully loaded - it has initial data as default
  const hero = data?.hero || {
    image: "/home-about.png",
    badgeNumber: "19+",
    badgeText: "Years of <br/> Experience",
    tag: "About Us",
    h2: "<span class=\"relative z-10\">Learn Any</span> where, Any Time",
    paragraphs: [
      "Online learning is one of the most flexible ways to gain knowledge, irrespective of location, travel, schedule, and accommodation constraints.",
    ]
  };

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Decorative Image 1 - Top Right */}
      <motion.div
        className="absolute right-172 bottom-10 z-10 hidden xl:block"
        animate={{
          y: [-8, 8, -8],
          rotate: [-2, 2, -2],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/about-us/deco-2.png"
          alt="Decorative element"
          width={80}
          height={80}
          className="max-w-full h-auto opacity-70"
        />
      </motion.div>

      {/* Decorative Image 2 - Bottom Left */}
      <motion.div
        className="absolute left-72 bottom-20 z-10 hidden lg:block"
        animate={{
          y: [-10, 10, -10],
          rotate: [-1, 1, -1],
          transition: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          },
        }}
      >
        <Image
          src="/about-us/deco-1.png"
          alt="Decorative element"
          width={80}
          height={80}
          className="max-w-full h-auto opacity-70"
        />
      </motion.div>

      {/* Decorative Image 3 - Right Side */}
      <motion.div
        className="absolute right-72 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        animate={{
          y: [-6, 6, -6],
          rotate: [1, -1, 1],
          transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          },
        }}
      >
        <Image
          src="/about-us/deco-3.png"
          alt="Decorative element"
          width={80}
          height={80}
          className="max-w-full h-auto opacity-70"
        />
      </motion.div>

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
            <Image
              src={hero.image}
              alt="Students learning online"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Experience Badge */}
          <div className="absolute left-20 bottom-21 flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 px-6 py-4 text-white shadow-xl">
            <div className="text-3xl font-bold leading-none">{hero.badgeNumber}</div>
            <div className="border-l border-[#5D1FBF] ml-3 pl-3 text-xs font-medium leading-tight uppercase tracking-wide">
              <div dangerouslySetInnerHTML={{ __html: hero.badgeText }} />
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
            {hero.tag}
          </motion.button>

          {/* Heading */}
          <motion.h2
            className="mb-4 text-2xl text-black md:text-3xl"
            variants={textItemVariants}
          >
            <span className="relative inline-block text-2xl font-semibold text-black md:text-3xl">
              <span className="relative z-10" dangerouslySetInnerHTML={{ __html: hero.h2 }} />
              <Image
                src="/yellow-underline.png"
                alt=""
                width={140}
                height={14}
                className="absolute left-0 -bottom-1 z-0"
              />
            </span>
          </motion.h2>

          {/* Paragraphs */}
          <div className="space-y-4">
            {hero.paragraphs.map((paragraph, index) => (
              <motion.div
                key={index}
                className="text-md text-[#6B7385] leading-relaxed [&_img]:mt-4 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto"
                variants={textItemVariants}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
