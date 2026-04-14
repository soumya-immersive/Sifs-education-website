"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut, AnimatePresence } from "framer-motion";
import {
    Search,
    ChevronRight,
    Calendar,
    User,
    Loader2
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { BLOG_PAGE_INITIAL_DATA } from "../../lib/data/blog-page-data";

export default function BlogPage({
    params: paramsPromise,
    searchParams: searchParamsPromise
}: {
    params: Promise<any>,
    searchParams: Promise<any>
}) {
    // Unwrap params to avoid enumeration warnings in Next.js 15
    const params = React.use(paramsPromise);
    const searchParams = React.use(searchParamsPromise);

    const data = BLOG_PAGE_INITIAL_DATA;
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // slugify helper
    const slugify = (text: string) =>
        text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

    const posts = data.posts || [];
    const categories = data.categories || [];

    const stripHtml = (htmlContent: string) => {
        if (typeof window === 'undefined') return htmlContent;
        const div = document.createElement("div");
        div.innerHTML = htmlContent;
        return div.textContent || div.innerText || "";
    };

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const cleanTitle = stripHtml(post.title).toLowerCase();
            const cleanExcerpt = stripHtml(post.excerpt).toLowerCase();
            const matchesSearch = cleanTitle.includes(searchQuery.toLowerCase()) ||
                cleanExcerpt.includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [posts, searchQuery, selectedCategory]);

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

    return (
        <motion.div
            className="w-full bg-[#FBFCFF] pb-20 relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <Toaster position="top-right" />

            {/* TOP BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
                    title={data.hero.title}
                    subtitle={data.hero.subtitle}
                    bgImage={data.hero.bgImage}
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: BLOG POSTS GRID */}
                    <div className="lg:col-span-2">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={staggerContainer}
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredPosts.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        variants={fadeUp}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group h-full flex flex-col">
                                            <Link href={`/blog/${post.slug}`} className="block">
                                                <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                                                    <img
                                                        src={post.image}
                                                        alt={stripHtml(post.title)}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            </Link>

                                            <div className="p-5 flex-1 flex flex-col">
                                                <div className="flex justify-between items-start">
                                                    <span className="bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold px-2 py-1 rounded uppercase">
                                                        {stripHtml(post.category)}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 mt-3 leading-tight group-hover:text-[#3E58EE] transition-colors">
                                                    <div dangerouslySetInnerHTML={{ __html: post.title }} />
                                                </h3>

                                                <div className="text-gray-500 text-sm mt-2 line-clamp-3">
                                                    <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                                </div>

                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 text-[11px] text-gray-500">
                                                    <div className="flex items-center gap-1 font-semibold">
                                                        <Calendar size={14} className="text-blue-500" />
                                                        <div dangerouslySetInnerHTML={{ __html: post.date }} />
                                                    </div>
                                                    <div className="flex items-center gap-1 font-semibold">
                                                        <User size={14} className="text-blue-500" />
                                                        <div dangerouslySetInnerHTML={{ __html: post.author }} />
                                                    </div>
                                                </div>

                                                <Link href={`/blog/${post.slug}`} className="mt-4 flex items-center text-[#3E58EE] text-xs font-bold hover:underline">
                                                    Read Full Article <ChevronRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <Search className="mx-auto w-12 h-12 text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">No blog posts found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or category filters</p>
                            </div>
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
                                    value={searchQuery || ""}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg py-2.5 px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#3E58EE]/20 transition-all"
                                />
                                <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                            </div>
                        </motion.div>

                        {/* CATEGORIES */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-gray-900 text-lg">Categories</h4>
                            </div>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory("All")}
                                    className={`w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === "All"
                                        ? "bg-[#3E58EE] text-white shadow-md shadow-blue-200"
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    All Posts
                                    <ChevronRight size={14} />
                                </button>
                                {categories.map((cat) => (
                                    <div key={cat.id} className="group relative">
                                        <div
                                            onClick={() => setSelectedCategory(cat.name)}
                                            className={`w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === cat.name
                                                ? "bg-[#3E58EE] text-white shadow-md shadow-blue-200"
                                                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: cat.name }} />
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* RECENT POSTS */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-lg text-gray-900 mb-4">Recent Post</h4>
                            <div className="space-y-5">
                                {data.recentPostIds.map((id) => {
                                    const post = posts.find(p => p.id === id);
                                    if (!post) return null;
                                    return (
                                        <div key={post.id} className="relative group">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="flex gap-3 group cursor-pointer"
                                            >
                                                <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden text-center">
                                                    <img src={post.image} alt="post" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-[#3E58EE] transition-colors line-clamp-2">
                                                        {stripHtml(post.title)}
                                                    </h5>
                                                    <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1 font-medium">
                                                        <Calendar size={12} /> {stripHtml(post.date)}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
