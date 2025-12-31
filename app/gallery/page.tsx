"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

/* ---------------- Data ---------------- */

const categories = [
  "All",
  "International Workshop",
  "Police Training",
  "Learner Training",
  "Forensic Events",
  "Corporate Training",
  "Conferences",
  "Media Presence",
  "Others",
];

const galleryItems = [
  {
    id: 1,
    title: "Bulacan State University",
    subtitle: "Bulacan State University",
    img: "/gallery1.png",
    description: "Detailed highlights from the forensic seminar held at Bulacan State University, focusing on modern investigation techniques."
  },
  {
    id: 2,
    title: "Philippines Conference",
    subtitle: "4th International Forensic Science Conference",
    img: "/gallery2.png",
    description: "The 4th International Forensic Science Conference brought together global experts to discuss digital forensics and DNA profiling."
  },
  {
    id: 3,
    title: "Shanghai Conference",
    subtitle: "Tongji Univ Conference",
    img: "/gallery3.png",
    description: "A collaborative academic session at Tongji University regarding cross-border forensic standards."
  },
  {
    id: 4,
    title: "VGU Conference",
    subtitle: "VGU Jaipur",
    img: "/gallery4.png",
    description: "Specialized workshop conducted for students and professionals at VGU Jaipur."
  },
  {
    id: 5,
    title: "PPSC Visit",
    subtitle: "FPDC",
    img: "/gallery5.png",
    description: "Official visit to the Punjab Police Services College (PPSC) for forensic development programs."
  },
  {
    id: 6,
    title: "The Crime Scene Investigation",
    subtitle: "Crime Scene Workshop",
    img: "/gallery6.png",
    description: "A hands-on workshop demonstrating crime scene management and evidence collection."
  },
  {
    id: 7,
    title: "Advanced DNA Analysis",
    subtitle: "International Workshop",
    img: "/gallery1.png", // Reusing image for example
    description: "Deep dive into mitochondrial DNA sequencing and its application in cold cases."
  },
];

const ITEMS_PER_LOAD = 6; // 2 rows (3 columns each)

/* ---------------- Component ---------------- */

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Filter Logic: Filter by category if not "All"
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "All") return true;
    return item.subtitle.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  const handleLoadLess = () => {
    setVisibleCount(ITEMS_PER_LOAD);
    window.scrollTo({ top: 400, behavior: "smooth" }); // Optional: scroll back to grid start
  };

  return (
    <div className="w-full relative mb-24">
      {/* 🔹 TOP BANNER IMAGE */}
      <div className="w-full h-52 md:h-64 relative">
        <Image
          src="/gallery-banner.png"
          alt="Gallery Banner"
          fill
          className="object-cover"
        />
      </div>

      {/* 🔹 TITLE SECTION */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Forensic Science Events
        </h2>
        <p className="text-lg text-gray-600 mt-1">Photo Highlights</p>
      </div>

      {/* 🔹 CATEGORY FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-3 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(ITEMS_PER_LOAD); // Reset count on filter change
              }}
              className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-full whitespace-nowrap transition-all
                ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 border"
          >
            {/* IMAGE */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* TEXT */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
            </div>

            {/* LEARN MORE BUTTON */}
            <button
              onClick={() => setSelectedItem(item)}
              className="mt-4 w-full cursor-pointer bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:brightness-110 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              Learn More
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 LOAD MORE / LOAD LESS BUTTONS */}
      {filteredItems.length > ITEMS_PER_LOAD && (
        <div className="w-full flex justify-center pb-12">
          {visibleCount < filteredItems.length ? (
            <button
              onClick={handleLoadMore}
              className="cursor-pointer flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white font-medium hover:brightness-110 shadow-lg transition-all"
            >
              Load More →
            </button>
          ) : (
            <button
              onClick={handleLoadLess}
              className="cursor-pointer flex items-center px-8 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-black shadow-lg transition-all"
            >
              Load Less ↑
            </button>
          )}
        </div>
      )}

      {/* 🔹 MODAL POPUP */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)} // Close on clicking backdrop
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-80 w-full">
              <Image
                src={selectedItem.img}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10">
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">
                {selectedItem.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                {selectedItem.title}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] my-4 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {selectedItem.description}
              </p>
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="mt-8 w-full sm:w-auto px-10 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-all shadow-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}