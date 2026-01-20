"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/config";
import PageBanner from "../../components/common/PageBanner";
import type { Testimonial, TestimonialsResponse, Pagination } from "@/types/testimonial";

export default function AllTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Modal State
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const [modalLoading, setModalLoading] = useState(false);

    // Debounce Search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); // Reset to page 1 on search
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch Testimonials
    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            try {
                const query = debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : "";
                const response = await fetch(
                    `${API_BASE_URL}/EducationAndInternship/Website/testimonials?page=${currentPage}&limit=10${query}`
                );
                const json: TestimonialsResponse = await response.json();

                if (json.success && json.data) {
                    setTestimonials(json.data.data);
                    setPagination(json.data.pagination);
                }
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, [currentPage, debouncedSearch]);

    // Fetch Single Testimonial (Optional enhancement for Modal)
    const handleCardClick = async (id: number) => {
        // For now, we can just use the data we already have, but if we needed more details:
        // setModalLoading(true);
        // const res = await fetch(...)
        const selected = testimonials.find(t => t.id === id);
        if (selected) setSelectedTestimonial(selected);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && pagination && newPage <= pagination.total_pages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-white min-h-screen mb-20">
            <PageBanner
                title="Student Testimonials"
                subtitle="Home / Testimonials"
                bgImage="/contact-gradient-bg.png"
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-[#002147]">What Our Students Say</h2>
                        <p className="text-gray-500 mt-2">Discover success stories from our community</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search testimonials..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-50 h-64 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 mt-16">
                            <AnimatePresence mode="popLayout">
                                {testimonials.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onClick={() => handleCardClick(item.id)}
                                        className="relative bg-white border border-[#E0E7FF] rounded-2xl p-8 pt-16 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    >
                                        {/* User Image - Floating properly */}
                                        <div className="absolute -top-12 left-8">
                                            <div className="w-24 h-24 rounded-full border-[4px] border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback logic
                                                        const target = e.target as HTMLImageElement;
                                                        // Prevent loop
                                                        if (target.src.includes('ui-avatars')) return;

                                                        // Check if it was trying to load local backend first
                                                        if (item.image && !target.src.includes('localhost')) {
                                                            target.src = `http://localhost:3000/uploads/Education-And-Internship-Admin-Testimonial/${item.image}`;
                                                        } else {
                                                            target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.name) + '&background=random&color=fff&size=200';
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <h3 className="text-xl font-bold text-[#1E293B] mb-2 font-heading tracking-tight">
                                                {item.name}
                                            </h3>

                                            <p className="text-[#64748B] text-[15px] leading-relaxed mb-6 line-clamp-3">
                                                {item.comment}
                                            </p>

                                            <div className="text-[#F43f5E] font-bold text-sm uppercase tracking-wider">
                                                {item.rank}
                                            </div>
                                        </div>

                                        {/* Hover Effect Line */}
                                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-transparent w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Empty State */}
                        {testimonials.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No testimonials found matching your search.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination && pagination.total_pages > 1 && (
                            <div className="flex flex-col items-center mt-16 gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={!pagination.has_previous}
                                        className={`p-3 rounded-full border transition-colors ${!pagination.has_previous
                                            ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                                            : 'text-blue-600 border-blue-600 hover:bg-blue-50'
                                            }`}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((p) => {
                                            // Limit visible pages logic
                                            if (pagination.total_pages > 7) {
                                                if (
                                                    p === 1 ||
                                                    p === pagination.total_pages ||
                                                    (p >= currentPage - 1 && p <= currentPage + 1)
                                                ) {
                                                    // Show
                                                } else if (
                                                    (p === currentPage - 2) ||
                                                    (p === currentPage + 2)
                                                ) {
                                                    return <span key={p} className="px-1 text-gray-400">...</span>
                                                } else {
                                                    return null;
                                                }
                                            }

                                            return (
                                                <button
                                                    key={p}
                                                    onClick={() => handlePageChange(p)}
                                                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors
                              ${currentPage === p
                                                            ? "bg-blue-600 text-white shadow-md"
                                                            : "text-gray-600 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={!pagination.has_next}
                                        className={`p-3 rounded-full border transition-colors ${!pagination.has_next
                                            ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                                            : 'text-blue-600 border-blue-600 hover:bg-blue-50'
                                            }`}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>

                                <div className="text-sm text-gray-500">
                                    Showing {pagination.showing_from} - {pagination.showing_to} of {pagination.total} results
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedTestimonial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedTestimonial(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedTestimonial(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-shrink-0 mx-auto md:mx-0">
                                    <div className="w-32 h-32 rounded-full border-4 border-blue-50 shadow-lg overflow-hidden">
                                        <img
                                            src={selectedTestimonial.image_url}
                                            alt={selectedTestimonial.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + selectedTestimonial.name;
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-[#002147] mb-1">{selectedTestimonial.name}</h3>
                                    <div className="text-[#ff4aa5] font-medium text-sm uppercase tracking-wide mb-4">
                                        {selectedTestimonial.rank}
                                    </div>

                                    <div className="relative">
                                        <span className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif leading-none">“</span>
                                        <p className="text-gray-600 leading-relaxed text-lg relative z-10 px-4 md:px-0">
                                            {selectedTestimonial.comment}
                                        </p>
                                        <span className="absolute -bottom-8 -right-2 text-6xl text-blue-100 font-serif leading-none rotate-180">“</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
