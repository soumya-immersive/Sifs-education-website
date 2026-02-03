"use client";

import { Search, ChevronRight, Calendar } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  "Forensic Science",
  "Crime Scene Investigation",
  "Criminology & Victimology",
  "Cyber Security & Law",
  "DNA Fingerprinting"
];

const RECENT_POSTS = [
  {
    id: 1,
    title: "Dapibus cras nisi suscipit nibh elite purus condimentum",
    date: "19 Dec, 2025",
    image: "/blog/post.png",
    slug: "dapibus-cras-nisi-suscipit-nibh-elite"
  },
  {
    id: 2,
    title: "Hands-on Document Authenticity Training Delhi, India",
    date: "21 Dec, 2025",
    image: "/blog/post.png",
    slug: "hands-on-document-authenticity-training-delhi-india"
  }
];

export default function BlogSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Forensic Science");

  return (
    <div className="space-y-10 sticky top-24">
      {/* Search Box */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h4 className="font-bold mb-4 text-gray-900 text-lg">Search blog</h4>
        <hr className="border-gray-200 mb-6" />
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-4 pr-10 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4559ED]/20 focus:border-[#4559ED]/30 transition-all"
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h4 className="font-bold mb-6 text-gray-900 text-lg">Categories</h4>
        <hr className="border-gray-200 mb-6" />
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = cat === selectedCategory;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  w-full flex items-center justify-between p-3.5 rounded-xl text-sm 
                  transition-all duration-200 font-medium
                  ${isSelected
                    ? "bg-[#4559ED] text-white shadow-sm shadow-[#4559ED]/20"
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                  }
                `}
              >
                <span>{cat}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${isSelected ? "text-white translate-x-0.5" : "text-gray-400"
                    }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h4 className="font-bold mb-6 text-gray-900 text-lg">Recent Post</h4>
        <hr className="border-gray-200 mb-6" />
        <div className="space-y-6">
          {RECENT_POSTS.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex gap-4 group"
            >
              {/* Thumbnail Image */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:opacity-90 transition-opacity" />
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="64px"
                />
              </div>

              {/* Post Info */}
              <div className="flex-1 min-w-0">
                <h5 className="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#4559ED] transition-colors">
                  {post.title}
                </h5>
                <div className="flex items-center gap-1.5 mt-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}