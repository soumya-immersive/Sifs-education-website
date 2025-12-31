"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion, Variants } from "framer-motion";

/* ---------------- Animations ---------------- */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
  // 1. State for Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // 2. Handle Search (Triggered on button click or 'Enter')
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("Searching for:", searchQuery);
    
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <motion.div
        className="bg-white rounded-xl shadow-sm px-4 py-3 text-black flex flex-col lg:flex-row items-center gap-4 lg:justify-between"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* LEFT: Search Bar */}
        <motion.form 
          onSubmit={handleSearch}
          variants={fadeUp} 
          className="flex w-full lg:max-w-md"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to learn?"
            className="w-full border border-r-0 border-[#f4f4f4] rounded-l-lg px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-[#8E5BEF]"
          />
          <button
            type="submit"
            className="flex items-center justify-center px-4 rounded-r-lg bg-gradient-to-b from-[#8E5BEF] to-[#5B2ED4] text-white hover:opacity-90 transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </motion.form>

        {/* RIGHT: Filters */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap w-full lg:w-auto gap-3 justify-between lg:justify-end"
        >
          {/* Skill Level */}
          <select 
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-[48%] lg:w-auto outline-none focus:ring-1 focus:ring-[#8E5BEF]"
          >
            <option value="">Skill Level</option>
            <option value="level1">Level 1</option>
            <option value="level2">Level 2</option>
            <option value="level3">Level 3</option>
          </select>

          {/* Duration */}
          <select 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-[48%] lg:w-auto outline-none focus:ring-1 focus:ring-[#8E5BEF]"
          >
            <option value="">Duration</option>
            <option value="10">10+ Hours</option>
            <option value="15">15+ Hours</option>
            <option value="20">20+ Hours</option>
          </select>

          {/* Sort */}
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto outline-none focus:ring-1 focus:ring-[#8E5BEF]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </motion.div>
      </motion.div>
    </section>
  );
}