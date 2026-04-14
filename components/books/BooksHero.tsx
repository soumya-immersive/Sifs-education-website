"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { CourseProgram } from "../../types/courses-page";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface Props {
  program: CourseProgram;
}

export default function BooksHero({ program }: Props) {
  const stripHtml = (htmlContent: string) => {
    if (typeof window === 'undefined') return htmlContent;
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  return (
    <section
      className="relative py-16 overflow-hidden border-b border-gray-100"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${program.heroBgImage || "/books/hero-bg.png"}')` }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row
        items-center justify-between gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* LEFT CONTENT */}
        <motion.div variants={container} className="text-center md:text-left">
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-bold text-gray-900"
          >
            <div dangerouslySetInnerHTML={{ __html: program.label }} />
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="text-sm text-gray-600 mt-1 font-medium"
          >
            <div dangerouslySetInnerHTML={{ __html: program.subtitle || `Explore our ${stripHtml(program.label).toLowerCase()}` }} />
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE / BOOK MOCKUP */}
        <motion.div
          variants={scaleFade}
          className="w-full md:w-[400px] h-[200px]
          rounded-xl overflow-hidden relative group"
        >
          <div className="w-full h-full relative">
            <Image
              src={program.heroImage || "/books/hero.png"}
              alt={`${stripHtml(program.label)} Books`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}