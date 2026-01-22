"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import InternshipCard from "./InternshipCard";
import { Internship } from "@/data/internships";

/* ---------------- Props ---------------- */

interface Props {
  internships: Internship[];
}

const ITEMS_PER_LOAD = 3;

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

/* ---------------- Component ---------------- */

export default function InternshipsGrid({ internships }: Props) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    // Simulating a network delay for the loading state
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 800);
  };

  const handleLoadLess = () => {
    setVisibleCount(ITEMS_PER_LOAD);
  };

  if (!internships || internships.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 mt-16 text-center">
        <p className="text-gray-500 text-lg">
          No internships available for this program at the moment.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 mb-20">
      {/* GRID */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {internships.slice(0, visibleCount).map((internship) => (
          <motion.div key={internship.id} variants={fadeUp}>
            <InternshipCard internship={internship} />
          </motion.div>
        ))}
      </motion.div>

      {/* ACTIONS */}
      {internships.length > ITEMS_PER_LOAD && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          {visibleCount < internships.length ? (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="
                bg-gradient-to-r from-purple-500 to-indigo-600
                text-white px-8 py-3 rounded-lg
                text-sm font-medium flex items-center gap-2
                disabled:opacity-70 shadow-md hover:shadow-lg transition-all
              "
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>Load More Internships →</>
              )}
            </button>
          ) : (
            <button
              onClick={handleLoadLess}
              className="
                bg-gradient-to-r from-purple-500 to-indigo-600
                text-white px-8 py-3 rounded-lg
                text-sm font-medium shadow-md hover:shadow-lg transition-all
              "
            >
              Load Less ↑
            </button>
          )}
        </motion.div>
      )}
    </section>
  );
}