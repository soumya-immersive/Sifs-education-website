"use client";

import { useState, useMemo } from "react";
import PageBanner from "../../components/common/PageBanner";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

import { facultyData } from "../../data/facultyData";
import { FacultyMember } from "../../types/faculty";

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/* ---------------- FILTERS ---------------- */
const filters = ["All", "Adjunct Faculty", "Instructors"];

const ITEMS_PER_VIEW = 8;

export default function FacultiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  /* ---------- FILTER DATA ---------- */
  const filteredFaculty: FacultyMember[] = useMemo(() => {
    return activeFilter === "All"
      ? facultyData
      : facultyData.filter((f) => f.category === activeFilter);
  }, [activeFilter]);

  const visibleFaculty = showAll
    ? filteredFaculty
    : filteredFaculty.slice(0, ITEMS_PER_VIEW);

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      {/* ================= BANNER ================= */}
      <PageBanner
        title="Meet our Team Members"
        subtitle="Home / Faculties"
        bgImage="/contact-gradient-bg.png"
      />

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 mb-12">

        {/* ================= FILTER TABS ================= */}
        <div className="flex justify-center gap-2 mb-14">
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
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {visibleFaculty.map((member) => (
              <motion.div
                key={member.id} // ✅ MUST BE ID — NEVER NAME
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden bg-[#5b88c6]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[260px] object-cover grayscale
                               group-hover:grayscale-0 transition duration-500"
                  />

                  {/* SOCIAL OVERLAY */}
                  {member.socials && (
                    <div
                      className="absolute inset-0 flex items-end justify-center
                      bg-[#0b5ed7]/90 opacity-0 group-hover:opacity-100
                      transition duration-300"
                    >
                      <div className="flex gap-3 pb-6">
                        {member.socials.facebook && (
                          <a href={member.socials.facebook} className="social-btn">
                            <Facebook size={16} />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a href={member.socials.twitter} className="social-btn">
                            <Twitter size={16} />
                          </a>
                        )}
                        {member.socials.linkedin && (
                          <a href={member.socials.linkedin} className="social-btn">
                            <Linkedin size={16} />
                          </a>
                        )}
                        {member.socials.instagram && (
                          <a href={member.socials.instagram} className="social-btn">
                            <Instagram size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="text-center p-4">
                  <h4 className="font-semibold text-gray-900">
                    {member.name}
                  </h4>
                  <p className="text-sm text-[#0b5ed7] mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ================= LOAD MORE ================= */}
        {filteredFaculty.length > ITEMS_PER_VIEW && (
          <div className="flex justify-center mt-16">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-6 py-2 rounded-md border border-[#0b5ed7]
                         text-[#0b5ed7] font-medium
                         hover:bg-[#0b5ed7] hover:text-white transition"
            >
              {showAll ? "Show Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
