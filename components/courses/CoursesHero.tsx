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

interface CoursesHeroProps {
  program: CourseProgram;
}

export default function CoursesHero({
  program,
}: CoursesHeroProps) {
  const stripHtml = (htmlContent: string) => {
    if (typeof window === 'undefined') return htmlContent;
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <Image
            src={program.heroBgImage || "/courses/hero-bg.png"}
            alt="Hero Background"
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row
        items-center justify-between gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* LEFT */}
        <motion.div variants={container}>
          <motion.h3
            variants={fadeUp}
            className="text-md font-bold text-gray-900 mb-2 uppercase tracking-wider"
          >
            Programs
          </motion.h3>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            <div dangerouslySetInnerHTML={{ __html: program.label }} />
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="text-sm text-gray-600 mt-2 font-medium"
          >
            <div dangerouslySetInnerHTML={{ __html: program.subtitle || `Explore our professional forensic science courses under ${stripHtml(program.label)}` }} />
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          variants={scaleFade}
          className="w-full md:w-[450px] h-[250px]
          rounded-2xl overflow-hidden shadow-xl border-4 border-white/50 relative group"
        >
          <div className="w-full h-full relative">
            <Image
              src={program.heroImage || "/courses/hero.png"}
              alt={stripHtml(program.label)}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
