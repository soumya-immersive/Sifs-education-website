"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSliderData } from "@/hooks/useSliderData";
import { API_BASE_URL } from "@/lib/config";

// --------------------
// EASING (TS SAFE)
// --------------------
const easeOutCubic: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

// --------------------
// ANIMATIONS
// --------------------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const slideUpItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: easeOutCubic,
    },
  },
};

const imageVariant = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easeOutCubic,
      delay: 0.3,
    },
  },
};

// Floating animation for stat boxes (same as previous components)
const floatingAnimation = {
  y: [-8, 8, -8],
  rotate: [-1, 1, -1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function Banner() {
  const router = useRouter();
  const { sliders, loading, error } = useSliderData();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Debug: Check what data we're getting
  useEffect(() => {
    console.log('🔍 Slider Data:', { sliders, loading, error });
  }, [sliders, loading, error]);

  // Auto-play slider
  useEffect(() => {
    const displaySliders = sliders.length > 0 ? sliders : [];
    if (displaySliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displaySliders.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliders.length]);

  const handlePrevious = () => {
    const displaySliders = sliders.length > 0 ? sliders : [];
    setCurrentIndex((prev) => (prev - 1 + displaySliders.length) % displaySliders.length);
  };

  const handleNext = () => {
    const displaySliders = sliders.length > 0 ? sliders : [];
    setCurrentIndex((prev) => (prev + 1) % displaySliders.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden pt-16 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/40 to-blue-50/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E58EE] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback slider data if API fails or returns empty
  const fallbackSlider = {
    id: 0,
    language_id: 169,
    title: "We Believe in Innovation & Development",
    text: "Innovate. Learn. Lead. Join Us to Shape the Future of Forensic Science",
    button_text: "Explore",
    button_url: "/courses/advanced-certificate",
    button_text_two: "Apply Now",
    button_url_two: "/apply-now",
    image: "/banner.png",
    image_url: "/banner.png",
    serial_number: 1,
    created_at: "",
    updated_at: ""
  };

  // Use API data if available, otherwise use fallback
  const displaySliders = sliders.length > 0 ? sliders : [fallbackSlider];
  const currentSlide = displaySliders[currentIndex];

  console.log('🎬 Banner Render:', {
    slidersLength: sliders.length,
    displaySlidersLength: displaySliders.length,
    currentIndex,
    currentSlide: currentSlide.title,
    imageFile: currentSlide.image,
    imageUrl: currentSlide.image_url
  });

  // Use image_url from API directly, fallback to constructing URL if not available
  const imageUrl = currentSlide.image_url
    || (currentSlide.image.startsWith('http') || currentSlide.image.startsWith('/')
      ? currentSlide.image
      : `${API_BASE_URL}/EducationAndInternship/storage/app/slider/${currentSlide.image}`.replace('/api', ''));

  console.log('🖼️ Image URL:', imageUrl);

  return (
    <div className="relative overflow-hidden pt-16 pb-32">
      {/* SOFT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/40 to-blue-50/20" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url('/banner-bg.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* MAIN CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          variants={containerVariants}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between"
        >
          {/* ---------------- LEFT CONTENT ---------------- */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              variants={slideUpItem}
              className="text-5xl md:text-6xl font-extrabold leading-[1.15] text-gray-900"
            >
              {currentSlide.title}
            </motion.h1>

            <motion.p
              variants={slideUpItem}
              className="mt-4 text-lg text-gray-600 max-w-md mx-auto lg:mx-0"
            >
              {currentSlide.text}
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              variants={slideUpItem}
              className="mt-8 flex justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => router.push(currentSlide.button_url)}
                className="flex items-center bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:opacity-90 transition">
                {currentSlide.button_text}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <button
                onClick={() => router.push(currentSlide.button_url_two)}
                className="flex items-center border border-gray-300 text-gray-700 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition"
              >
                {currentSlide.button_text_two}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>

            {/* ZIGZAG */}
            <motion.div variants={slideUpItem} className="mt-10">
              <svg width="65" height="24">
                <path
                  d="M2 20C12 10 22 10 32 20C42 10 52 10 62 20"
                  stroke="#CBC9F1"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* ---------------- RIGHT IMAGE ---------------- */}
          <div className="lg:w-1/2 relative mt-14 lg:mt-0 flex justify-center lg:justify-end">
            {/* MAIN IMAGE */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariant}
              className="relative w-[420px] h-[550px] md:w-[490px] md:h-[620px] rotate-45 overflow-hidden rounded-3xl"
            >
              <Image
                src={imageUrl}
                alt={currentSlide.title}
                fill
                className="object-cover -rotate-45 scale-[1.35]"
                unoptimized={imageUrl.startsWith('http')}
              />
            </motion.div>

            {/* FLOATING TAG - "Learn at your own pace" */}
            <motion.div
              className="absolute -top-6 right-10 bg-white p-4 rounded-xl shadow-xl"
              animate={{
                y: [-8, 8, -8],
                rotate: [-1, 1, -1],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-black text-md">
                  Learn at your <br /> own pace
                </span>
              </div>
            </motion.div>

            {/* LEFT STAT - "36k+ Enrolled Students" */}
            <motion.div
              className="absolute top-1/2 -left-10 bg-white py-3 px-4 rounded-xl shadow-xl"
              animate={{
                y: [-10, 10, -10],
                rotate: [-2, 2, -2],
                transition: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                },
              }}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <div>
                  <span className="block font-extrabold text-black text-lg mb-0">36k+</span>
                  <span className="text-xs text-black">Enrolled Students</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT STAT - "99% Satisfied" */}
            <motion.div
              className="absolute bottom-4 right-0 bg-white py-3 px-4 rounded-xl shadow-xl"
              animate={{
                y: [-6, 6, -6],
                rotate: [1, -1, 1],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-extrabold text-black text-lg">99% <br />
                  <span className="text-xs font-normal text-black">Satisfied</span>
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SLIDER CONTROLS */}
      {sliders.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all ${index === currentIndex
                  ? 'w-8 bg-[#3E58EE]'
                  : 'w-2 bg-gray-400 hover:bg-gray-600'
                  } h-2 rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
