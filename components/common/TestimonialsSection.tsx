// components/home/TestimonialsSection.tsx
"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { TestimonialsData } from "@/types/about-page";

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

interface TestimonialsSectionProps {
  data?: TestimonialsData;
  editMode?: boolean;
  updateData?: (newData: TestimonialsData) => void;
}

const defaultTestimonials: TestimonialsData = {
  heading: "What Our Happy Student Say About Us",
  subheading: "Real Success Stories. Hear What Our Course Attendees Have to Say!",
  bgImage: "/testimonials-bg.png",
  items: [
    {
      id: 1,
      name: "Zodia-Kay Smith",
      course: "Document & Handwriting Examination",
      content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
      quote: "Great Learning Experience Overall",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Patrice Tyron Johnson",
      course: "Criminology and Victimology",
      content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
      quote: "Fantastic platform with quality courses",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
      id: 3,
      name: "Felissa Aliyah Jones",
      course: "Fingerprint Examination & Analysis",
      content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
      quote: "Very satisfied with the lessons",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 4,
      name: "Patrice Tyron Johnson",
      course: "Criminology and Victimology",
      content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
      quote: "Fantastic platform with quality courses",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
      id: 5,
      name: "Felissa Aliyah Jones",
      course: "Fingerprint Examination & Analysis",
      content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
      quote: "Very satisfied with the lessons",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ]
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  data = defaultTestimonials,
  editMode = false,
  updateData = () => { }
}) => {
  const swiperRef = useRef<any>(null);
  const paginationRef = useRef<any>(null);

  // Handle deleting a testimonial
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const newItems = data.items.filter(item => item.id !== id);
      updateData({ ...data, items: newItems });
    }
  };

  // Handle adding a new testimonial
  const handleAdd = () => {
    const newId = Math.max(...data.items.map(i => i.id), 0) + 1;
    const newItem = {
      id: newId,
      name: "New Student",
      course: "Course Name",
      content: "Enter student testimonial here...",
      quote: "Short Quote",
      avatar: "https://placehold.co/100x100?text=Avatar"
    };
    updateData({ ...data, items: [...data.items, newItem] });
    // setTimeout(() => swiperRef.current?.slideTo(data.items.length), 300);
  };

  return (
    <div
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${data.bgImage}')`,
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
          <div className="text-3xl md:text-4xl font-bold text-black mb-4">
            <EditableText
              html={data.heading}
              editMode={editMode}
              onChange={(val) => updateData({ ...data, heading: val })}
              className="font-bold"
            />
          </div>
          <div className="text-lg text-[#6B7385]">
            <EditableText
              html={data.subheading}
              editMode={editMode}
              onChange={(val) => updateData({ ...data, subheading: val })}
            />
          </div>
        </motion.div>

        {/* -------- Swiper Carousel -------- */}
        <motion.div className="relative mb-12" variants={itemSlideUpVariants}>
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
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {/* Add Slide Card (Only in Edit Mode) */}
            {editMode && (
              <SwiperSlide>
                <div
                  onClick={handleAdd}
                  className="bg-blue-50/50 border-2 border-dashed border-blue-300 rounded-lg shadow-sm flex flex-col items-center justify-center h-full min-h-[400px] cursor-pointer hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <span className="font-semibold text-blue-600">Add Testimonial</span>
                </div>
              </SwiperSlide>
            )}

            {data.items.map((testimonial, i) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full relative group/card">

                  {/* Delete Button (Edit Mode Only) */}
                  {editMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(testimonial.id);
                      }}
                      className="absolute top-2 right-2 z-20 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-red-200"
                      title="Delete Testimonial"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}

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

                  <div className="p-5 pt-12">
                    <div className="text-md font-bold text-gray-900 mb-4 min-h-12">
                      "<EditableText
                        html={testimonial.quote}
                        editMode={editMode}
                        onChange={(val) => {
                          const newItems = [...data.items];
                          newItems[i].quote = val;
                          updateData({ ...data, items: newItems });
                        }}
                        as="span"
                      />"
                    </div>

                    <div className="text-gray-700 text-sm mb-6">
                      <EditableText
                        html={testimonial.content}
                        editMode={editMode}
                        onChange={(val) => {
                          const newItems = [...data.items];
                          newItems[i].content = val;
                          updateData({ ...data, items: newItems });
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                        <EditableImage
                          src={testimonial.avatar}
                          editMode={editMode}
                          onChange={(src) => {
                            const newItems = [...data.items];
                            newItems[i].avatar = src;
                            updateData({ ...data, items: newItems });
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="font-bold text-gray-900">
                          <EditableText
                            html={testimonial.name}
                            editMode={editMode}
                            onChange={(val) => {
                              const newItems = [...data.items];
                              newItems[i].name = val;
                              updateData({ ...data, items: newItems });
                            }}
                          />
                        </div>
                        <div className="text-gray-600 text-xs">
                          <EditableText
                            html={testimonial.course}
                            editMode={editMode}
                            onChange={(val) => {
                              const newItems = [...data.items];
                              newItems[i].course = val;
                              updateData({ ...data, items: newItems });
                            }}
                          />
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
