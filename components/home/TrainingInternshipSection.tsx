"use client";

import React, { useState, useRef, useMemo } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

// --- Interfaces ---
interface Training {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primary: boolean;
}

// --- Updated Data (4 unique items per category) ---
const trainingData: Training[] = [
  // 1. Online Training
  { id: 101, type: "Online Training", title: "Digital Forensic Essentials", subtitle: "ONLINE MODULE", description: "Master the fundamentals of digital evidence collection and preservation from anywhere.", image: "/training/1.png", primary: true },
  { id: 102, type: "Online Training", title: "Network Intrusion Analysis", subtitle: "ONLINE MODULE", description: "Learn to identify and track unauthorized network access and security breaches.", image: "/training/2.png", primary: false },
  { id: 103, type: "Online Training", title: "Mobile Device Forensics", subtitle: "ONLINE MODULE", description: "Advanced techniques for extracting data from various mobile operating systems.", image: "/training/3.png", primary: false },
  { id: 104, type: "Online Training", title: "Cloud Security Auditing", subtitle: "ONLINE MODULE", description: "Evaluating cloud infrastructure for forensic readiness and security compliance.", image: "/training/1.png", primary: false },

  // 2. Lab Based Internship
  { id: 201, type: "Lab Based Internship", title: "Cyber Forensic Investigation", subtitle: "LAB BASED", description: "Hands-on experience with industry-standard forensic tools in a lab environment.", image: "/training/1.png", primary: true },
  { id: 202, type: "Lab Based Internship", title: "Advanced CSI Workshop", subtitle: "LAB BASED", description: "Practical training in evidence recovery and crime scene documentation.", image: "/training/2.png", primary: false },
  { id: 203, type: "Lab Based Internship", title: "Biometric Data Analysis", subtitle: "LAB BASED", description: "Focus on physiological evidence and advanced identity verification techniques.", image: "/training/3.png", primary: false },
  { id: 204, type: "Lab Based Internship", title: "Malware Reverse Engineering", subtitle: "LAB BASED", description: "Deconstruct malicious code to understand its origin and functionality.", image: "/training/1.png", primary: false },

  // 3. Lab Based Training
  { id: 301, type: "Lab Based Training", title: "Summer Training Program", subtitle: "HANDS ON", description: "Intensive summer sessions focused on core forensic methodologies.", image: "/training/2.png", primary: true },
  { id: 302, type: "Lab Based Training", title: "Forensic Document Examination", subtitle: "HANDS ON", description: "Analyze physical documents for forgery and alterations in a lab setting.", image: "/training/1.png", primary: false },
  { id: 303, type: "Lab Based Training", title: "Trace Evidence Recovery", subtitle: "HANDS ON", description: "Master the micro-analysis of fibers, hair, and glass fragments.", image: "/training/3.png", primary: false },
  { id: 304, type: "Lab Based Training", title: "Ballistics and Toolmarks", subtitle: "HANDS ON", description: "Understanding firearm signatures and physical impact analysis.", image: "/training/2.png", primary: false },

  // 4. Online Internship
  { id: 401, type: "Online Internship", title: "Virtual Forensic Lab", subtitle: "REMOTE INTERNSHIP", description: "Execute real-world forensic cases through our proprietary cloud lab.", image: "/training/3.png", primary: true },
  { id: 402, type: "Online Internship", title: "Threat Intelligence Ops", subtitle: "REMOTE INTERNSHIP", description: "Monitor and report on emerging global cyber threats in real-time.", image: "/training/1.png", primary: false },
  { id: 403, type: "Online Internship", title: "Incident Response Lead", subtitle: "REMOTE INTERNSHIP", description: "Lead virtual teams through the lifecycle of a security breach.", image: "/training/2.png", primary: false },
  { id: 404, type: "Online Internship", title: "OSINT Investigation", subtitle: "REMOTE INTERNSHIP", description: "Mastering open-source intelligence for legal and criminal investigations.", image: "/training/3.png", primary: false },
];

const trainingCategories = [
  "Online Training",
  "Lab Based Internship",
  "Lab Based Training",
  "Online Internship",
];

// --- Framer Motion Variants ---
// Adding explicit 'Variants' type to ensure compatibility
const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};

const itemSlideUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
        duration: 0.6, 
        // Use 'as const' to tell TypeScript these are exactly 4 numbers (a tuple)
        ease: [0.25, 0.1, 0.25, 1] as const 
    } 
  },
};

// --- Sub-Components ---
const TrainingTabTitle: React.FC<{ title: string; isActive: boolean; onClick: () => void }> = ({ title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative pb-3 text-sm md:text-base font-medium transition duration-200 cursor-pointer outline-none ${
      isActive ? "text-purple-600 font-bold" : "text-gray-500 hover:text-purple-600"
    }`}
  >
    {title}
    {isActive && (
      <motion.span layoutId="underline_intern" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
    )}
  </button>
);

const TrainingCard: React.FC<{ training: Training }> = ({ training }) => (
  <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm h-full flex flex-col group hover:shadow-md transition-shadow">
    <div className="relative h-52 overflow-hidden">
      <img src={training.image} alt={training.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="p-5 flex flex-col flex-grow text-left">
      <span className="text-[10px] uppercase tracking-wider font-bold text-[#008DD2] mb-1">{training.subtitle}</span>
      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 min-h-[3rem]">{training.title}</h3>
      <p className="text-xs text-[#6B7385] mb-6 line-clamp-3">{training.description}</p>
      <div className="mt-auto">
        <hr className="border-gray-100 mb-4" />
        <button className={`flex items-center justify-center w-full py-2.5 rounded-lg transition-all font-semibold text-sm cursor-pointer ${
          training.primary ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}>
          Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const TrainingInternshipSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(trainingCategories[0]);
  const swiperRef = useRef<any>(null);

  const filteredData = useMemo(() => trainingData.filter(item => item.type === activeCategory), [activeCategory]);

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#FBFCFF]">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="mb-12" variants={itemSlideUpVariants}>
          <h1 className="text-2xl md:text-3xl font-bold text-black pt-6">
            Professional <span className="relative inline-block">
              <span className="relative z-10">Forensic Training</span>
              <Image src="/yellow-underline.png" alt="" width={260} height={18} className="absolute left-0 -bottom-1 z-0" />
            </span> <br className="hidden md:block" /> & Internship
          </h1>
        </motion.div>

        <motion.div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-12 border-b border-gray-100" variants={itemSlideUpVariants}>
          {trainingCategories.map(cat => (
            <TrainingTabTitle key={cat} title={cat} isActive={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
          ))}
        </motion.div>

        <motion.div className="relative pb-12" variants={itemSlideUpVariants}>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Swiper
                onSwiper={(s) => (swiperRef.current = s)}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
              >
                {filteredData.map(item => (
                  <SwiperSlide key={item.id} className="h-auto">
                    <TrainingCard training={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button onClick={() => swiperRef.current?.slidePrev()} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full hidden xl:flex items-center justify-center text-[#008DD2] hover:scale-110 cursor-pointer transition-all border border-gray-50">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#008DD2] shadow-lg rounded-full hidden xl:flex items-center justify-center text-white hover:scale-110 cursor-pointer transition-all">
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrainingInternshipSection;