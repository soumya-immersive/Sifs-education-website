"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, Users, ChevronRight, ChevronLeft, Search, Filter, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";

interface ConferenceEvent {
    id: number;
    title: string;
    sub_title: string;
    slug: string;
    mode_of_study: string;
    image_url: string;
    formatted_date: string;
    event_category_id: number;
    int_price_level_1: string;
    price_level_1: string;
    duration: string;
}

interface PaginationData {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_previous: boolean;
    has_next: boolean;
}

export default function ConferencePage() {
    const router = useRouter();
    const [events, setEvents] = useState<ConferenceEvent[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage]);

    const fetchEvents = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/EducationAndInternship/Website/event/conference?page=${page}&limit=9`,
                { cache: "no-store" }
            );
            const result = await response.json();

            if (result.success && result.data?.data) {
                setEvents(result.data.data);
                setPagination(result.data.pagination);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleEventClick = (slug: string) => {
        router.push(`/conference/${slug}`);
    };

    const getCategoryInfo = (categoryId: number) => {
        const categories: Record<number, { color: string; bg: string; label: string }> = {
            2: { color: "text-orange-600", bg: "bg-orange-100", label: "Workshop" },
            3: { color: "text-purple-600", bg: "bg-purple-100", label: "Webinar" },
            4: { color: "text-blue-600", bg: "bg-blue-100", label: "Conference" },
        };
        return categories[categoryId] || { color: "text-gray-600", bg: "bg-gray-100", label: "Event" };
    };

    const getMonthDay = (dateString: string) => {
        const date = new Date(dateString);
        return {
            month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
            day: date.getDate(),
            year: date.getFullYear(),
        };
    };

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === null || event.event_category_id === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = [
        { id: null, label: "All Events" },
        { id: 4, label: "Conference" },
        { id: 2, label: "Workshop" },
        { id: 3, label: "Webinar" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                            Forensic Science Events
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Explore cutting-edge conferences, workshops, and webinars in forensic science
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Calendar className="w-4 h-4" />
                                <span>{pagination?.total || 0}+ Events</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Users className="w-4 h-4" />
                                <span>Expert Speakers</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Clock className="w-4 h-4" />
                                <span>Live & Recorded</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search events by title..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-6 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {/* Category Filter */}
                            <div className="flex gap-2 flex-wrap">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id || "all"}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat.id
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                        <p className="text-gray-600">Loading events...</p>
                    </div>
                ) : (
                    <>
                        {/* Events Grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                            >
                                {filteredEvents.map((event, index) => {
                                    const { month, day, year } = getMonthDay(event.formatted_date);
                                    const categoryInfo = getCategoryInfo(event.event_category_id);

                                    return (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            onClick={() => handleEventClick(event.slug)}
                                            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
                                        >
                                            {/* Event Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                {event.image_url ? (
                                                    <Image
                                                        src={event.image_url}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100"></div>
                                                )}

                                                {/* Date Badge */}
                                                <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 text-center min-w-[70px]">
                                                    <div className="text-xs font-bold text-red-600">{month}</div>
                                                    <div className="text-2xl font-extrabold text-gray-900">{day}</div>
                                                    <div className="text-xs text-gray-600">{year}</div>
                                                </div>

                                                {/* Category Badge */}
                                                <div className={`absolute top-4 right-4 ${categoryInfo.bg} ${categoryInfo.color} px-3 py-1 rounded-full text-xs font-bold`}>
                                                    {categoryInfo.label}
                                                </div>
                                            </div>

                                            {/* Event Details */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3.5rem]">
                                                    {event.title.replace(/^"|"$/g, "")}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                                                    {event.sub_title}
                                                </p>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{event.mode_of_study}</span>
                                                    </div>

                                                    <button className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                                                        View
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {/* No Results */}
                        {filteredEvents.length === 0 && (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
                                <p className="text-gray-600">Try adjusting your search or filters</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination && pagination.total_pages > 1 && filteredEvents.length > 0 && (
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={!pagination.has_previous}
                                        className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-blue-500"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {Array.from({ length: Math.min(pagination.total_pages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (pagination.total_pages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= pagination.total_pages - 2) {
                                            pageNum = pagination.total_pages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-4 py-2 rounded-xl font-medium transition-all ${currentPage === pageNum
                                                    ? "bg-blue-600 text-white shadow-lg scale-110"
                                                    : "border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-500"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={!pagination.has_next}
                                        className="p-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:border-blue-500"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Summary */}
                                <div className="text-sm text-gray-600">
                                    Showing {pagination.showing_from} to {pagination.showing_to} of{" "}
                                    {pagination.total} events
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Comprehend Forensic Innovatively
                        </h2>
                        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join students, teachers, professionals, and researchers to share and
                            discuss knowledge and ideas in forensic science
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => router.push("/events")}
                                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Explore All Events
                            </button>
                            <button
                                onClick={() => router.push("/contact")}
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
