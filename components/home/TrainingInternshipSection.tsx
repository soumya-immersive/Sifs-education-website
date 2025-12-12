// components/home/TrainingInternshipSection.tsx
"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";

// --- Interfaces for Training ---
interface Training {
  id: number;
  type:
    | "Online Training"
    | "Lab Based Internship"
    | "Lab Based Training"
    | "Online Internship";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primary: boolean;
}

// --- Sample Data ---
const trainingData: Training[] = [
  {
    id: 1,
    type: "Lab Based Internship",
    title: "Cyber Forensic Investigation",
    subtitle: "LAB BASED INTERNSHIP",
    description:
      "Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.",
    image: "/training/1.png",
    primary: true,
  },
  {
    id: 2,
    type: "Lab Based Training",
    title: "Summer Training /Internship",
    subtitle: "HANDS ON TRAINING",
    description:
      "Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.",
    image: "/training/2.png",
    primary: false,
  },
  {
    id: 3,
    type: "Online Internship",
    title: "Cyber Forensic Investigation",
    subtitle: "ONLINE TRAINING",
    description:
      "Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.",
    image: "/training/3.png",
    primary: false,
  },
  {
    id: 4,
    type: "Online Training",
    title: "Digital Forensic Analysis",
    subtitle: "ONLINE TRAINING",
    description:
      "Learn to recover and analyze digital evidence from various electronic devices and networks.",
    image: "/training/1.png",
    primary: false,
  },
  {
    id: 5,
    type: "Lab Based Training",
    title: "Summer Training /Internship",
    subtitle: "HANDS ON TRAINING",
    description:
      "Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.",
    image: "/training/2.png",
    primary: false,
  },
  {
    id: 6,
    type: "Online Internship",
    title: "Cyber Forensic Investigation",
    subtitle: "ONLINE TRAINING",
    description:
      "Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.",
    image: "/training/3.png",
    primary: false,
  },
];

const trainingCategories: Training["type"][] = [
  "Online Training",
  "Lab Based Internship",
  "Lab Based Training",
  "Online Internship",
];

// --- Framer Motion Variants ---
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

// FIXED easing → must be a cubic-bezier tuple
const itemSlideUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // ✅ FIXED
    },
  },
};

// --- Helper Components ---
interface TrainingTabTitleProps {
  title: Training["type"];
  isActive: boolean;
  onClick: () => void;
}

const TrainingTabTitle: React.FC<TrainingTabTitleProps> = ({
  title,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative pb-3 text-base font-medium transition duration-200 ${
        isActive ? "text-purple-600 font-bold" : "text-gray-500 hover:text-purple-600"
      }`}
    >
      {title}

      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-purple-600" />
      )}
    </button>
  );
};

interface TrainingCardProps {
  training: Training;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  const buttonClasses = training.primary
    ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100">
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img src={training.image} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 md:p-4 text-left">
        <span className="bg-white/90 text-xs font-semibold text-[#008DD2] py-1">
          {training.subtitle}
        </span>

        <h3 className="text-xl font-bold text-gray-900 h-12 mb-2">{training.title}</h3>

        <p className="text-sm text-[#6B7385] mt-2 mb-6 h-16">{training.description}</p>

        <hr />

        <button
          className={`flex items-center justify-center w-full py-3 rounded-lg mt-3 transition ${buttonClasses}`}
        >
          Enroll Now
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
const TrainingInternshipSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Training["type"]>(
    trainingCategories[0]
  );
  const swiperRef = useRef<any>(null);

  const BACKGROUND_IMAGE_URL =
    "https://i.imgur.com/abstract-light-forensics-bg.jpg";

  return (
    <div
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)),
                          url(${BACKGROUND_IMAGE_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Title */}
        <motion.div className="mb-12" variants={itemSlideUpVariants}>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-900 pt-6">
            Professional Forensic Training <br /> & Internship
          </h1>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center flex-wrap gap-x-8 gap-y-3 mb-12"
          variants={itemSlideUpVariants}
        >
          {trainingCategories.map((category) => (
            <TrainingTabTitle
              key={category}
              title={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>

        {/* Slider */}
        <motion.div className="relative pt-4 pb-12" variants={itemSlideUpVariants}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 32 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {trainingData.map((training) => (
              <SwiperSlide key={training.id}>
                <TrainingCard training={training} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#008DD2] rounded-full shadow-lg hidden lg:flex items-center justify-center hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#008DD2] text-white rounded-full shadow-lg hidden lg:flex items-center justify-center hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrainingInternshipSection;
