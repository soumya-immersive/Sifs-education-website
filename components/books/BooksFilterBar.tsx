"use client";

import { Search } from "lucide-react";
import { motion, Variants } from "framer-motion";

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  genre: string;
  onGenreChange: (val: string) => void;
  format: string;
  onFormatChange: (val: string) => void;
  sortOrder: string;
  onSortChange: (val: string) => void;
  // Optional: Add editMode related props if needed, but filtering usually independent of editMode
}

export default function BooksFilterBar({
  searchQuery,
  onSearchChange,
  genre,
  onGenreChange,
  format,
  onFormatChange,
  sortOrder,
  onSortChange
}: FilterBarProps) {

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <motion.div
        className="
          bg-white rounded-xl shadow-sm border border-gray-100
          px-4 py-4
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
        <motion.form
          onSubmit={handleSearch}
          variants={fadeUp}
          className="flex w-full lg:max-w-md"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, author, or ISBN..."
            className="
              w-full
              border border-gray-200 border-r-0
              rounded-l-lg
              px-4 py-2.5
              text-sm
              outline-none
              focus:ring-1 focus:ring-blue-500
              placeholder:text-gray-400
            "
          />

          <button
            type="submit"
            className="
              flex items-center justify-center
              px-5
              rounded-r-lg
              bg-gradient-to-r from-blue-600 to-cyan-500
              text-white
              hover:shadow-lg
              transition-all
            "
          >
            <Search className="w-4 h-4" />
          </button>
        </motion.form>

        {/* RIGHT: Filters */}
        <motion.div
          variants={fadeUp}
          className="flex w-full lg:w-auto gap-3 flex-wrap lg:flex-nowrap"
        >
          {/* Genre Filter */}
          <select
            value={genre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 bg-white cursor-pointer hover:border-blue-300 outline-none w-full lg:w-40"
          >
            <option value="">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="academic">Academic</option>
            <option value="forensic-science">Forensic Science</option>
            <option value="sci-fi">Science Fiction</option>
          </select>

          {/* Format Filter */}
          <select
            value={format}
            onChange={(e) => onFormatChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 bg-white cursor-pointer hover:border-blue-300 outline-none w-full lg:w-40"
          >
            <option value="">Format</option>
            <option value="Hardcover">Hardcover</option>
            <option value="Paperback">Paperback</option>
            <option value="E-Book">E-Book</option>
            <option value="Audiobook">Audiobook</option>
          </select>

          {/* Sort Filter */}
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 bg-white cursor-pointer hover:border-blue-300 outline-none w-full lg:w-40"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="az">A-Z</option>
          </select>
        </motion.div>
      </motion.div>
    </section>
  );
}