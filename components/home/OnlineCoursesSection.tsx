"use client";

import React, { useState, useRef, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion, easeOut, AnimatePresence } from 'framer-motion';

// ----------------------
//     Types
// ----------------------
interface Course {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  primary: boolean;
}

interface ActiveTabTitleProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

// ----------------------
//     Sub-Component: ActiveTabTitle
// ----------------------
const ActiveTabTitle: React.FC<ActiveTabTitleProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative pb-3 text-base md:text-lg font-medium transition duration-200 ease-in-out outline-none cursor-pointer ${
        isActive
          ? 'text-black font-bold border-b-2 border-transparent'
          : 'text-black font-medium hover:text-indigo-600'
      }`}
    >
      {title}
      
      {/* Custom Brush Stroke Indicator */}
      {isActive && (
        <motion.span 
          layoutId="brushStroke"
          className="absolute bottom-0 left-0 w-full h-1"
          style={{
            background: 'linear-gradient(to right, #B065E8, #B065E8, #a05fe0, #B065E8)',
            borderRadius: '2px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(176, 101, 232, 0.5)',
          }}
        />
      )}
    </button>
  );
};

// ----------------------
//     Sub-Component: CourseCard
// ----------------------
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const buttonClasses = course.primary
    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
    : 'bg-gray-100 hover:bg-gray-300 text-gray-400';

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100 h-full flex flex-col">
      <div className="bg-white rounded-lg flex flex-col h-full">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <p className="text-sm font-normal text-[#008DD2] mb-1">{course.id}</p>
          <h3 className="text-xl font-bold text-gray-900 h-10 line-clamp-2">{course.title}</h3>
          <p className="text-sm font-normal text-[#6B7385] mt-2 mb-6 h-16 line-clamp-3">
            {course.description}
          </p>

          <hr className="mt-auto" />

          <button
            className={`flex items-center justify-center w-full py-3 rounded-lg font-normal transition duration-300 ease-in-out mt-3 cursor-pointer group ${buttonClasses}`}
          >
            Enroll Now
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------
//     Course Data
// ----------------------
const courses: Course[] = [
  // Tab with more than 4 boxes
  { id: 'C1', title: 'Crime Scene Investigation', description: 'Explore analysis and solving techniques.', type: 'Classroom Courses', image: '/online-courses/1.png', primary: true },
  { id: 'C2', title: 'Forensic Ballistics', description: 'Study of firearms and projectiles.', type: 'Classroom Courses', image: '/online-courses/2.png', primary: false },
  { id: 'C3', title: 'Fingerprint Analysis', description: 'Classifying unique ridge patterns.', type: 'Classroom Courses', image: '/online-courses/3.png', primary: false },
  { id: 'C4', title: 'Document Exam', description: 'Analyze handwriting for forgery.', type: 'Classroom Courses', image: '/online-courses/1.png', primary: false },
  { id: 'C5', title: 'Toxicology', description: 'Biological sample analysis.', type: 'Classroom Courses', image: '/online-courses/2.png', primary: false },
  
  // Tabs with fewer boxes
  { id: 'A1', title: 'Forensic Pathology', description: 'Study of post-mortem examination.', type: 'Associate Degree', image: '/online-courses/3.png', primary: false },
  { id: 'F1', title: 'Graphology', description: 'Handwriting personality secrets.', type: 'Foundation Courses', image: '/online-courses/2.png', primary: false },
  { id: 'AD1', title: 'Ethical Hacking', description: 'IT Security and hacking techniques.', type: 'Advanced Certificate Courses', image: '/online-courses/3.png', primary: false },
  { id: 'P1', title: 'Digital Forensics', description: 'Recovering digital evidence.', type: 'Professional Courses', image: '/online-courses/2.png', primary: false },
];

// ----------------------
//     Animations
// ----------------------
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.2 },
  },
};

const itemSlideUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

// ----------------------
//     Main Component
// ----------------------
const OnlineCoursesSection: React.FC = () => {
  const categories: string[] = [
    'Classroom Courses',
    'Associate Degree',
    'Foundation Courses',
    'Advanced Certificate Courses',
    'Professional Courses',
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const swiperRef = useRef<any>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => course.type === activeCategory);
  }, [activeCategory]);

  return (
    <div
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/online-courses/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="text-center mb-12" variants={itemSlideUpVariants}>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-900">
            Online Forensic Science Courses
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-900">
            Start Today!
          </h2>
        </motion.div>

        {/* Categories (Styling gaps and underlines preserved) */}
        <motion.div
          className="flex justify-center flex-wrap gap-x-12 gap-y-3 mb-12 border-b border-gray-100"
          variants={itemSlideUpVariants}
        >
          {categories.map((category) => (
            <ActiveTabTitle
              key={category}
              title={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>

        <motion.div className="relative pt-4 pb-12" variants={itemSlideUpVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1.2}
                loop={filteredCourses.length > 4}
                breakpoints={{
                  640: { slidesPerView: 2.2, spaceBetween: 32 },
                  1024: { slidesPerView: 4, spaceBetween: 24 },
                }}
              >
                {filteredCourses.map((course) => (
                  <SwiperSlide key={course.id} className="h-auto pb-4">
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (Only show if more than 4 boxes) */}
          {filteredCourses.length > 4 && (
            <>
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="cursor-pointer absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#008DD2] rounded-full shadow-lg z-20 flex items-center justify-center transition hover:scale-110 border border-gray-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="cursor-pointer absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#008DD2] text-white rounded-full shadow-lg z-20 flex items-center justify-center transition hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OnlineCoursesSection;