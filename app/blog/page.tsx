"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut, AnimatePresence } from "framer-motion";
import {
    Search,
    ChevronRight,
    Calendar,
    User,
    ChevronLeft,
    ChevronsLeft,
    ChevronsRight
} from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import type { BlogPost, BlogsResponse, BlogPagination } from "@/types/blog";

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [pagination, setPagination] = useState<BlogPagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const IMAGE_BASE_URL = "/uploads/Education-And-Internship-Admin-Blog";

    // Debounce Search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch Blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const query = debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : "";
                const response = await fetch(
                    `${API_BASE_URL}/EducationAndInternship/Website/front/blogs?page=${currentPage}&limit=9${query}`
                );
                const json: BlogsResponse = await response.json();

                if (json.success && json.data) {
                    setBlogs(json.data.data || []);
                    setPagination(json.data.pagination);
                } else {
                    console.error("Invalid blog data response:", json);
                    setBlogs([]);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage, debouncedSearch]);

    // Helper to strip HTML and truncate
    const getExcerpt = (html: string, length: number = 100) => {
        if (!html) return "";
        const text = html.replace(/<[^>]*>?/gm, '');
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const categories = [
        "Forensic Science",
        "Crime Scene Investigation",
        "Criminology & Victimology",
        "Cyber Security & Law",
        "DNA Fingerprinting",
        "Document Examination",
        "Fingerprint Analysis",
        "Forensic Accounting",
        "Forensic Anthropology",
    ];

    // Animation Variants
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
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const handlePageChange = (newPage: number) => {
        if (pagination && newPage >= 1 && newPage <= pagination.total_pages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <motion.div
            className="w-full bg-[#FBFCFF] pb-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            {/* TOP BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
                    title="Blog"
                    subtitle={
                        <>
                            Explore our latest insights, news, and articles on <br /> forensic science and criminal investigation.
                        </>
                    }
                    bgImage="/blog-gradient-bg.png"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: BLOG POSTS GRID */}
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
                                ))}
                            </div>
                        ) : blogs.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                variants={staggerContainer}
                            >
                                {blogs.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        variants={fadeUp}
                                    >
                                        {/* REDIRECTION WRAPPER */}
                                        <Link href={`/blog/${post.slug}`} className="group block">
                                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                                                <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                                                    <img
                                                        src={`${IMAGE_BASE_URL}/${post.main_image}`}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/blog/blog-main-hero.png';
                                                            target.onerror = null; // Prevent infinite loop
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-5">
                                                    <span className="bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold px-2 py-1 rounded uppercase inline-block">
                                                        Forensic Science
                                                    </span>
                                                    <h3 className="text-lg font-bold text-gray-900 mt-3 leading-tight group-hover:text-[#3E58EE] transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                                                        {getExcerpt(post.content)}
                                                    </p>

                                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50 text-[11px] text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={14} className="text-black" />
                                                            {new Date(post.publish_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <User size={14} className="text-black" />
                                                            {post.author || "SIFS India"}
                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <span className="text-[#3E58EE] font-bold text-[13px] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                            Read Full Article <ChevronRight size={14} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                No blogs found.
                            </div>
                        )}

                        {/* PAGINATION */}
                        {!loading && pagination && pagination.total_pages > 1 && (
                            <motion.div variants={fadeUp} className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={!pagination.has_previous}
                                    className="p-2 border rounded-md text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                                        let p = i + 1;
                                        if (pagination.total_pages > 5) {
                                            if (currentPage > 3) p = currentPage - 2 + i;
                                            if (p > pagination.total_pages) p = pagination.total_pages - (4 - i);
                                        }

                                        return (
                                            <button
                                                key={p}
                                                onClick={() => handlePageChange(p)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm transition-colors ${currentPage === p
                                                    ? "bg-[#3E58EE] text-white font-bold border-[#3E58EE]"
                                                    : "text-gray-600 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        )
                                    })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={!pagination.has_next}
                                    className="p-2 border rounded-md text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="space-y-8">
                        {/* SEARCH */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">Search blog</h4>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg py-2.5 px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#3E58EE]/20 transition-all"
                                />
                                <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                            </div>
                        </motion.div>

                        {/* CATEGORIES */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-gray-900 text-lg mb-4">Categories</h4>
                            <div className="space-y-2">
                                <button
                                    className="w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all bg-[#3E58EE] text-white shadow-md shadow-blue-200"
                                >
                                    All Posts
                                    <ChevronRight size={14} />
                                </button>
                                {categories.map((cat, i) => (
                                    <button
                                        key={i}
                                        className="w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all bg-gray-50 text-gray-700 hover:bg-gray-100"
                                    >
                                        {cat}
                                        <ChevronRight size={14} />
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* RECENT POSTS */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-lg text-gray-900 mb-4">Recent Post</h4>
                            <div className="space-y-5">
                                {blogs.slice(0, 4).map((post, i) => (
                                    <Link
                                        key={i}
                                        href={`/blog/${post.slug}`}
                                        className="flex gap-3 group cursor-pointer"
                                    >
                                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                                            <img
                                                src={`${IMAGE_BASE_URL}/${post.main_image}`}
                                                alt="post"
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/blog-thumb.png';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-[#3E58EE] transition-colors line-clamp-2">
                                                {post.title}
                                            </h5>
                                            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 font-medium">
                                                <Calendar size={12} />
                                                {new Date(post.publish_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                {blogs.length === 0 && !loading && <span className="text-sm text-gray-400">No recent posts.</span>}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}