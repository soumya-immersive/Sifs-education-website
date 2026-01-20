"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Play, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
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
                // If it's a new page (load more), append data, otherwise replace if it's page 1 (refresh/initial)
                // Actually for "Load More" style, we usually append.
                // But here I will implement a "Load More" button that increases the limit or fetches the next page and appends.
                // Given the API has pagination, appending seems best for a gallery.

                if (page === 1) {
                    setVideos(result.data.data || []);
                } else {
                    setVideos(prev => [...prev, ...(result.data.data || [])]);
                }

                setTotalPages(result.data.pagination?.total_pages || 1);
                setTotalRecords(result.data.pagination?.total || 0);
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

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchVideos(nextPage);
        }
    };

    const handleLoadLess = () => {
        setCurrentPage(1);
        fetchVideos(1);
        // Optional: scroll to top of grid
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
            <div id="video-grid" className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((item) => (
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
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
            )}

            {/* Load More/Less Button */}
            {!loading && (
                <div className="w-full flex justify-center pb-12 mt-8">
                    {currentPage < totalPages ? (
                        <button
                            onClick={handleLoadMore}
                            className="cursor-pointer flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] text-white font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95"
                        >
                            Load More <ChevronDown className="w-5 h-5" />
                        </button>
                    ) : videos.length > ITEMS_PER_PAGE ? (
                        <button
                            onClick={handleLoadLess}
                            className="cursor-pointer flex items-center gap-2 px-8 py-3 rounded-lg bg-gray-800 hover:bg-black text-white font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95"
                        >
                            Load Less <ChevronUp className="w-5 h-5" />
                        </button>
                    ) : null}
                </div>
            )}
        </div>
    );
}
