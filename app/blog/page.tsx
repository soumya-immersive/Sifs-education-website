"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut } from "framer-motion";
import {
    Search,
    ChevronRight,
    Calendar,
    User,
    ChevronLeft
} from "lucide-react";
import { API_BASE_URL, BASE_URL } from "@/lib/config";
import type { BlogPost, BlogsResponse, BlogPagination } from "@/types/blog";

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [pagination, setPagination] = useState<BlogPagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
    const [debouncedSearch, setDebouncedSearch] = useState("");



    // Debounce Search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm, selectedCategory]);

    // Fetch Blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const searchQuery = debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : "";
                const categoryQuery = selectedCategory !== "All Posts" ? `&category=${encodeURIComponent(selectedCategory)}` : "";
                const apiUrl = `${API_BASE_URL}/EducationAndInternship/Website/front/blogs?page=${currentPage}&limit=10${searchQuery}${categoryQuery}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const json: BlogsResponse = await response.json();

                if (json.success && json.data && json.data.data) {
                    setBlogs(json.data.data);
                    setPagination(json.data.pagination);
                } else {
                    setBlogs([]);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage, debouncedSearch, selectedCategory]);

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
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        },
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
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >
                                {blogs.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        variants={fadeUp}
                                        className="h-full"
                                    >
                                        <div className="group h-full flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                            {/* Image Container */}
                                            <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                                                <img
                                                    src={`${BASE_URL}/uploads/Education-And-Internship-Admin-Blog-Main/${post.main_image}`}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/blog/blog-main-hero.png'; // Fallback
                                                        target.onerror = null;
                                                    }}
                                                />
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#3E58EE] shadow-sm">
                                                    Article
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                {/* Meta */}
                                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar size={14} className="text-[#3E58EE]" />
                                                        {new Date(post.publish_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <User size={14} className="text-[#3E58EE]" />
                                                        <span className="truncate max-w-[100px]">{post.author || "SIFS India"}</span>
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#3E58EE] transition-colors line-clamp-2">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        {post.title}
                                                    </Link>
                                                </h3>

                                                {/* Excerpt */}
                                                {/* <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                                                    {getExcerpt(post.content, 120)}
                                                </p> */}

                                                {/* Read More Button */}
                                                <div className="mt-auto">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <button className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2.5 rounded-xl font-semibold text-sm group-hover:bg-[#3E58EE] group-hover:text-white transition-all duration-300">
                                                            Read Full Article
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="text-gray-400 mb-2">No blogs found matching your criteria.</div>
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setDebouncedSearch("");
                                        setSelectedCategory("All Posts");
                                    }}
                                    className="text-[#3E58EE] font-semibold hover:underline"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                        {/* PAGINATION */}
                        {!loading && pagination && pagination.total_pages > 1 && (
                            <motion.div variants={fadeUp} className="flex justify-center items-center gap-2 mt-12">
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
                                            // Handle edge case where p < 1
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
                                        )
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
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="space-y-8">
                        {/* SEARCH */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-4">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">Search blog</h4>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#FBFCFF] border border-gray-200 rounded-xl py-3 px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#3E58EE]/20 focus:border-[#3E58EE] transition-all group-hover:border-gray-300"
                                />
                                <Search className="absolute right-3 top-3 text-gray-400 group-focus-within:text-[#3E58EE] transition-colors" size={18} />
                            </div>
                        </motion.div>

                        {/* CATEGORIES */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-gray-900 text-lg mb-4">Categories</h4>
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        setSelectedCategory("All Posts");
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === "All Posts"
                                        ? "bg-[#3E58EE] text-white shadow-md shadow-blue-200"
                                        : "bg-[#FBFCFF] text-gray-600 hover:bg-[#F3F6FF] hover:text-[#3E58EE]"
                                        }`}
                                >
                                    All Posts
                                    <ChevronRight size={14} />
                                </button>
                                {categories.map((cat, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setCurrentPage(1);
                                        }}
                                        className={`w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat
                                            ? "bg-[#3E58EE] text-white shadow-md shadow-blue-200"
                                            : "bg-[#FBFCFF] text-gray-600 hover:bg-[#F3F6FF] hover:text-[#3E58EE]"
                                            }`}
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
                                        className="flex gap-4 group cursor-pointer items-start"
                                    >
                                        <div className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0 overflow-hidden shadow-sm">
                                            <img
                                                src={`${BASE_URL}/uploads/Education-And-Internship-Admin-Blog-Main/${post.main_image}`}
                                                alt="post"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/blog-thumb.png'; // Fallback
                                                    (e.target as HTMLImageElement).onerror = null;
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#3E58EE] transition-colors line-clamp-2 mb-2">
                                                {post.title}
                                            </h5>
                                            <p className="text-[11px] text-gray-400 flex items-center gap-1.5 font-medium">
                                                <Calendar size={12} className="text-[#3E58EE]" />
                                                {new Date(post.publish_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                {blogs.length === 0 && !loading && <span className="text-sm text-gray-400 block text-center py-4">No recent posts.</span>}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}