"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../lib/config";
import PageBanner from "@/components/common/PageBanner";
import { motion, easeOut } from "framer-motion";

const ITEMS_PER_PAGE = 9;

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPageEnabled, setIsPageEnabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fetchVideos = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/EducationAndInternship/Website/front/video-gallery?page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      const result = await response.json();

      if (!result.success && (result.message === "Video gallery section is disabled" || result.message?.includes("disabled"))) {
        setIsPageEnabled(false);
        setDisabledMessage(result.message);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch videos");
      }

      if (result.success && result.data) {
        setVideos(result.data.data || []);
        setTotalPages(result.data.pagination?.total_pages || 1);
        setTotalRecords(result.data.pagination?.total || 0);
        setCurrentPage(page);
      } else if (!result.success) {
        setError(result.message || "Failed to load videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchVideos(page);
    // Scroll to top of grid
    const gridElement = document.getElementById('video-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoClick = (url: string) => {
    // Remove quotes if present in the URL from API
    const cleanUrl = url.replace(/"/g, '');
    window.open(cleanUrl, "_blank");
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Show 5 page numbers at a time

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      // Adjust if near the start
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 5);
      }

      // Adjust if near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 4);
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading && videos.length === 0) {
    return (
      <div className="w-full mb-12 bg-[#FBFCFF]">
        <PageBanner
          title="Visual Gallery"
          subtitle="Forensic Science Events Video Showcase"
          bgImage="/gallery-banner.png"
        />
        <div className="max-w-7xl mx-auto px-4 py-32">
          <div className="flex flex-col justify-center items-center">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-600 animate-pulse">Fetching latest videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-12 bg-[#FBFCFF]">
      {/* Banner Section */}
      <PageBanner
        title="Visual Gallery"
        subtitle="Forensic Science Events Video Showcase"
        bgImage="/gallery-banner.png"
      />


      {!isPageEnabled ? (
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
      ) : error ? (
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
      ) : null}

      {!error && isPageEnabled && (
        <div id="video-grid" className="max-w-7xl mx-auto px-4 py-5 min-h-[400px]">
          {videos.length === 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Play className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Videos Available</h3>
              <p className="text-gray-500 max-w-sm">We haven't uploaded any videos yet. Please check back soon for event highlights.</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {videos.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  onClick={() => handleVideoClick(item.video_url)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-3 border border-gray-100 cursor-pointer group"
                >
                  <div className="relative w-full h-52 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
                    <Image
                      src={item.gallery_image || "/placeholder-video.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-video.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                    {/* Duration badge or similar could go here if available */}
                  </div>

                  <div className="mt-5 px-2 pb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors" title={item.title}>
                      {item.title.replace(/"/g, '')}
                    </h3>
                    <div className="flex items-center gap-2 mt-3 text-gray-500">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                        <Play className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8 pb-32">
          <div className="flex justify-center items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1 ${currentPage > 1
                ? "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-600">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all min-w-[40px] ${currentPage === page
                      ? "bg-indigo-600 text-white cursor-pointer"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                      }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1 ${currentPage < totalPages
                ? "bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Page Info */}
          {/* <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div> */}
        </div>
      )}

    </div>
  );
}