// components/home/GlobalInfluence.tsx
"use client";

import Image from "next/image";
import { motion, spring, easeOut, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { X } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import "swiper/css";
import "swiper/css/pagination";

// Types
interface Portfolio {
  id: number;
  language_id: number;
  client_category_id: number;
  title: string;
  slug: string;
  start_date: string | null;
  submission_date: string | null;
  client_name: string | null;
  tags: string;
  featured_image: string;
  service_id: number | null;
  content: string | null;
  status: string | null;
  serial_number: number;
  meta_keywords: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  language_name: string;
  language_code: string;
  rtl: number;
  client_category_name: string;
  featured_image_url: string;
}

interface SectionData {
  global_influence_title: string;
  global_influence_subtitle: string;
}

// --------------------
//    VARIANTS
// --------------------

// Main container (stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

// Logo animation
const logoItemVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: spring,
      stiffness: 100,
      damping: 14,
    },
  },
};

// Text fade-up
const textItemVariants: Variants = {
  hidden: { y: 15, },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: easeOut,
      duration: 0.5,
    },
  },
};

// Modal variants
const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { opacity: 0, scale: 0.9, y: 20 },
};

export default function GlobalInfluence() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [sectionData, setSectionData] = useState<SectionData>({
    global_influence_title: "Creating Global Influence",
    global_influence_subtitle: "Influencing and spreading forensic skills globally.",
  });
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result);

        if (result) {
          // 1. Handle Section Data (BS)
          // Check result.data.bs, result.data.data.bs (nested), then fallback to result.bs
          const bsData = result.data?.bs || result.data?.data?.bs || result.bs;

          if (bsData) {
            setSectionData({
              // Map API keys to component state keys
              global_influence_title: bsData.portfolio_section_title || bsData.global_influence_title || "Creating Global Influence",
              global_influence_subtitle: bsData.portfolio_section_text || bsData.global_influence_subtitle || "Influencing and spreading forensic skills globally.",
            });
          }

          // 2. Handle Portfolios
          // Check result.data.portfolios, result.data.data.portfolios (nested), then fallback to result.portfolios
          const portfoliosList = result.data?.portfolios || result.data?.data?.portfolios || result.portfolios;

          if (Array.isArray(portfoliosList)) {
            console.log('Portfolios found:', portfoliosList.length);
            setPortfolios(portfoliosList);
          } else {
            console.warn('No portfolios found in API response');
            setPortfolios([]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPortfolios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPortfolio(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Left decorative stars */}
      <motion.div
        className="absolute left-48 md:left-48 bottom-1 -translate-y-1/2 z-10 hidden lg:block"
        animate={{
          y: [-10, 10, -10],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/global-influence/stars.png"
          alt="Decorative stars"
          width={60}
          height={60}
          className="max-w-full h-auto opacity-70"
        />
      </motion.div>

      {/* Right decorative leaf */}
      <motion.div
        className="absolute right-72 md:right-72 top-1/2 -translate-y-1/2 z-0 hidden lg:block"
        animate={{
          y: [-12, 12, -12],
          transition: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          },
        }}
      >
        <Image
          src="/global-influence/leaf.png"
          alt="Decorative leaf"
          width={60}
          height={60}
          className="max-w-full h-auto opacity-70"
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Bottom layers */}
          <div className="absolute inset-x-4 -bottom-5 h-5 rounded-2xl bg-white/80 shadow-md" />
          <div className="absolute inset-x-8 -bottom-10 h-5 rounded-2xl bg-white/60 shadow-sm" />

          {/* Main card */}
          <div className="relative rounded-3xl bg-white px-6 py-10 shadow-xl md:px-10">
            <div className="text-center">
              {loading ? (
                /* Title Skeleton */
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-4 w-96 max-w-full bg-gray-100 rounded-md animate-pulse" />
                </div>
              ) : (
                <>
                  <motion.h2
                    className="text-2xl font-extrabold text-gray-900 md:text-3xl"
                    variants={textItemVariants}
                  >
                    {sectionData.global_influence_title}
                  </motion.h2>

                  <motion.p
                    className="mt-2 text-sm text-gray-500 md:text-base"
                    variants={textItemVariants}
                  >
                    {sectionData.global_influence_subtitle}
                  </motion.p>
                </>
              )}
            </div>

            {/* Logos Slider */}
            <motion.div className="mt-10" variants={logoItemVariants}>
              {loading ? (
                /* Slider Skeleton */
                <div className="flex items-center justify-center gap-4 overflow-hidden">
                  {/* Show multiple skeleton items to mimic the slider */}
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-20 w-28 md:w-36 flex-shrink-0 rounded-lg border border-gray-100 bg-gray-50 p-2 shadow-sm animate-pulse"
                    >
                      <div className="h-full w-full bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : portfolios.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={20}
                  slidesPerView={2}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  breakpoints={{
                    480: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 6 },
                  }}
                  className="portfolio-swiper pb-10"
                >
                  {portfolios.map((portfolio) => (
                    <SwiperSlide key={portfolio.id}>
                      <motion.div
                        className="flex h-20 w-full items-center justify-center cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPortfolio(portfolio)}
                      >
                        <div className="h-16 w-28 md:h-20 md:w-36 overflow-hidden rounded-lg border border-gray-100 bg-white p-2 shadow-sm transition-shadow group-hover:shadow-md flex items-center justify-center">
                          <img
                            src={portfolio.featured_image_url}
                            alt={portfolio.title}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-center text-gray-500">No portfolios available</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedPortfolio && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedPortfolio(null)}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition-colors shadow-md"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Image */}
              <div className="h-48 md:h-56 bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-6">
                <img
                  src={selectedPortfolio.featured_image_url}
                  alt={selectedPortfolio.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full mb-3">
                  {selectedPortfolio.client_category_name}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {selectedPortfolio.title}
                </h3>

                {selectedPortfolio.meta_description && (
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {selectedPortfolio.meta_description}
                  </p>
                )}

                {selectedPortfolio.tags && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPortfolio.tags.split(",").slice(0, 5).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .portfolio-swiper .swiper-pagination-bullet {
          background: #a855f7;
          opacity: 0.4;
        }
        .portfolio-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #7c3aed;
        }
      `}</style>
    </section>
  );
}
