// components/ForensicScienceBanner.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useIntroSectionData } from "@/hooks/useIntroSectionData";

const studentImage = "/student-pointing.png";

// --- Framer Motion Easing ---
// Same as easeOut
const easeOutCubic: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// --- Variants ---

const bannerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const textBlockVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOutCubic, // ✔ FIXED
    },
  },
};

const imageBlockVariants: Variants = {
  hidden: { x: 100, opacity: 0, scale: 0.95 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: easeOutCubic, // ✔ FIXED
    },
  },
};

const buttonItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOutCubic, // ✔ FIXED
    },
  },
};

const ForensicScienceBanner = () => {
  const router = useRouter();
  const { data, loading, error } = useIntroSectionData();
  const [showVideo, setShowVideo] = useState(false);

  const handleExploreClick = () => {
    if (data?.intro_section_button_url) {
      router.push(data.intro_section_button_url);
    }
  };

  const handleVideoClick = () => {
    if (data?.intro_section_video_link) {
      setShowVideo(true);
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('youtu.be/')[1] || url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  // Strip HTML tags from text content
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 mb-12 pt-12">
        <div className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 mb-12 pt-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          <p>Error loading content: {error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return null;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 mb-12 pt-12">
        <motion.div
          className="relative overflow-hidden bg-blue-600 rounded-xl shadow-2xl p-6 md:p-10 lg:p-12 
                     flex flex-col lg:flex-row items-center justify-between text-white"
          style={{
            backgroundImage: data.intro_bg
              ? `url(${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/assets/img/${data.intro_bg})`
              : "radial-gradient(circle at 10% 90%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(135deg, rgba(255,255,255,0.05), transparent)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial="hidden"
          whileInView="visible"
          variants={bannerContainerVariants}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-blue-600/80 rounded-xl"></div>

          {/* Left Content */}
          <motion.div
            className="lg:w-3/5 z-10 text-left mb-8 lg:mb-0"
            variants={textBlockVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.intro_section_title}
            </h2>

            <div
              className="text-sm md:text-base opacity-90 mb-8 max-w-xl prose prose-invert"
              dangerouslySetInnerHTML={{ __html: data.intro_section_text }}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Explore Button */}
              <motion.button
                className="flex items-center justify-center bg-blue-800 hover:bg-blue-900 
                           text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                variants={buttonItemVariants}
                onClick={handleExploreClick}
              >
                {data.intro_section_button_text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>

              {/* Watch Video Button */}
              {data.intro_section_video_link && (
                <motion.button
                  className="flex items-center justify-center border-2 border-white hover:bg-white hover:text-blue-600 
                             text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                  variants={buttonItemVariants}
                  onClick={handleVideoClick}
                >
                  Watch Video
                  <Play className="ml-2 w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative w-full lg:w-2/5 h-64 lg:h-auto lg:absolute lg:right-0 lg:bottom-0 
                        flex justify-center lg:justify-end mt-4 lg:mt-0"
            variants={imageBlockVariants}
          >
            <img
              src={studentImage}
              alt="Smiling student pointing"
              className="h-full w-auto object-cover lg:max-h-full lg:w-auto z-20"
              style={{ maxHeight: "100%", maxWidth: "none", objectPosition: "center bottom" }}
            />

            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-blue-600 to-transparent z-30 hidden lg:block" />
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideo && data.intro_section_video_link && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              src={getYouTubeEmbedUrl(data.intro_section_video_link)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ForensicScienceBanner;
