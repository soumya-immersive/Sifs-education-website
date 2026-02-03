"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { API_BASE_URL } from "../../lib/config";

// --- Interfaces ---
interface TrainingItem {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  image: string;
  mode_of_study: string;
  duration: string;
  price_level_1: string;
  int_price_level_1: string;
  image_url: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  trainings: TrainingItem[];
  training_count: number;
}

interface SectionData {
  course_section_title: string;
  course_section_subtitle: string;
}

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
    className={`relative pb-3 text-sm md:text-base font-medium transition duration-200 cursor-pointer outline-none ${isActive ? "text-purple-600 font-bold" : "text-gray-500 hover:text-purple-600"
      }`}
  >
    {title}
    {isActive && (
      <motion.span layoutId="underline_intern" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
    )}
  </button>
);

const TrainingCard: React.FC<{ training: TrainingItem; isFirst: boolean }> = ({ training, isFirst }) => (
  <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm h-full flex flex-col group hover:shadow-md transition-shadow">
    <div className="relative h-52 overflow-hidden">
      <img
        src={training.image_url || "/training/1.png"}
        alt={training.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-5 flex flex-col flex-grow text-left">
      <span className="text-[10px] uppercase tracking-wider font-bold text-[#008DD2] mb-1">
        {training.mode_of_study}
      </span>
      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 min-h-[3rem]">
        {training.title}
      </h3>
      <p className="text-xs text-[#6B7385] mb-6 line-clamp-3">
        {training.sub_title}
      </p>
      <div className="mt-auto">
        <hr className="border-gray-100 mb-4" />
        <Link href={`/training-details/${training.slug}`} className={`flex items-center justify-center w-full py-2.5 rounded-lg transition-all font-semibold text-sm cursor-pointer ${isFirst ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}>
          Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

// --- Main Component ---
const TrainingInternshipSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);

  // Fetch categories and section data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, sectionRes] = await Promise.all([
          fetch(`${API_BASE_URL}/EducationAndInternship/Website/training-categories`),
          fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`)
        ]);

        const categoriesData = await categoriesRes.json();
        const sectionDataResult = await sectionRes.json();
        console.log('API Responses:', { categoriesData, sectionDataResult });

        if (categoriesData.success && categoriesData.data?.categories) {
          // Filter categories that have trainings or show all
          const allCategories = categoriesData.data.categories;
          setCategories(allCategories);

          // Set first category with trainings as active, or first category if none have trainings
          const firstWithTrainings = allCategories.find((cat: Category) => cat.training_count > 0);
          setActiveCategory(firstWithTrainings?.name || allCategories[0]?.name || "");
        }

        if (sectionDataResult.success && sectionDataResult.data?.bs) {
          setSectionData(sectionDataResult.data.bs);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get trainings for active category
  const activeTrainings = useMemo(() => {
    const activeData = categories.find(cat => cat.name === activeCategory);
    return activeData?.trainings || [];
  }, [categories, activeCategory]);

  // Get category names for tabs
  const categoryNames = useMemo(() => categories.map(cat => cat.name), [categories]);

  if (loading) {
    return (
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#FBFCFF]">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </div>
    );
  }

  if (error || categories.length === 0) {
    return (
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#FBFCFF]">
        <div className="text-center text-gray-500">
          {error || "No training categories available"}
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl md:text-3xl font-bold text-black pt-6 mb-4">
            {sectionData?.course_section_title ? (
              sectionData.course_section_title.includes("Forensic Training") ? (
                <>
                  {sectionData.course_section_title.split("Forensic Training")[0]}
                  <span className="relative inline-block">
                    <span className="relative z-10">Forensic Training</span>
                    <Image
                      src="/yellow-underline.png"
                      alt=""
                      width={260}
                      height={18}
                      className="absolute left-0 -bottom-1 z-0"
                    />
                  </span>{" "}
                  <br className="hidden md:block" />
                  {sectionData.course_section_title.split("Forensic Training")[1]}
                </>
              ) : (
                sectionData.course_section_title
              )
            ) : (
              <>
                Professional <span className="relative inline-block">
                  <span className="relative z-10">Forensic Training</span>
                  <Image src="/yellow-underline.png" alt="" width={260} height={18} className="absolute left-0 -bottom-1 z-0" />
                </span> <br className="hidden md:block" /> & Internship
              </>
            )}
          </h1>
          {sectionData?.course_section_subtitle && (
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed mb-8">
              {sectionData.course_section_subtitle}
            </p>
          )}
        </motion.div>

        <motion.div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-12 border-b border-gray-100" variants={itemSlideUpVariants}>
          {categoryNames.map(cat => (
            <TrainingTabTitle key={cat} title={cat} isActive={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
          ))}
        </motion.div>

        <motion.div className="relative pb-12" variants={itemSlideUpVariants}>
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {activeTrainings.length > 0 ? (
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
                  {activeTrainings.map((item, index) => (
                    <SwiperSlide key={item.id} className="h-auto">
                      <TrainingCard training={item} isFirst={index === 0} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No trainings available in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {activeTrainings.length > 0 && (
            <>
              <button onClick={() => swiperRef.current?.slidePrev()} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full hidden xl:flex items-center justify-center text-[#008DD2] hover:scale-110 cursor-pointer transition-all border border-gray-50">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => swiperRef.current?.slideNext()} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#008DD2] shadow-lg rounded-full hidden xl:flex items-center justify-center text-white hover:scale-110 cursor-pointer transition-all">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrainingInternshipSection;