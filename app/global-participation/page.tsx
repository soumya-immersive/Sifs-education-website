"use client";

import React, { useState, useEffect } from "react";
import { motion, easeOut } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL, BASE_URL } from "@/lib/config";
import PageBanner from "../../components/common/PageBanner";

interface Partner {
    id: number;
    image: string;
    image_url: string;
    url: string;
}

interface PaginationData {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_previous: boolean;
    has_next: boolean;
}

const GlobalParticipationPage = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sectionData, setSectionData] = useState({
        title: "Global Participation",
        subtitle: "Connecting Minds, Crossing Borders, Infinite Opportunities",
    });

    useEffect(() => {
        const fetchSectionData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
                const data = await response.json();
                if (data.success && data.data?.be) {
                    setSectionData({
                        title: data.data.be.partner_section_title || "Global Participation",
                        subtitle: data.data.be.partner_section_subtitle || "Connecting Minds, Crossing Borders, Infinite Opportunities",
                    });
                }
            } catch (error) {
                console.error("Error fetching section data:", error);
            }
        };
        fetchSectionData();
    }, []);

    useEffect(() => {
        const fetchPartners = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/partners?page=${currentPage}&limit=12`);
                const data = await response.json();
                if (data.success && data.data) {
                    setPartners(data.data.data);
                    setPagination(data.data.pagination);
                }
            } catch (error) {
                console.error("Error fetching partners:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPartners();
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (pagination && newPage >= 1 && newPage <= pagination.total_pages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: easeOut },
        },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            className="w-full bg-[#FBFCFF] pb-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.div variants={fadeUp}>
                <PageBanner
                    title={sectionData.title}
                    subtitle={sectionData.subtitle}
                    bgImage="/blog-gradient-bg.png"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {partners.map((partner) => (
                                <motion.div key={partner.id} variants={fadeUp}>
                                    <a
                                        href={partner.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block group"
                                    >
                                        <div className="relative h-64 w-full bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden transition-all duration-300">
                                            <img
                                                src={partner.image_url || (partner.image ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Partner/${partner.image}` : "")}
                                                alt="Partner Logo"
                                                className="w-full h-full object-cover relative z-10"
                                            />
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>

                        {pagination && pagination.total_pages > 1 && (
                            <motion.div variants={fadeUp} className="flex justify-center items-center gap-2 mt-16">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={!pagination.has_previous}
                                    className="p-2.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-white hover:border-[#3E58EE] hover:text-[#3E58EE] transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                                        let p = i + 1;
                                        if (pagination.total_pages > 5) {
                                            if (currentPage > 3) p = currentPage - 2 + i;
                                            if (p > pagination.total_pages) p = pagination.total_pages - (4 - i);
                                            if (p < 1) p = 1 + i;
                                        }

                                        return (
                                            <button
                                                key={p}
                                                onClick={() => handlePageChange(p)}
                                                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all shadow-sm ${currentPage === p
                                                    ? "bg-[#3E58EE] text-white shadow-blue-200"
                                                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#3E58EE] hover:text-[#3E58EE]"
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
                                    className="p-2.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-white hover:border-[#3E58EE] hover:text-[#3E58EE] transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default GlobalParticipationPage;
