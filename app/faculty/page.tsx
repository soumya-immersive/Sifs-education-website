"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Toaster } from "react-hot-toast";

import PageBanner from "../../components/common/PageBanner";
import Image from "next/image";
import { FacultyMember } from "../../types/faculty";
import { FACULTY_PAGE_INITIAL_DATA } from "@/lib/data/faculty-page-data";

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
const defaultFilters = ["All", "Adjunct Faculty", "Instructors"];

const ITEMS_PER_VIEW = 8;

export default function FacultiesPage() {
  const data = FACULTY_PAGE_INITIAL_DATA;
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Initialize filters 
  const filters = data.filters || defaultFilters;

  /* ---------- FILTER DATA ---------- */
  const filteredFaculty: FacultyMember[] = useMemo(() => {
    return activeFilter === "All"
      ? data.faculty
      : data.faculty.filter((f) => f.category === activeFilter);
  }, [activeFilter, data.faculty]);

  // Show all items if user clicked "Show All"
  const visibleFaculty = showAll
    ? filteredFaculty
    : filteredFaculty.slice(0, ITEMS_PER_VIEW);

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white min-h-screen relative">
      <Toaster position="top-right" />

      {/* ================= BANNER ================= */}
      <div className="relative">
        <PageBanner
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          bgImage={data.hero.bgImage}
        />
      </div>


      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 mb-12">

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
                    ? "bg-[#0b5ed7] text-white border-[#0b5ed7]"
                    : "bg-white text-[#0b5ed7] border-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white"
                  }`}
              >
                {filter}
              </button>
            </div>
          ))}
        </div>

        {/* ================= GRID ================= */}
        {visibleFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <AnimatePresence>
              {visibleFaculty.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group relative"
                >

                  {/* IMAGE CONTAINER */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 group h-[240px]">
                    <div className="w-full h-full relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition duration-500"
                      />
                    </div>

                    {/* SOCIAL OVERLAY */}
                    <div
                      className={`absolute inset-0 flex items-end justify-center 
                            bg-gradient-to-t from-black/80 via-black/40 to-transparent transition duration-300 text-white
                            ${member.socials && Object.values(member.socials).some(s => s && s !== "#") ? "opacity-0 group-hover:opacity-100" : "opacity-0 hidden"}`}
                    >
                      <div className="flex gap-3 pb-6">
                        {member.socials?.facebook && member.socials.facebook !== "#" && (
                          <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                            <Facebook size={16} />
                          </a>
                        )}
                        {member.socials?.twitter && member.socials.twitter !== "#" && (
                          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                            <Twitter size={16} />
                          </a>
                        )}
                        {member.socials?.linkedin && member.socials.linkedin !== "#" && (
                          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                            <Linkedin size={16} />
                          </a>
                        )}
                        {member.socials?.instagram && member.socials.instagram !== "#" && (
                          <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-[#0b5ed7] transition-all">
                            <Instagram size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="text-center p-4">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      <div dangerouslySetInnerHTML={{ __html: member.name }} />
                    </h4>
                    <div className="text-sm text-[#0b5ed7] mt-1">
                      <div dangerouslySetInnerHTML={{ __html: member.role }} />
                    </div>
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
            <p className="text-sm mt-1">There are no faculty members in this category yet.</p>
          </div>
        )}

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
