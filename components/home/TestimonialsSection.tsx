// components/home/TestimonialsSection.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../../lib/config";

// --- Interfaces ---
interface Testimonial {
  id: number;
  name: string;
  rank: string;
  comment: string;
  image_url: string;
}

interface SectionData {
  testimonial_title: string;
  testimonial_subtitle: string;
}

// -------------------- Framer Motion Variants --------------------

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

// FIX: replace ease: "easeOut" with cubic-bezier easing array
const itemSlideUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};


// ---------------------- Main Component --------------------------

const TestimonialsSection: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const paginationRef = useRef<any>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [sectionData, setSectionData] = useState<SectionData>({
    testimonial_title: "Students Speak",
    testimonial_subtitle: "Real Success Stories. Hear What Our Course Attendees Have to Say!",
  });
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch section titles from main API
        const sectionRes = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
        if (sectionRes.ok) {
          const sectionJson = await sectionRes.json();
          if (sectionJson.bs) {
            setSectionData({
              testimonial_title: sectionJson.bs.testimonial_title || "What Our Happy Student Say About Us",
              testimonial_subtitle: sectionJson.bs.testimonial_subtitle || "Real Success Stories. Hear What Our Course Attendees Have to Say!",
            });
          }
        }

        // Fetch testimonials
        const testimonialsRes = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/testimonials?page=1&limit=10&search=`);
        if (testimonialsRes.ok) {
          const testimonialsJson = await testimonialsRes.json();
          if (testimonialsJson.success && testimonialsJson.data?.data) {
            setTestimonials(testimonialsJson.data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate a short quote from the comment
  const generateQuote = (comment: string): string => {
    const words = comment.split(' ').slice(0, 5).join(' ');
    return `"${words}..."`;
  };

  // Helper to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/testimonials-bg.png')", backgroundColor: "#F6F8FB" }}
      >
        <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#008DD2]"></div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/testimonials-bg.png')",
        backgroundColor: "#F6F8FB",
      }}
    >
      <motion.div
        className="relative max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* -------- Header -------- */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={itemSlideUpVariants}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {sectionData.testimonial_title}
          </h1>
          <p className="text-lg text-[#6B7385]">
            {sectionData.testimonial_subtitle}
          </p>
        </motion.div>

        {/* -------- Swiper Carousel -------- */}
        <motion.div className="relative" variants={itemSlideUpVariants}>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination, Autoplay]}
            pagination={{
              el: paginationRef.current,
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full relative">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="p-5 pt-12 cursor-pointer h-full"
                    onClick={() => setSelectedTestimonial(testimonial)}
                  >
                    <h3 className="text-md font-bold text-gray-900 mb-4 min-h-12">
                      {generateQuote(testimonial.comment)}
                    </h3>

                    <p className="text-gray-700 text-sm mb-6">
                      {truncateText(testimonial.comment, 130)}
                    </p>

                    <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                        <img
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff&size=128`;
                          }}
                        />
                      </div>

                      <div>
                        <div className="font-bold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 text-xs">
                          {testimonial.rank}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          <div className="hidden lg:block">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className=" cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-12 h-12 shadow-lg bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className=" cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-12 h-12 bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Mobile Dots */}
          <div
            ref={paginationRef}
            className="swiper-pagination lg:hidden flex justify-center mt-8"
          ></div>
        </motion.div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-50 shadow-lg overflow-hidden">
                    <img
                      src={selectedTestimonial.image_url}
                      alt={selectedTestimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTestimonial.name)}&background=random&color=fff&size=200`;
                      }}
                    />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-[#002147] mb-1">{selectedTestimonial.name}</h3>
                  <div className="text-[#ff4aa5] font-medium text-sm uppercase tracking-wide mb-4">
                    {selectedTestimonial.rank}
                  </div>

                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif leading-none">“</span>
                    <p className="text-gray-600 leading-relaxed text-lg relative z-10 px-4 md:px-0">
                      {selectedTestimonial.comment}
                    </p>
                    <span className="absolute -bottom-8 -right-2 text-6xl text-blue-100 font-serif leading-none rotate-180">“</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;
