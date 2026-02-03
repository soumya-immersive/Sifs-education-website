"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { API_BASE_URL, BASE_URL } from "@/lib/config";
import PageBanner from "../../components/common/PageBanner";

// Types
interface PortfolioItem {
    id: number;
    title: string;
    slug: string;
    featured_image: string;
    client_category_id: number;
    tags: string | null;
    meta_description?: string;
}

interface PaginationData {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_previous: boolean;
    has_next: boolean;
    showing_from: number;
    showing_to: number;
}

interface ApiResponse {
    success: boolean;
    data: {
        data: PortfolioItem[];
        pagination: PaginationData;
    };
}

// Category Mapping (Inferred)
const CATEGORY_MAP: Record<number, string> = {
    1: "Institution",
    2: "Law Enforcement",
    3: "Forensic Labs",
    4: "Financial Group",
    5: "Corporate",
    6: "Organisation"
};

const CATEGORIES = ["All", ...Object.values(CATEGORY_MAP), "Others"];

export default function PortfoliosPage() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetching with limit 36 to match per_page in example
                const res = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/portfolios`);
                const json: ApiResponse = await res.json();

                if (json.success && json.data) {
                    setItems(json.data.data);
                    setPagination(json.data.pagination);
                }
            } catch (error) {
                console.error("Failed to fetch portfolios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    // Filter Logic (Client Side for current page)
    const filteredItems = items.filter(item => {
        if (activeTab === "All") return true;
        const catName = CATEGORY_MAP[item.client_category_id] || "Others";
        return catName === activeTab;
    });

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && pagination && newPage <= pagination.total_pages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-white min-h-screen mb-20">
            <PageBanner
                title="Satisfied Clients' Portfolio"
                subtitle="Home / Portfolio"
                bgImage="/contact-gradient-bg.png"
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-5 py-2 text-sm border rounded-sm transition-all
                ${activeTab === cat
                                    ? "bg-[#0b5ed7] text-white border-[#0b5ed7]"
                                    : "bg-white text-[#0b5ed7] border-[#0b5ed7] hover:bg-[#0b5ed7] hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <AnimatePresence mode='popLayout'>
                                {filteredItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col group bg-white border border-gray-100 p-4 hover:shadow-xl transition-shadow rounded-lg"
                                    >
                                        {/* Logo Image */}
                                        <div className="w-full aspect-square relative mb-4 flex items-center justify-center p-2 bg-[#f9f9f9] rounded-md overflow-hidden">
                                            <img
                                                src={item.featured_image.startsWith('http') ? item.featured_image : `${BASE_URL}/uploads/Education-And-Internship-Admin-Portfolio/${item.featured_image}`}
                                                alt={item.title}
                                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none'; // Hide if broken to avoid loop
                                                    target.parentElement?.classList.add('bg-gray-100'); // Add placeholder bg
                                                }}
                                            />
                                        </div>

                                        {/* Content - Visible Always */}
                                        <div className="text-center">
                                            <h3 className="text-gray-900 font-bold text-base mb-1 line-clamp-2 min-h-[3rem] flex items-center justify-center">
                                                {item.title}
                                            </h3>

                                            {item.tags && (
                                                <p className="text-gray-500 text-xs line-clamp-2">
                                                    {item.tags.split(',').slice(0, 3).join(', ')}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Empty State */}
                        {filteredItems.length === 0 && (
                            <div className="text-center py-20 text-gray-400">
                                <p>No clients found in this category.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination && pagination.total_pages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-16">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={!pagination.has_previous}
                                    className={`p-2 rounded-full border ${!pagination.has_previous ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-600 hover:bg-blue-50'}`}
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((p) => {
                                        // Simple pagination logic to show limited range could be added here
                                        // For now showing all pages if < 10, otherwise simple truncation or full list
                                        if (pagination.total_pages > 10 && Math.abs(p - currentPage) > 2 && p !== 1 && p !== pagination.total_pages) {
                                            if (Math.abs(p - currentPage) === 3) return <span key={p} className="self-end px-1">...</span>;
                                            return null;
                                        }

                                        return (
                                            <button
                                                key={p}
                                                onClick={() => handlePageChange(p)}
                                                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors
                            ${currentPage === p
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-600 hover:bg-blue-50"
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
                                    className={`p-2 rounded-full border ${!pagination.has_next ? 'text-gray-300 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-600 hover:bg-blue-50'}`}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}

                        {/* Pagination Info */}
                        {pagination && (
                            <div className="text-center text-gray-500 text-sm mt-4">
                                Showing {pagination.showing_from} to {pagination.showing_to} of {pagination.total} records
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
