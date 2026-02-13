"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../lib/config";

const ITEMS_PER_PAGE = 9;

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchVideos = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/EducationAndInternship/Website/front/video-gallery?page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const result = await response.json();

      if (result.success && result.data) {
        setVideos(result.data.data || []);
        setTotalPages(result.data.pagination?.total_pages || 1);
        setTotalRecords(result.data.pagination?.total || 0);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
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

  return (
    <div className="w-full mb-12">
      {/* Banner Section */}
      <div className="w-full h-52 md:h-64 relative">
        <Image
          src="/gallery-banner.png"
          alt="Video Gallery Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Visual Gallery
          </h1>
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Forensic Science Events Video Showcase
        </h2>
        <p className="text-lg text-gray-600 mt-1">Event Highlights & More</p>
      </div>


      {/* Video Grid */}
      <div id="video-grid" className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          </div>
        ) : (
          videos.map((item) => (
            <div
              key={item.id}
              onClick={() => handleVideoClick(item.video_url)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-3 border cursor-pointer group"
            >
              <div className="relative w-full h-48 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                <Image
                  src={item.gallery_image || "/placeholder-video.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-video.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-16 h-16 text-white bg-indigo-600/80 rounded-full p-3 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-md font-semibold text-gray-900 text-center line-clamp-2" title={item.title}>
                  {item.title.replace(/"/g, '')}
                </h3>
                <p className="text-sm text-gray-600 mt-1 text-center">
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

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

      {/* No Videos State */}
      {!loading && videos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No videos found.
        </div>
      )}
    </div>
  );
}