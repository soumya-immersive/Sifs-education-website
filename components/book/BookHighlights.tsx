"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Book } from "../../data/books";

interface Props {
  book: Book;
}

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function BookHighlights({ book }: Props) {
  /**
   * You can define specific highlights based on the book title or ID 
   * until you update your Book interface to include a highlights array.
   */
  const highlights = [
    `In-depth analysis of ${book.title} methodologies`,
    "Step-by-step criminal investigation procedures and protocols",
    "Real-world forensic case studies and expert commentary",
    "Comprehensive overview of modern investigative tools",
    "Detailed visual aids, diagrams, and photographic evidence",
    "Updated legal frameworks and courtroom presentation tips",
  ];

  return (
    <motion.div
      className="bg-white py-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Title */}
      <motion.h3
        variants={fadeUp}
        className="text-md font-semibold text-blue-600 mb-6 flex items-center gap-2"
      >
        <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
        Key Highlights of this Publication:
      </motion.h3>

      {/* List */}
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-sm text-gray-600"
        variants={container}
      >
        {highlights.map((item, index) => (
          <motion.li
            key={index}
            variants={fadeUp}
            className="flex items-start gap-3 group"
          >
            <div className="mt-0.5 shrink-0 transition-transform group-hover:rotate-12">
               <Image
                src="/books/check-mark.png" 
                alt="check"
                width={18}
                height={18}
                className="opacity-90"
              />
            </div>
            <span className="leading-relaxed group-hover:text-gray-900 transition-colors">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}