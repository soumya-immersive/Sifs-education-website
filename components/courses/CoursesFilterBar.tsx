"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. State for Search and Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [level, setLevel] = useState(searchParams.get("slevel") || "");
  const [duration, setDuration] = useState(searchParams.get("sduration") || "");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sno") || "Newest");

  // Sync state with URL search params
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setLevel(searchParams.get("slevel") || "");
    setDuration(searchParams.get("sduration") || "");
    setSortOrder(searchParams.get("sno") || "Newest");
  }, [searchParams]);

  // Helper to update URL params
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 on any filter/search change
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  // 2. Handle Search (Triggered on button click or 'Enter')
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateParams({ search: searchQuery });
  };

  // 3. Handle Drodown Changes
  const handleFilterChange = (key: string, value: string) => {
    updateParams({ [key]: value || null });
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
            onChange={(e) => handleFilterChange("slevel", e.target.value)}
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
            onChange={(e) => handleFilterChange("sduration", e.target.value)}
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
            onChange={(e) => handleFilterChange("sno", e.target.value)}
            className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto outline-none focus:ring-1 focus:ring-[#8E5BEF]"
          >
            <option value="Newest">Newest</option>
            <option value="Old">Old</option>
          </select>
        </motion.div>
      </motion.div>
    </section>
  );
}