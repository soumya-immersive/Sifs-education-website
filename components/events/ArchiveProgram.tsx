"use client";

import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, easeOut } from "framer-motion";
import Link from "next/link";

/* ----------------------
        Types
---------------------- */
interface ArchiveEvent {
  id: number;
  title: string;
  slug: string;
  formatted_date?: string;
  start_date?: string;
  end_date?: string;
  start_day?: string;
  start_month_year?: string;
}

interface ArchiveProgramProps {
  archiveEvents: ArchiveEvent[];
}

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
        Card
---------------------- */
const ProgramCard = ({ program }: { program: ArchiveEvent }) => {
  // Parse the date to extract day and month/year
  const getDateParts = () => {
    if (program.start_date) {
      try {
        const date = new Date(program.start_date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return {
          day,
          monthYear: `${month} ${year}`
        };
      } catch (e) {
        return { day: 'TBA', monthYear: '' };
      }
    }
    return { day: program.start_day || 'TBA', monthYear: program.start_month_year || '' };
  };

  const { day, monthYear } = getDateParts();

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600">
              {day}
            </p>
            <p className="text-sm text-gray-600">{monthYear}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-[#008DD2] mb-1">
          {program.formatted_date || "Date TBA"}
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {program.title}
        </h3>

        <hr />

        <Link href={`/events/${program.slug}`}>
          <button className="flex items-center justify-center w-full py-3 rounded-lg font-normal transition duration-300 ease-in-out mt-3 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
            Read More <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </Link>
      </div>
    </div>
  );
};

/* ----------------------
      Main Component
---------------------- */
export default function ArchiveProgram({ archiveEvents }: ArchiveProgramProps) {
  const swiperRef = useRef<any>(null);

  // Show message if no archive events
  if (!archiveEvents || archiveEvents.length === 0) {
    return (
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Archive Program
          </h2>
          <p className="text-gray-500">No archived programs available at the moment.</p>
        </div>
      </section>
    );
  }

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

          <Link href="/events">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] 
            hover:from-[#354ED8] hover:to-[#A24EDC] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer">
              Explore All
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        {/* Slider */}
        <motion.div className="relative" variants={itemVariants}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            loop={archiveEvents.length > 4}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {archiveEvents.map((program) => (
              <SwiperSlide key={program.id}>
                <ProgramCard program={program} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          {archiveEvents.length > 4 && (
            <>
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
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
