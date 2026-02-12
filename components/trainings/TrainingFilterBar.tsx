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

export default function TrainingFilterBar() {
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
            placeholder="Search training (e.g. Corporate, Hands-on)"
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
          {/* Training Type */}
          <select className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto">
            <option value="Newest">Newest</option>
            <option value="Old">Old</option>
          </select>


          {/* Duration */}
          <select className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto">
            <option value="">Duration</option>
            <option value="50">50+ Hours</option>
            <option value="100">100+ Hours</option>
            <option value="150">150+ Hours</option>
          </select>
        </motion.div>
      </motion.div>
    </section>
  );
}
