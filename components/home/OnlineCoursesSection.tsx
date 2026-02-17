"use client";

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion, easeOut, AnimatePresence } from 'framer-motion';
import { API_BASE_URL, BASE_URL } from '@/lib/config';

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
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  course_count: number;
}

interface SectionData {
  category_section_title: string;
  category_section_subtitle: string;
}

interface ApiCourse {
  id: number;
  title: string;
  slug: string;
  image: string;
  image_url?: string;
  sub_title?: string;
  course_code?: string;
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
      className={`relative pb-3 text-base md:text-lg font-medium transition duration-200 ease-in-out outline-none cursor-pointer ${isActive
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
const CourseCard: React.FC<{
  course: Course;
  index: number;
  isActive: boolean;
  onHover: (id: number | null) => void;
}> = ({ course, index, isActive, onHover }) => {
  const buttonClasses = isActive
    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
    : 'bg-gray-100 text-gray-400';

  return (
    <div
      className={`rounded-xl overflow-hidden bg-white border h-full flex flex-col transition-all duration-300 ${isActive ? 'border-purple-100 shadow-sm transform -translate-y-1' : 'border-gray-100'}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="bg-white rounded-lg flex flex-col h-full">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition duration-500 hover:scale-110"
          />
          {/* {isActive && (
            <div className="absolute top-3 left-3">
              <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Recommended
              </span>
            </div>
          )} */}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-normal text-[#008DD2]">{course.id}</p>
          </div>
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 transition-colors duration-300 h-[55px]">
            {course.title}
          </h3>
          <p className="text-sm font-normal text-[#6B7385] mt-2 mb-6 h-16 line-clamp-3">
            {course.description}
          </p>

          <hr className="mt-auto border-gray-50" />

          <a
            href={`/course-details/${course.slug}`}
            className={`flex items-center justify-center w-full py-3 rounded-lg font-medium transition-all duration-300 ease-in-out mt-3 cursor-pointer group ${buttonClasses}`}
          >
            Enroll Now
            <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
          </a>
        </div>
      </div>
    </div>
  );
};

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
//     Main Component
// ----------------------

const OnlineCoursesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sectionData, setSectionData] = useState<SectionData>({
    category_section_title: "Online Forensic Science Courses. Start Today!",
    category_section_subtitle: "Give Wings to Your Passion for Investigation. Your Journey to Forensic Excellence Starts Here. Explore Now!",
  });
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  // Fetch section data and categories on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch section data (title & subtitle)
        const frontResponse = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front?_t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          cache: 'no-store',
        });
        const frontData = await frontResponse.json();
        if (frontData?.data?.bs) {
          setSectionData({
            category_section_title: frontData.data.bs.category_section_title || "Online Forensic Science Courses. Start Today!",
            category_section_subtitle: frontData.data.bs.category_section_subtitle || "Give Wings to Your Passion for Investigation. Your Journey to Forensic Excellence Starts Here. Explore Now!",
          });
        }

        // Fetch categories
        const categoriesResponse = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/courses/categories?_t=${Date.now()}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          cache: 'no-store',
        });
        const categoriesData = await categoriesResponse.json();
        if (categoriesData?.success && categoriesData?.data?.categories) {
          const fetchedCategories = categoriesData.data.categories;
          setCategories(fetchedCategories);
          if (fetchedCategories.length > 0) {
            setActiveCategory(fetchedCategories[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch courses when active category changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (!activeCategory) return;

      setCoursesLoading(true);
      try {
        // Use category ID to fetch courses
        const apiUrl = `${API_BASE_URL}/EducationAndInternship/Website/front/courses/category/${activeCategory.slug}?_t=${Date.now()}`;

        console.log('Fetching courses for category:', activeCategory.name, '| ID:', activeCategory.slug);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          console.error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
          setCourses([]);
          return;
        }

        const data = await response.json();

        // API response structure: { success, data: { data: [...courses] } }
        const coursesArray = data?.data?.data;

        if (data?.success && Array.isArray(coursesArray) && coursesArray.length > 0) {
          const transformedCourses: Course[] = coursesArray.map((course: ApiCourse, index: number) => ({
            id: course.course_code || `C${index + 1}`,
            title: course.title,
            description: course.sub_title || '',
            type: activeCategory.name,
            image: course.image ? `${BASE_URL}/uploads/${course.image}` : '/online-courses/1.png',
            primary: index === 0,
            slug: course.slug,
          }));
          setCourses(transformedCourses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
    setActiveIndex(0); // Reset active index when category changes
  }, [activeCategory]);

  // Helper function to strip HTML and truncate
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  // Parse title into two lines
  const titleParts = useMemo(() => {
    const title = sectionData.category_section_title;
    const parts = title.split('.');
    if (parts.length >= 2) {
      return {
        line1: parts[0].trim(),
        line2: parts.slice(1).join('.').trim(),
      };
    }
    return { line1: title, line2: '' };
  }, [sectionData.category_section_title]);

  if (loading) {
    return (
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-12"></div>
            <div className="flex justify-center gap-8 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-32"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-2">{titleParts.line1}</span> {titleParts.line2 && titleParts.line2.split(' ').slice(0, 2).join(' ')}
          </h1>
          {titleParts.line2 && (
            <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-900">
              {titleParts.line2.split(' ').slice(2).join(' ')}
            </h2>
          )}
          {sectionData.category_section_subtitle && (
            <p className="mt-4 text-base text-gray-600 max-w-3xl mx-auto">
              {sectionData.category_section_subtitle}
            </p>
          )}
        </motion.div>

        {/* Categories (Styling gaps and underlines preserved) */}
        <motion.div
          className="flex justify-center flex-wrap gap-x-12 gap-y-3 mb-12 border-b border-gray-100"
          variants={itemSlideUpVariants}
        >
          {categories.map((category, index) => (
            <ActiveTabTitle
              key={`${category.id}-${index}`}
              title={category.name}
              isActive={activeCategory?.id === category.id}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>

        <motion.div className="relative pt-4 pb-12" variants={itemSlideUpVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {coursesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
                  ))}
                </div>
              ) : courses.length > 0 ? (
                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  modules={[Navigation]}
                  spaceBetween={24}
                  slidesPerView={1.2}
                  loop={courses.length > 4}
                  breakpoints={{
                    640: { slidesPerView: 2.2, spaceBetween: 32 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                  }}
                >
                  {courses.map((course, index) => (
                    <SwiperSlide key={`${course.id}-${index}`} className="h-auto pb-4">
                      <CourseCard
                        course={course}
                        index={index}
                        isActive={hoveredIndex !== null ? hoveredIndex === index : activeIndex === index}
                        onHover={setHoveredIndex}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No courses available in this category.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (Only show if more than 4 boxes) */}
          {courses.length > 4 && !coursesLoading && (
            <>
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="cursor-pointer absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#008DD2] rounded-full shadow-lg z-20 flex items-center justify-center transition hover:scale-110 border border-gray-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="cursor-pointer absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#008DD2] text-white rounded-full shadow-lg z-20 flex items-center justify-center transition hover:scale-110"
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