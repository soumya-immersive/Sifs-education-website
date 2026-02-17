"use client";

import { Search } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect, useRef } from "react";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get initial values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sno") || "Newest";
  const initialDuration = searchParams.get("sduration") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const isFocused = useRef(false);

  // Update URL helper
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      // Reset page when filtering
      if (name !== "page") {
        params.delete("page");
      }
      return params.toString();
    },
    [searchParams]
  );

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only push if the search term is actually different from what's in the URL
      if (searchTerm !== (searchParams.get("search") || "")) {
        router.push(pathname + "?" + createQueryString("search", searchTerm), {
          scroll: false,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, createQueryString, pathname, router, searchParams]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname + "?" + createQueryString("sno", e.target.value), {
      scroll: false,
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(
      pathname + "?" + createQueryString("sduration", e.target.value),
      { scroll: false }
    );
  };

  // Sync state with URL if it changes externally (and input is not focused)
  useEffect(() => {
    const currentParam = searchParams.get("search") || "";
    if (currentParam !== searchTerm && !isFocused.current) {
      setSearchTerm(currentParam);
    }
  }, [searchParams, searchTerm]);

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
        <motion.div variants={fadeUp} className="flex w-full lg:max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            onFocus={() => { isFocused.current = true; }}
            onBlur={() => { isFocused.current = false; }}
            placeholder="Search training (e.g. Cyber, Forensic)"
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
          {/* Training Type / Sort */}
          <select
            value={initialSort}
            onChange={handleSortChange}
            className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto"
          >
            <option value="Newest">Newest</option>
            <option value="Old">Oldest</option>
          </select>

          {/* Duration */}
          <select
            value={initialDuration}
            onChange={handleDurationChange}
            className="border border-[#D9D9D9] rounded-lg px-4 py-2.5 text-sm text-gray-600 w-full lg:w-auto"
          >
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
