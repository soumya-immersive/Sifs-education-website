"use client";

import { motion, Variants } from "framer-motion";

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

interface Category {
  label: string;
  slug: string;
  image?: string;
}

interface Props {
  category: Category;
}

export default function BooksHero({ category }: Props) {
  return (
    <section
      className="relative py-16 bg-[url('/books/hero-bg.png')] 
      bg-cover bg-center bg-no-repeat overflow-hidden border-b border-gray-100"
    >
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
            {category.label}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-sm text-gray-600 mt-1"
          >
            Explore our {category.label.toLowerCase()}
          </motion.p>
        </motion.div>

        {/* RIGHT IMAGE / BOOK MOCKUP */}
        <motion.div
          variants={scaleFade}
          className="w-full md:w-[400px] h-[200px]
          rounded-xl overflow-hidden"
        >
          <img
            src={category.image || "/books/hero.png"}
            alt={`${category.label} Books`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}