"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import PageBanner from "@/components/common/PageBanner";
import { motion, easeOut } from "framer-motion";

/* ---------------- Types ---------------- */

interface GalleryImage {
  id: number;
  gallery_id: number;
  thumbnail: string | null;
  image: string;
  created_at: string;
  updated_at: string;
}

interface GalleryItem {
  id: number;
  language_id: number;
  gallery_category_id: number;
  title: string;
  slug: string;
  detail: string;
  gallery_image: string;
  status: number;
  serial_number: number;
  created_at: string;
  updated_at: string;
  language_code: string;
  language_name: string;
  category_name: string;
  featured_image_url: string;
  images: GalleryImage[];
  image_count: number;
}

interface Category {
  id: number;
  language_id: number;
  name: string;
  status: number;
  serial_number: number;
  is_active: boolean;
}

interface PaginationInfo {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  showing_from: number;
  showing_to: number;
  has_previous: boolean;
  has_next: boolean;
  search_query: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  data: {
    data: GalleryItem[];
    pagination: PaginationInfo;
    summary: {
      showing: string;
      search_info: string;
    };
    categories: Category[];
  };
}

const ITEMS_PER_PAGE = 6; // 2 rows (3 columns each) for display

/* ---------------- Component ---------------- */

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [allGalleryItems, setAllGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fetchProgress, setFetchProgress] = useState({ current: 0, total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageEnabled, setIsPageEnabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState("");

  // Reset slider index when modal opens
  useEffect(() => {
    if (selectedItem) {
      setCurrentImageIndex(0);
    }
  }, [selectedItem]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedItem && selectedItem.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedItem.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItem && selectedItem.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length);
    }
  };

  // Auto-slide effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (selectedItem && selectedItem.images.length > 1) {
      interval = setInterval(() => {
        nextImage();
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedItem, currentImageIndex]);

  // Fetch all pages of gallery data
  useEffect(() => {
    const fetchAllGalleryData = async () => {
      try {
        setLoading(true);

        // First, fetch first page to get total pages
        const firstPageResponse = await fetch(
          `${API_BASE_URL}/EducationAndInternship/Website/front/image-gallery/?page=1&limit=10`
        );

        const firstPageData: ApiResponse = await firstPageResponse.json();

        if (!firstPageData.success && (firstPageData.message === "Gallery section is disabled" || firstPageData.message?.includes("disabled"))) {
          setIsPageEnabled(false);
          setDisabledMessage(firstPageData.message);
          setLoading(false);
          return;
        }

        if (!firstPageResponse.ok) {
          throw new Error(firstPageData.message || "Failed to fetch gallery data");
        }

        // Get total pages from pagination
        const totalPages = firstPageData.data.pagination.total_pages;
        const totalItems = firstPageData.data.pagination.total;

        setFetchProgress({ current: 1, total: totalPages });

        // Store all items
        let allItems = [...firstPageData.data.data];

        // Set categories from first page response
        if (firstPageData.data.categories) {
          setCategories(firstPageData.data.categories.filter(cat => cat.is_active));
        }

        // Fetch remaining pages if any
        if (totalPages > 1) {
          const pagePromises = [];

          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(
              fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/image-gallery/?page=${page}&limit=10`)
                .then(res => res.json())
                .then(data => {
                  setFetchProgress(prev => ({ ...prev, current: page }));
                  return data;
                })
            );
          }

          const remainingPagesData = await Promise.all(pagePromises);

          // Combine all items
          remainingPagesData.forEach(pageData => {
            if (pageData.success && pageData.data.data) {
              allItems = [...allItems, ...pageData.data.data];
            }
          });
        }

        // Sort items by serial_number or created_at to maintain order
        allItems.sort((a, b) => b.serial_number - a.serial_number);

        setAllGalleryItems(allItems);

      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGalleryData();
  }, []);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Filter items by selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return allGalleryItems;
    }
    return allGalleryItems.filter(item => item.gallery_category_id === selectedCategory);
  }, [allGalleryItems, selectedCategory]);

  // Get paginated items for current page
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  // Calculate pagination info
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const showingFrom = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const getCategoryName = (categoryId: number | "all"): string => {
    if (categoryId === "all") return "All Categories";
    const category = categories.find(c => c.id === categoryId);
    return category?.name || "Unknown Category";
  };


  if (loading) {
    return (
      <div className="w-full relative mb-24 bg-[#FBFCFF]">
        <PageBanner
          title="Gallery"
          subtitle="Photo Highlights"
          bgImage="/gallery-banner.png"
        />
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            {fetchProgress.total > 0 && (
              <p className="text-gray-600">
                Loading gallery... Page {fetchProgress.current} of {fetchProgress.total}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isPageEnabled) {
    return (
      <div className="w-full relative mb-24 bg-[#FBFCFF]">
        <PageBanner
          title="Gallery"
          subtitle="Photo Highlights"
          bgImage="/gallery-banner.png"
        />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-12 md:p-20 text-center max-w-3xl mx-auto"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{disabledMessage || "Section Disabled"}</h2>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full relative mb-24 bg-[#FBFCFF]">
        <PageBanner
          title="Gallery"
          subtitle="Photo Highlights"
          bgImage="/gallery-banner.png"
        />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-12 md:p-20 text-center max-w-3xl mx-auto"
          >
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notice</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }



  return (
    <div className="w-full relative mb-24">
      {/* 🔹 TOP BANNER IMAGE */}
      <PageBanner
        title="Gallery"
        subtitle="Photo Highlights"
        bgImage="/gallery-banner.png"
      />


      {/* 🔹 CATEGORY FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4 mt-24">
        <div className="flex gap-3 pb-3 overflow-x-auto scrollbar-hide">
          <button
            key="all"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-full whitespace-nowrap transition-all flex-shrink-0
              ${selectedCategory === "all"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            All ({allGalleryItems.length})
          </button>
          {categories.map((cat) => {
            const itemCount = allGalleryItems.filter(item => item.gallery_category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-full whitespace-nowrap transition-all flex-shrink-0
                  ${selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {cat.name} ({itemCount})
              </button>
            );
          })}
        </div>

        {/* Category info and result count */}
        {totalItems > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {showingFrom} to {showingTo} of {totalItems} records
            </span>
            <span className="font-medium">
              Category: {getCategoryName(selectedCategory)}
            </span>
          </div>
        )}
      </div>

      {/* 🔹 GALLERY GRID */}
      {paginatedItems.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-500">
          No items found in this category.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 border"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={item.featured_image_url || item.images[0]?.image || "/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (item.images[0]?.image) {
                      target.src = item.images[0].image;
                    }
                  }}
                />
              </div>

              {/* TEXT */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{item.category_name}</p>
              </div>

              {/* LEARN MORE BUTTON */}
              <button
                onClick={() => setSelectedItem(item)}
                className="mt-4 w-full cursor-pointer bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:brightness-110 text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                Learn More
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8 pb-12">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage > 1
                ? "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show current page, first, last, and pages around current
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 2
                  );
                })
                .map((page, index, array) => {
                  // Add ellipsis
                  if (index > 0 && array[index - 1] !== page - 1) {
                    return (
                      <span key={`ellipsis-${page}`} className="px-4 py-2">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === page
                        ? "bg-indigo-600 text-white cursor-pointer"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage < totalPages
                ? "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Next
            </button>
          </div>

          {/* Page info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}

      {/* 🔹 MODAL POPUP */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in duration-300 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🔹 Header */}
            <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
              <h3 className="text-lg font-semibold text-gray-800 truncate pr-8">
                {selectedItem.title}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar">
              {/* 🔹 Main Slider Section */}
              <div className="p-4 sm:p-6">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100 group">
                  <Image
                    src={selectedItem.images.length > 0
                      ? selectedItem.images[currentImageIndex].image
                      : (selectedItem.featured_image_url || "/placeholder.jpg")
                    }
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Navigation Arrows */}
                  {selectedItem.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter Overlay */}
                  {selectedItem.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      {currentImageIndex + 1} / {selectedItem.images.length}
                    </div>
                  )}
                </div>

                {/* 🔹 Thumbnails */}
                {selectedItem.images.length > 1 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedItem.images.map((img, idx) => (
                      <div
                        key={img.id}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 sm:w-28 aspect-video rounded-md overflow-hidden cursor-pointer transition-all border-2
                          ${currentImageIndex === idx ? "border-indigo-600 scale-105" : "border-transparent opacity-60 hover:opacity-100"}
                        `}
                      >
                        <Image
                          src={img.image}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 🔹 Content Section */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {selectedItem.category_name}
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs">
                      {selectedItem.images.length} Photo{selectedItem.images.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {selectedItem.title}
                  </h2>

                  <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                    {selectedItem.detail}
                  </div>
                </div>
              </div>
            </div>

            {/* 🔹 Footer */}
            <div className="p-4 bg-gray-50 border-t flex justify-end sticky bottom-0 z-10">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-all text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}