"use client";

import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, easeOut } from "framer-motion";
import { ArchiveProgramData } from "../../types/events-page";

interface ArchiveProgramProps {
  data: ArchiveProgramData;
}

const ProgramCard = ({
  program,
}: {
  program: ArchiveProgramData['programs'][0];
}) => {
  const buttonClasses = program.primary
    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
    : 'bg-gray-100 hover:bg-gray-300 text-gray-400';

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100 relative group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-sm text-[#008DD2] mb-1">
          <div dangerouslySetInnerHTML={{ __html: program.date }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <div dangerouslySetInnerHTML={{ __html: program.title }} />
        </h3>

        <hr className="mt-auto" />

        <button
          className={`flex items-center justify-center w-full py-3 rounded-lg font-normal transition duration-300 ease-in-out mt-3 cursor-pointer ${buttonClasses}`}
        >
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

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

export default function ArchiveProgram({ data }: ArchiveProgramProps) {
  const swiperRef = useRef<any>(null);
  const [showAll, setShowAll] = React.useState(false);

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
            <div dangerouslySetInnerHTML={{ __html: data.title }} />
          </h2>

          <div className="flex gap-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] 
               hover:from-[#354ED8] hover:to-[#A24EDC] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer`}
            >
              {showAll ? 'Show Less' : 'Explore All'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Content: Swiper OR Grid */}
        <motion.div className="relative" variants={itemVariants}>
          {showAll ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.programs?.map((program, index) => (
                <div key={index} className="h-full">
                  <ProgramCard
                    program={program}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Swiper View
            <>
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1.2}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 4 },
                }}
                className="!pb-12"
              >
                {data.programs?.map((program, index) => (
                  <SwiperSlide key={index} className="h-auto">
                    <ProgramCard
                      program={program}
                    />
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
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
