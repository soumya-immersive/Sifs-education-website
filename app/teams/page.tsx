"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import {
  Facebook, Twitter, Linkedin, Instagram
} from "lucide-react";
import { Toaster } from "react-hot-toast";

import PageBanner from "../../components/common/PageBanner";
import { TeamMember } from "../../types/team";
import TeamModal from "../../components/team/TeamModal";
import { TEAMS_PAGE_INITIAL_DATA } from "@/lib/data/teams-page-data";

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const defaultFilters = ["All", "Core Team", "Supportive Body", "Volunteer"];
const ITEMS_PER_VIEW = 8;

export default function TeamMembersPage() {
  const data = TEAMS_PAGE_INITIAL_DATA;
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Initialize filters if missing
  const filters = data.filters || defaultFilters;

  /* ---------- FILTER DATA ---------- */
  const filteredTeam: TeamMember[] = useMemo(() => {
    return activeFilter === "All"
      ? data.team
      : data.team.filter((m) => m.category === activeFilter);
  }, [activeFilter, data.team]);

  // Show all items if user clicked "Show All"
  const visibleTeam = showAll
    ? filteredTeam
    : filteredTeam.slice(0, ITEMS_PER_VIEW);

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white min-h-screen relative w-full mb-20">
      <Toaster position="top-right" />

      {/* ================= BANNER ================= */}
      <div className="relative">
        <PageBanner
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          bgImage={data.hero.bgImage}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">

        {/* ================= FILTER TABS ================= */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 items-center">
          {filters.map((filter, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
                className={`px-4 py-2 text-sm border rounded-md transition
                            ${activeFilter === filter
                    ? "bg-[#0b5ed7] text-white"
                    : "bg-white text-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white"
                  }`}
              >
                {filter}
              </button>
            </div>
          ))}
        </div>

        {/* GRID */}
        {visibleTeam.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <AnimatePresence>
              {visibleTeam.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group text-center relative"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 h-[240px]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                    />

                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="px-4 py-2 text-sm border border-white text-white rounded hover:bg-white hover:text-black transition"
                      >
                        Read More
                      </button>
                    </div>
                  </div>

                  <h4 className="mt-4 font-semibold text-gray-900">
                    <div dangerouslySetInnerHTML={{ __html: member.name }} />
                  </h4>
                  <div className="text-sm text-[#0b5ed7] mt-1">
                    <div dangerouslySetInnerHTML={{ __html: member.role }} />
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <div className="opacity-50 text-4xl">👥</div>
            </div>
            <h3 className="text-lg font-medium text-gray-500">No members found</h3>
            <p className="text-sm mt-1">There are no team members in this category yet.</p>
          </div>
        )}

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

      {/* MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <TeamModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
