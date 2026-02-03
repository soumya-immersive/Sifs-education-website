"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { API_BASE_URL, BASE_URL } from "../../lib/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ITEMS_PER_LOAD = 6;

export default function ImageGalleryPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState<any>(null);

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

            // Set Categories from API if available
            if (result.data?.categories) {
                const fetchedCategories = ["All", ...result.data.categories.map((c: any) => c.name)];
                if (JSON.stringify(fetchedCategories) !== JSON.stringify(categories)) {
                    setCategories(fetchedCategories);
                }
            }

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
                // Use gallery_image with specific path if available, otherwise fallback to first image in images array
                image_url: item.gallery_image
                    ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Gallery-Featured/${item.gallery_image}`
                    : (item.images?.[0]?.image || null),
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
            if (allEvents.length > 0) {
                console.log("🖼️ Sample Image URL:", allEvents[0].image_url);
            }

            setEvents(allEvents);
            // Use API pagination if available, otherwise default to 1
            setTotalPages(result.data?.pagination?.total_pages || 1);
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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => {
                        setSelectedItem(null);
                        setActiveIndex(0);
                    }}
                >
                    <div
                        className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-20">
                            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                                {selectedItem.title}
                            </h3>
                            <button
                                onClick={() => {
                                    setSelectedItem(null);
                                    setActiveIndex(0);
                                }}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6">
                            {/* Main Image Slider */}
                            <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden bg-gray-50 border group">
                                {selectedItem.images && selectedItem.images.length > 0 ? (
                                    <>
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            onSwiper={setSwiperRef}
                                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                                            loop={true}
                                            className="h-full w-full"
                                        >
                                            {selectedItem.images.map((imgObj: any, index: number) => {
                                                const filename = imgObj.image?.split('/').pop();
                                                const imageUrl = filename
                                                    ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Gallery-Slider/${filename}`
                                                    : "/gallery1.png";

                                                return (
                                                    <SwiperSlide key={imgObj.id || index}>
                                                        <div className="relative h-full w-full">
                                                            <Image
                                                                src={imageUrl}
                                                                alt={`Slide ${index + 1}`}
                                                                fill
                                                                className="object-contain"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                        </Swiper>

                                        {/* Custom Navigation Arrows */}
                                        <button
                                            onClick={() => swiperRef?.slidePrev()}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => swiperRef?.slideNext()}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={selectedItem.image_url}
                                            alt={selectedItem.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails Row */}
                            {selectedItem.images && selectedItem.images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-thin scrollbar-thumb-gray-300">
                                    {selectedItem.images.map((imgObj: any, index: number) => {
                                        const filename = imgObj.image?.split('/').pop();
                                        const imageUrl = filename
                                            ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Gallery-Slider/${filename}`
                                            : "/gallery1.png";

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => swiperRef?.slideToLoop(index)}
                                                className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${activeIndex === index ? "border-indigo-600 ring-2 ring-indigo-200" : "border-transparent opacity-60 hover:opacity-100"
                                                    }`}
                                            >
                                                <Image
                                                    src={imageUrl}
                                                    alt={`Thumb ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Description Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                                        {selectedItem.mode_of_study}
                                    </span>
                                    <span>{selectedItem.formatted_date}</span>
                                </div>
                                <div
                                    className="text-gray-700 leading-relaxed text-base"
                                    dangerouslySetInnerHTML={{ __html: selectedItem.event_outline }}
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t bg-gray-50 flex justify-end sticky bottom-0 z-20">
                            <button
                                onClick={() => {
                                    setSelectedItem(null);
                                    setActiveIndex(0);
                                }}
                                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors border"
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
