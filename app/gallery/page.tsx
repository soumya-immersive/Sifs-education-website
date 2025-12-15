"use client";

import Image from "next/image";
import { useState } from "react";

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
  },
  {
    id: 2,
    title: "Philippines Conference",
    subtitle: "4th International Forensic Science Conference",
    img: "/gallery2.png",
  },
  {
    id: 3,
    title: "Shanghai Conference",
    subtitle: "Tongji Univ Conference",
    img: "/gallery3.png",
  },
  {
    id: 4,
    title: "VGU Conference",
    subtitle: "VGU Jaipur",
    img: "/gallery4.png",
  },
  {
    id: 5,
    title: "PPSC Visit",
    subtitle: "FPDC",
    img: "/gallery5.png",
  },
  {
    id: 6,
    title: "The Crime Scene Investigation",
    subtitle: "Crime Scene Workshop",
    img: "/gallery6.png",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="w-full">

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
        <div className="flex gap-3 pb-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-full whitespace-nowrap
                ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white"
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

        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-3 border"
          >
            {/* IMAGE */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
            </div>

            {/* BUTTON */}
            <button className="mt-4 cursor-pointer bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
              Learn More
              <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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

      {/* 🔹 LOAD MORE BUTTON */}
      <div className="w-full flex justify-center pb-12">
        <button className="cursor-pointer flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] text-white font-medium hover:opacity-90">
          Load More
          <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
    </div>
  );
}
