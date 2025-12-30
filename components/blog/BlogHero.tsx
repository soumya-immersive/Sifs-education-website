"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface BlogHeroProps {
  post?: {
    title?: string;
    heroImage?: string;
  };
}

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BlogHero({ post }: BlogHeroProps) {
  return (
    <section className="relative bg-white pt-16 lg:pt-20">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* --- Top Header Section --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="lg:w-1/2 relative">
            <motion.h1 
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              News & Insights <br />
              <span className="text-gray-800">Details.</span>
            </motion.h1>
            
            {/* Decorative Arrow (matching screenshot) */}
            <motion.div variants={fadeUp} className="hidden lg:block mt-4 ml-32 absolute top-0 right-30">
              <img 
                src="/blog/swirly-arrow.png" 
                alt="decoration" 
                className="w-24 h-auto opacity-40"
              />
            </motion.div>
          </div>

          <motion.div 
            variants={fadeUp}
            className="lg:w-5/12 text-gray-500 text-sm md:text-base leading-relaxed"
          >
            <p>
              A brief introduction explaining what type of content users can expect, 
              such as industry trends, agency updates, success stories, and expert insights.
            </p>
          </motion.div>
        </div>

        {/* --- Main Featured Image --- */}
        <motion.div 
          variants={fadeUp}
          className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50"
        >
          <Image
            src={post?.heroImage || "/blog/main-featured.png"}
            alt={post?.title || "Blog featured image"}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}