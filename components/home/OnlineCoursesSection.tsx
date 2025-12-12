// components/home/OnlineCoursesSection.tsx
"use client";

import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion, easeOut } from 'framer-motion'; // <-- FIXED

import ActiveTabTitle from './ActiveTabTitle';

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

// ----------------------
//     Course Data
// ----------------------
const courses: Course[] = [
  {
    id: 'FSP 104',
    title: 'Crime Scene Investigation',
    description: 'Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.',
    type: 'Classroom Courses',
    image: '/online-courses/1.png',
    primary: true,
  },
  {
    id: 'FSP 106',
    title: 'Graphology',
    description: 'Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.',
    type: 'Foundation Courses',
    image: '/online-courses/2.png',
    primary: false,
  },
  {
    id: 'FSP 201',
    title: 'Ethical Hacking & IT Sec...',
    description: 'Explore crime scene analysis and crime-solving techniques to uncover the secrets behind every crime in the hunt for truth.',
    type: 'Advanced Certificate Courses',
    image: '/online-courses/3.png',
    primary: false,
  },
  {
    id: 'FSP 302',
    title: 'Digital Forensics',
    description: 'Specialized course in recovering and investigating material found in digital devices.',
    type: 'Professional Courses',
    image: '/online-courses/2.png',
    primary: false,
  },
  {
    id: 'FSP 303',
    title: 'Cyber Security',
    description: 'Learn to protect networks and systems from digital attacks and threats.',
    type: 'Professional Courses',
    image: '/online-courses/1.png',
    primary: false,
  },
  {
    id: 'FSP 401',
    title: 'Forensic Pathology',
    description: 'Detailed study of post-mortem examination and cause of death determination.',
    type: 'Associate Degree',
    image: '/online-courses/3.png',
    primary: false,
  },
];

// ----------------------
//     Card Component
// ----------------------
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const buttonClasses = course.primary
    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
    : 'bg-gray-100 hover:bg-gray-300 text-gray-400';

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100">
      <div className="bg-white rounded-lg">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4">
          <p className="text-sm font-normal text-[#008DD2] mb-1">{course.id}</p>
          <h3 className="text-xl font-bold text-gray-900 h-10">{course.title}</h3>
          <p className="text-sm font-normal text-[#6B7385] mt-2 mb-6 h-16">
            {course.description}
          </p>

          <hr />

          <button
            className={`flex items-center justify-center w-full py-3 rounded-lg font-normal transition duration-300 ease-in-out mt-3 cursor-pointer ${buttonClasses}`}
          >
            Enroll Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------
//     Animations (FIXED)
// ----------------------
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

// ❗ FIX: replaced ease: "easeOut" → ease: easeOut
const itemSlideUpVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeOut, // <- FIXED
    },
  },
};

// ----------------------
//     Main Component
// ----------------------
const OnlineCoursesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(courses[0].type);
  const swiperRef = useRef<any>(null);

  const BACKGROUND_IMAGE_URL = '/online-courses/bg.png';

  const categories: string[] = [
    'Classroom Courses',
    'Associate Degree',
    'Foundation Courses',
    'Advanced Certificate Courses',
    'Professional Courses',
  ];

  return (
    <div
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${BACKGROUND_IMAGE_URL})`,
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
        {/* Title */}
        <motion.div className="text-center mb-12" variants={itemSlideUpVariants}>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-900">
            Online Forensic Science Courses
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-900">
            Start Today!
          </h2>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex justify-center flex-wrap gap-x-12 gap-y-3 mb-12"
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
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#008DD2] rounded-full shadow-lg z-20 hidden lg:flex items-center justify-center transition hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#008DD2] text-white rounded-full shadow-lg z-20 hidden lg:flex items-center justify-center transition hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OnlineCoursesSection;
