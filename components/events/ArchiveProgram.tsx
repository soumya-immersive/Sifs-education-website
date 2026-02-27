"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "../../lib/config";
import { ensureHttps } from "../../lib/imageUtils";

/* ----------------------
        Types
---------------------- */
interface ArchiveEvent {
  id: number;
  title: string;
  slug: string;
  banner_title?: string;
  banner_subtitle?: string;
  formatted_date?: string;
  start_date?: string;
  end_date?: string;
  explore?: {
    image_url: string;
  };
}

interface PaginationInfo {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_previous: boolean;
  has_next: boolean;
}

interface SummaryInfo {
  showing: string;
  search_info: string;
}

interface ArchiveProgramProps {
  archiveEvents?: ArchiveEvent[];
}

/* ----------------------
        Animations
---------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

/* ----------------------
        Card
---------------------- */
const ProgramCard = ({ program }: { program: ArchiveEvent }) => {
  const imageSrc = ensureHttps(program.explore?.image_url) || "/event/1.png";

  return (
    <motion.div
      variants={itemVariants}
      className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Visual Header / Banner */}
      <div className="relative h-44 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={program.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized={imageSrc.startsWith("http")}
          />
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-50" />
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-600">
            <Calendar className="w-3 h-3 text-indigo-500" />
            {program.formatted_date?.split(',')[1]?.trim() || "Archive"}
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <p className="text-xs font-semibold text-indigo-600">
            {program.formatted_date || "Past Event"}
          </p>
        </div>

        <h3 className="text-lg h-[45px] overflow-hidden font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {program.title}
        </h3>

        <div className="mt-auto pt-6 border-t border-gray-50">
          <Link href={`/events/${program.slug}`}>
            <button className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-[#3E58EE] hover:to-[#B565E7] hover:text-white hover:shadow-lg hover:shadow-indigo-200 group/btn">
              Explore Event Details
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1.5" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProgramSkeleton = () => (
  <div className="group h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
    <div className="relative h-44 bg-gray-200" />
    <div className="p-5 flex flex-col flex-grow space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-full bg-gray-200 rounded" />
        <div className="h-5 w-4/5 bg-gray-200 rounded" />
      </div>
      <div className="mt-auto pt-6 border-t border-gray-50">
        <div className="h-10 w-full bg-gray-100 rounded-xl" />
      </div>
    </div>
  </div>
);

/* ----------------------
      Main Component
---------------------- */
export default function ArchiveProgram({ archiveEvents = [] }: ArchiveProgramProps) {
  const swiperRef = useRef<any>(null);
  const [events, setEvents] = useState<ArchiveEvent[]>(archiveEvents);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [isViewAll, setIsViewAll] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [summary, setSummary] = useState<SummaryInfo | null>(null);

  const fetchArchiveData = async (year?: number, page: number = 1) => {
    setLoading(true);
    try {
      const yearParam = year ? `&year=${year}` : "";
      const response = await fetch(`${API_BASE_URL}/EventManagement/Website/events?type=archive${yearParam}&page=${page}`, {
        cache: 'no-store'
      });
      const result = await response.json();

      if (result.success && result.data) {
        const rawEvents = result.data.data || [];

        // Fetch extreme details for each event to get the explore image
        const detailedEvents = await Promise.all(
          rawEvents.map(async (apiEvent: any) => {
            try {
              const detailRes = await fetch(`${API_BASE_URL}/EventManagement/Website/events/${apiEvent.slug}?_t=${Date.now()}`, {
                cache: 'no-store'
              });
              if (detailRes.ok) {
                const detailData = await detailRes.json();
                if (detailData.success && detailData.data) {
                  const eventDetail = detailData.data.event;
                  const exploreObj = eventDetail?.explore || detailData.data.eventExplore;
                  return {
                    ...apiEvent,
                    explore: exploreObj
                  };
                }
              }
            } catch (err) {
              console.error(`Error fetching detail for ${apiEvent.slug}:`, err);
            }
            return apiEvent;
          })
        );

        setEvents(detailedEvents);
        if (result.data.available_years && result.data.available_years.length > 0) {
          const years = [...result.data.available_years].sort((a, b) => b - a);
          setAvailableYears(years);
          // If no year was selected, set it to the latest available year
          if (!year) {
            setSelectedYear(years[0]);
          }
        }
        if (result.data.pagination) {
          setPagination(result.data.pagination);
        }
        if (result.data.summary) {
          setSummary(result.data.summary);
        }
      }
    } catch (error) {
      console.error("Error fetching archive events:", error);
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    fetchArchiveData(selectedYear, currentPage);
  }, [selectedYear, currentPage]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  return (
    <section id="archive-section" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-[2px] bg-indigo-500" />
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Memories & Records</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            >
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3E58EE] to-[#B565E7]">Archives</span>
            </motion.h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Year Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 max-w-full lg:max-w-[480px] overflow-x-auto scrollbar-hide scroll-smooth"
            >
              <div className="flex items-center gap-3 min-w-max px-2">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${selectedYear === year
                      ? "bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white shadow-lg shadow-indigo-100 scale-105"
                      : "text-gray-500 hover:text-[#3E58EE] hover:bg-indigo-50"
                      }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </motion.div>

            <button
              onClick={() => {
                setIsViewAll(!isViewAll);
                setCurrentPage(1);
              }}
              className="h-full px-6 py-4 rounded-2xl font-bold text-sm text-[#3E58EE] border-2 border-indigo-50 hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2 group/all"
            >
              {isViewAll ? "Show Slider" : "View All"}
              <ArrowRight className={`w-4 h-4 transition-transform ${isViewAll ? "rotate-90" : "group-hover/all:translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProgramSkeleton key={i} />
                ))}
              </div>
            </motion.div>
          ) : events.length > 0 ? (
            <motion.div
              key={isViewAll ? "grid" : "slider"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative"
            >
              {!isViewAll ? (
                <>
                  <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1.2}
                    grabCursor={true}
                    breakpoints={{
                      640: { slidesPerView: 2.2 },
                      1024: { slidesPerView: 3 },
                      1280: { slidesPerView: 4 },
                    }}
                    className="!pb-12"
                  >
                    {events.map((program) => (
                      <SwiperSlide key={program.id} className="h-auto">
                        <ProgramCard program={program} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Navigation Controls */}
                  <div className="flex justify-center mt-8 lg:contents">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="lg:absolute lg:-left-14 lg:top-1/2 lg:-translate-y-1/2 w-14 h-14 bg-white text-gray-700 rounded-full shadow-2xl z-20 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#3E58EE] hover:to-[#B565E7] hover:text-white transition-all duration-500 border border-gray-50 mx-2 hover:scale-110"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-7 h-7" />
                    </button>

                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="lg:absolute lg:-right-14 lg:top-1/2 lg:-translate-y-1/2 w-14 h-14 bg-white text-gray-700 rounded-full shadow-2xl z-20 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#3E58EE] hover:to-[#B565E7] hover:text-white transition-all duration-500 border border-gray-50 mx-2 hover:scale-110"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-7 h-7" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-10">
                  {/* Summary Info */}
                  {/* {summary && (
                    <div className="flex items-center gap-3 py-4 px-6 bg-white border border-gray-100 rounded-2xl shadow-sm w-fit">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                        {summary.showing}
                      </p>
                    </div>
                  )} */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {events.map((program) => (
                      <div key={program.id} className="h-auto">
                        <ProgramCard program={program} />
                      </div>
                    ))}
                  </div>

                  {/* Vertical Pagination */}
                  {pagination && pagination.total_pages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-gray-100 shadow-sm w-fit mx-auto">
                      <button
                        onClick={() => {
                          setCurrentPage(prev => Math.max(1, prev - 1));
                          window.scrollTo({ top: document.getElementById('archive-section')?.offsetTop || 0, behavior: 'smooth' });
                        }}
                        disabled={!pagination.has_previous}
                        className={`p-3 rounded-xl transition-all ${!pagination.has_previous ? "opacity-30 cursor-not-allowed" : "hover:bg-indigo-50 text-indigo-600 active:scale-95"}`}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: pagination.total_pages }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setCurrentPage(i + 1);
                              window.scrollTo({ top: document.getElementById('archive-section')?.offsetTop || 0, behavior: 'smooth' });
                            }}
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1
                              ? "bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white shadow-lg shadow-indigo-100"
                              : "text-gray-500 hover:bg-gray-100"}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPage(prev => Math.min(pagination.total_pages, prev + 1));
                          window.scrollTo({ top: document.getElementById('archive-section')?.offsetTop || 0, behavior: 'smooth' });
                        }}
                        disabled={!pagination.has_next}
                        className={`p-3 rounded-xl transition-all ${!pagination.has_next ? "opacity-30 cursor-not-allowed" : "hover:bg-indigo-50 text-indigo-600 active:scale-95"}`}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100"
            >
              <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Archives Found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                We couldn't find any archived events for the year {selectedYear}. Please try selecting another year.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
