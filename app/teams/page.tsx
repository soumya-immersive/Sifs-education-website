"use client";

import { useState, useMemo } from "react";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut, AnimatePresence } from "framer-motion";

import { teamData } from "../../data/teamData";
import { TeamMember } from "../../types/team";

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ---------------- FILTERS ---------------- */
const filters = [
  "All",
  "International Advisory Board",
  "National Advisory Board",
  "Speaker",
  "Scientific Committee",
  "Supportive Body",
  "Core Team",
  "Volunteer",
];

export default function TeamMembersPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_VIEW = 8; // 2 rows on lg:grid-cols-4

  /* ---------------- FILTERED DATA (MEMOIZED) ---------------- */
  const filteredTeam: TeamMember[] = useMemo(() => {
    return activeFilter === "All"
      ? teamData
      : teamData.filter((m) => m.category === activeFilter);
  }, [activeFilter]);

  const visibleTeam = showAll
    ? filteredTeam
    : filteredTeam.slice(0, ITEMS_PER_VIEW);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="w-full mb-20"
    >
      {/* ================= PAGE BANNER ================= */}
      <PageBanner
        title="Meet Our Team Members"
        subtitle="Home / Team Members"
        bgImage="/contact-gradient-bg.png"
      />

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">

        {/* ================= FILTER TABS ================= */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setShowAll(false);
              }}
              className={`px-4 py-2 text-sm border rounded-md transition
                ${
                  activeFilter === filter
                    ? "bg-[#0b5ed7] text-white border-[#0b5ed7]"
                    : "bg-white text-[#0b5ed7] border-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white"
                }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* ================= TEAM GRID ================= */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {visibleTeam.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center text-gray-500 py-20"
              >
                No team members available in this category.
              </motion.div>
            ) : (
              visibleTeam.map((member) => (
                <motion.div
                  key={member.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group text-center"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-xl bg-[#5b88c6]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[240px] object-cover grayscale
                                 group-hover:grayscale-0 transition duration-500"
                    />
                  </div>

                  {/* INFO */}
                  <h4 className="mt-4 font-semibold text-gray-900">
                    {member.name}
                  </h4>
                  <p className="text-sm text-[#0b5ed7] mt-1">
                    {member.role}
                  </p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* ================= READ MORE / LESS ================= */}
        {filteredTeam.length > ITEMS_PER_VIEW && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-6 py-2 rounded-md border border-[#0b5ed7]
                         text-[#0b5ed7] font-medium
                         hover:bg-[#0b5ed7] hover:text-white transition"
            >
              {showAll ? "Read Less" : "Read More"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
