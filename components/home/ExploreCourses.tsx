// components/ForensicScienceBanner.tsx
"use client";

import React, { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useIntroSectionData, SlideData } from "@/hooks/useIntroSectionData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// --- Framer Motion Easing ---
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
      ease: easeOutCubic,
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
      ease: easeOutCubic,
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
      ease: easeOutCubic,
    },
  },
};

const ForensicScienceBanner = () => {
  const router = useRouter();
  const { slides, loading, error } = useIntroSectionData();
  const [showVideo, setShowVideo] = useState(false);
  const [activeVideoLink, setActiveVideoLink] = useState("");

  const handleExploreClick = (url: string) => {
    if (url) {
      router.push(url);
    }
  };

  const handleVideoClick = (url: string) => {
    if (url) {
      setActiveVideoLink(url);
      setShowVideo(true);
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.split('youtu.be/')[1] || url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 mb-12 pt-12 intro-swiper-container">
        <Swiper
          modules={[EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={false}
          // speed={1000}
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          pagination={{ clickable: true }}
          className="rounded-xl overflow-hidden shadow-2xl h-[550px] md:h-[650px] lg:h-[700px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="h-[700px]">
              <motion.div
                className="relative overflow-hidden bg-blue-600 p-6 md:p-10 lg:p-12 
                           flex flex-col lg:flex-row items-center justify-between text-white
                           h-full w-full"
                initial="hidden"
                animate="visible"
                variants={bannerContainerVariants}
              >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-blue-500/40 z-0 w-full h-full"></div>

                {/* Left Content */}
                <motion.div
                  className="lg:w-3/5 z-10 text-left mb-8 lg:mb-0 flex flex-col justify-center"
                  variants={textBlockVariants}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {slide.title}
                  </h2>

                  <div
                    className="text-sm md:text-base opacity-90 mb-8 max-w-xl prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: slide.text }}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Explore Button */}
                    <motion.button
                      className="flex items-center justify-center bg-blue-800 hover:bg-blue-900 
                                 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                      variants={buttonItemVariants}
                      onClick={() => handleExploreClick(slide.button_url)}
                    >
                      {slide.button_text}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>

                    {/* Watch Video Button */}
                    {slide.video_link && (
                      <motion.button
                        className="flex items-center justify-center border-2 border-white hover:bg-white hover:text-blue-600 
                                   text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                        variants={buttonItemVariants}
                        onClick={() => handleVideoClick(slide.video_link!)}
                      >
                        Watch Video
                        <Play className="ml-2 w-5 h-5" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                  className="relative w-full lg:w-2/5 h-64 lg:h-full lg:absolute lg:right-0 lg:bottom-0 
                              flex justify-center lg:justify-end mt-4 lg:mt-0 items-end"
                  variants={imageBlockVariants}
                >
                  <img
                    src={slide.bg}
                    alt={slide.title}
                    className="h-full w-auto object-contain lg:max-h-[100%] z-20"
                    style={{
                      maxHeight: "450px",
                      objectPosition: "center bottom",
                      borderRadius: "10px 0 0 0"
                    }}
                  />
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Video Modal */}
      {showVideo && activeVideoLink && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
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
              src={getYouTubeEmbedUrl(activeVideoLink)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style jsx global>{`

              .intro-swiper-container .swiper,
        .intro-swiper-container .swiper-wrapper {
    
          background-color: #1e6bff;
        }

 
        .intro-swiper-container .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .intro-swiper-container .swiper-pagination-bullet-active {
          background: white;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default ForensicScienceBanner;
