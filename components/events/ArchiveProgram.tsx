"use client";

import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, easeOut } from "framer-motion";

/* ----------------------
        Types
---------------------- */
interface Program {
  date: string;
  title: string;
  image: string;
  primary?: boolean;
}

/* ----------------------
        Data
---------------------- */
const programs: Program[] = [
  {
    date: "December 08, 2025",
    title: "Crime Scene Investigation",
    image: "/online-courses/1.png",
    primary: true,
  },
  {
    date: "December 08, 2025",
    title: "Graphology",
    image: "/online-courses/2.png",
    primary: false,
  },
  {
    date: "December 08, 2025",
    title: "Ethical Hacking & IT Security",
    image: "/online-courses/3.png",
    primary: false,
  },
  {
    date: "December 08, 2025",
    title: "Digital Forensics",
    image: "/online-courses/2.png",
    primary: false,
  },
];

/* ----------------------
        Card
---------------------- */
const ProgramCard = ({ program }: { program: Program }) => {
    const buttonClasses = program.primary
    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
    : 'bg-gray-100 hover:bg-gray-300 text-gray-400';
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p className="text-sm text-[#008DD2] mb-1">{program.date}</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {program.title}
        </h3>
        
        <hr />

        <button
            className={`flex items-center justify-center w-full py-3 rounded-lg font-normal transition duration-300 ease-in-out mt-3 cursor-pointer ${buttonClasses}`}
        >
          Read More <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ----------------------
        Animations
---------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/* ----------------------
      Main Component
---------------------- */
export default function ArchieveProgram() {
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Archive Program
          </h2>

          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] 
          hover:from-[#354ED8] hover:to-[#A24EDC] text-white px-5 py-2.5 rounded-lg text-sm font-medium ] transition cursor-pointer">
            Explore All
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Slider */}
        <motion.div className="relative" variants={itemVariants}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            loop={true}
            autoplay={true}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {programs.map((program, index) => (
              <SwiperSlide key={index}>
                <ProgramCard program={program} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#008DD2] rounded-full shadow-lg z-20 hidden lg:flex items-center justify-center hover:scale-110 transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#008DD2] text-white rounded-full shadow-lg z-20 hidden lg:flex items-center justify-center hover:scale-110 transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
