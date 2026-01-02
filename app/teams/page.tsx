"use client";

import { useState, useMemo } from "react";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut, AnimatePresence } from "framer-motion";

import { teamData } from "../../data/teamData";
import { TeamMember } from "../../types/team";
import TeamModal from "../../components/team/TeamModal";

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const ITEMS_PER_VIEW = 8;

  const filteredTeam = useMemo(() => {
    return activeFilter === "All"
      ? teamData
      : teamData.filter((m) => m.category === activeFilter);
  }, [activeFilter]);

  const visibleTeam = showAll
    ? filteredTeam
    : filteredTeam.slice(0, ITEMS_PER_VIEW);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full mb-20"
      >
        <PageBanner
          title="Meet Our Team Members"
          subtitle="Home / Team Members"
          bgImage="/contact-gradient-bg.png"
        />

        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">

          {/* FILTERS */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
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
                      ? "bg-[#0b5ed7] text-white"
                      : "bg-white text-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <AnimatePresence>
              {visibleTeam.map((member) => (
                <motion.div
                  key={member.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group text-center"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-xl bg-[#5b88c6]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[240px] object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    />

                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="px-4 py-2 text-sm border border-white text-white rounded hover:bg-white hover:text-black transition"
                      >
                        Read More
                      </button>
                    </div>
                  </div>

                  <h4 className="mt-4 font-semibold text-gray-900">
                    {member.name}
                  </h4>
                  <p className="text-sm text-[#0b5ed7] mt-1">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* READ MORE GRID */}
          {filteredTeam.length > ITEMS_PER_VIEW && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setShowAll((p) => !p)}
                className="px-6 py-2 rounded-md border border-[#0b5ed7]
                           text-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white transition"
              >
                {showAll ? "Read Less" : "Read More"}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <TeamModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
