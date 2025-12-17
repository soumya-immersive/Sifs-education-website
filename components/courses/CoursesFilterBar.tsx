"use client";

import { Search } from "lucide-react";
import { motion, Variants } from "framer-motion";

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CoursesFilterBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <motion.div
        className="
          bg-white rounded-xl shadow-sm
          px-4 py-3
          flex flex-col lg:flex-row
          items-center
          gap-4
          lg:justify-between
        "
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* LEFT: Search */}
        <motion.div
          variants={fadeUp}
          className="flex w-full lg:max-w-md"
        >
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="
              w-full
              border border-r-0
              rounded-l-lg
              px-4 py-2.5
              text-sm
              outline-none
              placeholder:text-gray-400
            "
          />

          <button
            className="
              flex items-center justify-center
              px-4
              rounded-r-lg
              bg-gradient-to-b from-[#8E5BEF] to-[#5B2ED4]
              text-white
              hover:opacity-90
              transition
            "
          >
            <Search className="w-4 h-4" />
          </button>
        </motion.div>

        {/* RIGHT: Filters */}
        <motion.div
          variants={fadeUp}
          className="flex w-full lg:w-auto gap-3 justify-between lg:justify-end"
        >
          <select className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto">
            <option>Skill Level</option>
          </select>

          <select className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto">
            <option>Duration</option>
          </select>

          <select className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto">
            <option>Newest</option>
          </select>
        </motion.div>
      </motion.div>
    </section>
  );
}
