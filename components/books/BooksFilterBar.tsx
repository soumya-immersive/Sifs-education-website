"use client";

import { Search, X } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { BookCategory } from "@/types/book";

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

interface Props {
  categories?: BookCategory[];
  activeCategory?: string;
  baseUrl: string;
}

export default function BooksFilterBar({ categories, activeCategory, baseUrl }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("sb") || "");

  // Update search term state if URL changes (e.g. back button)
  useEffect(() => {
    setSearchTerm(searchParams.get("sb") || "");
  }, [searchParams]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    // Reset page when changing category
    params.delete("page");

    if (slug === "all") {
      router.push(`/books?${params.toString()}`);
    } else {
      router.push(`/books/${slug}?${params.toString()}`);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.trim()) {
      params.set("sb", searchTerm.trim());
    } else {
      params.delete("sb");
    }

    // Reset page on search
    params.delete("page");

    router.push(`${baseUrl}?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sb");
    params.delete("page");
    router.push(`${baseUrl}?${params.toString()}`);
  };

  return (
    <section className="max-w-7xl mx-auto mt-8 mb-12">
      <motion.div
        className="
          bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
          border border-gray-100
          p-2 sm:p-3
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
          className="flex w-full lg:max-w-2xl bg-white rounded-lg overflow-hidden border border-gray-100 relative"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search training (e.g. Cyber, Forensic)"
            className="
              w-full
              px-4 py-3
              pr-10
              text-[15px]
              outline-none
              placeholder:text-gray-400
              placeholder:italic
              text-black
            "
          />

          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            className="
              flex items-center justify-center
              px-4
              m-1
              rounded-lg
              bg-[#6366f1]
              text-white
              hover:bg-[#4f46e5]
              transition-colors
              shadow-sm
            "
          >
            <Search className="w-5 h-5" />
          </button>
        </motion.form>

        {/* RIGHT: Filters */}
        <motion.div
          variants={fadeUp}
          className="flex w-full lg:w-auto gap-3 flex-wrap lg:flex-nowrap px-2"
        >
          {/* Category Dropdown (Replacing Duration with real categories) */}
          <div className="relative group w-full lg:w-48">
            <select
              value={activeCategory || "all"}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none border border-gray-100 rounded-lg pl-4 pr-10 py-3 text-sm font-bold text-gray-700 bg-white cursor-pointer hover:border-blue-300 outline-none w-full shadow-sm"
            >
              <option value="all">All Disciplines</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative group w-full lg:w-36">
            <select className="appearance-none border border-gray-100 rounded-lg pl-4 pr-10 py-3 text-sm font-bold text-gray-700 bg-white cursor-pointer hover:border-blue-300 outline-none w-full shadow-sm">
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}