"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../lib/config";

const ITEMS_PER_LOAD = 6;

const categories = [
    "All",
    "International Workshop",
    "Police Training",
    "Learner Training",
    "Forensic Events",
    "Corporate Training",
    "Conferences",
    "Media Presence",
    "Others"
];

export default function ImageGalleryPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage, activeCategory]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedItem]);

    const fetchEvents = async (page: number) => {
        try {
            setLoading(true);

            // Fetch all events using the new API endpoint
            let apiUrl = `${API_BASE_URL}/EducationAndInternship/Website/front/image-gallery?page=${page}&limit=100`;

            console.log("🔍 Active Category:", activeCategory);
            console.log("📡 API URL:", apiUrl);

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }

            const result = await response.json();

            let allEvents = result.data?.data || [];

            // Map the new API response to component fields
            allEvents = allEvents.map((item: any) => ({
                id: item.id,
                title: item.title,
                // New API returns category_name, mapping it to mode_of_study
                mode_of_study: item.category_name,
                // Format the created_at date
                formatted_date: new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                }),
                // Use first image from images array if available, otherwise use gallery_image
                image_url: item.images?.[0]?.image || item.gallery_image,
                sub_title: item.detail,
                event_outline: item.detail,
                case_studies: "",
                ...item
            }));

            // Client-side filtering by category
            if (activeCategory !== "All") {
                allEvents = allEvents.filter((event: any) => {
                    const eventCategory = (event.mode_of_study || "").toLowerCase();
                    const active = activeCategory.toLowerCase();
                    return eventCategory.includes(active) || active.includes(eventCategory);
                });
            }

            console.log("✅ Total Events from API:", result.data?.data?.length || 0);
            console.log("🔍 Filtered Events:", allEvents.length);
            console.log("📊 First filtered event:", allEvents[0]?.title || "No events");

            setEvents(allEvents);
            setTotalPages(1); // Client-side filtering, so single page
        } catch (error) {
            console.error("❌ Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (visibleCount < events.length) {
            setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
        } else if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
            setVisibleCount(ITEMS_PER_LOAD);
        }
    };

    const handleLoadLess = () => {
        setVisibleCount(ITEMS_PER_LOAD);
        setCurrentPage(1);
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    const hasMore = visibleCount < events.length || currentPage < totalPages;

    return (
        <div className="w-full relative mb-24">
            {/* TOP BANNER IMAGE */}
            <div className="w-full h-52 md:h-64 relative">
                <Image
                    src="/gallery-banner.png"
                    alt="Gallery Banner"
                    fill
                    className="object-cover"
                />
            </div>

            {/* TITLE SECTION */}
            <div className="text-center py-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    Forensic Science Events
                </h2>
                <p className="text-lg text-gray-600 mt-1">Photo Highlights</p>
            </div>

            {/* CATEGORY FILTER TABS */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className="relative flex items-center">
                    {/* Left Arrow */}
                    <button
                        onClick={() => {
                            const container = document.getElementById('category-scroll');
                            if (container) {
                                container.scrollBy({ left: -200, behavior: 'smooth' });
                            }
                        }}
                        className="absolute left-0 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Scrollable Container */}
                    <div
                        id="category-scroll"
                        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-10"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setCurrentPage(1);
                                    setVisibleCount(ITEMS_PER_LOAD);
                                }}
                                className={`px-6 py-2.5 cursor-pointer text-sm font-medium rounded-full whitespace-nowrap transition-all ${activeCategory === category
                                    ? "bg-[#4F46E5] text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => {
                            const container = document.getElementById('category-scroll');
                            if (container) {
                                container.scrollBy({ left: 200, behavior: 'smooth' });
                            }
                        }}
                        className="absolute right-0 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* LOADING STATE */}
            {loading && events.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                </div>
            ) : (
                <>
                    {/* GALLERY GRID */}
                    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.slice(0, visibleCount).map((event) => (
                            <div
                                key={event.id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 border"
                            >
                                {/* IMAGE */}
                                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                    <Image
                                        src={event.image_url || "/gallery1.png"}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">{event.mode_of_study}</p>
                                    <p className="text-xs text-gray-500 mt-1">{event.formatted_date}</p>
                                </div>

                                {/* LEARN MORE BUTTON */}
                                <button
                                    onClick={() => setSelectedItem(event)}
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
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* LOAD MORE / LOAD LESS BUTTONS */}
                    {events.length > 0 && (
                        <div className="w-full flex justify-center pb-12">
                            {hasMore ? (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="cursor-pointer flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white font-medium hover:brightness-110 shadow-lg transition-all disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        "Load More →"
                                    )}
                                </button>
                            ) : visibleCount > ITEMS_PER_LOAD && (
                                <button
                                    onClick={handleLoadLess}
                                    className="cursor-pointer flex items-center px-8 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-black shadow-lg transition-all"
                                >
                                    Load Less ↑
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}

            {/* MODAL POPUP */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Image */}
                        <div className="relative h-64 sm:h-80 w-full">
                            <Image
                                src={selectedItem.image_url || "/gallery1.png"}
                                alt={selectedItem.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 sm:p-10">
                            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">
                                {selectedItem.mode_of_study} • {selectedItem.formatted_date}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                                {selectedItem.title}
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] my-4 rounded-full"></div>

                            {selectedItem.sub_title && (
                                <p className="text-gray-700 font-medium mb-4">
                                    {selectedItem.sub_title}
                                </p>
                            )}

                            <div
                                className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: selectedItem.event_outline || selectedItem.case_studies || "" }}
                            />

                            <button
                                onClick={() => setSelectedItem(null)}
                                className="mt-8 w-full sm:w-auto px-10 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-black transition-all shadow-lg"
                            >
                                Close Window
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
