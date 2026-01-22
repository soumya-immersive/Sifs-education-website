"use client";

<<<<<<< HEAD
import React, { useMemo, useState } from "react";
import Link from "next/link";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut, AnimatePresence } from "framer-motion";
=======
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut } from "framer-motion";
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
import {
    Search,
    ChevronRight,
    Calendar,
    User,
<<<<<<< HEAD
    ChevronLeft,
    ChevronsLeft,
    ChevronsRight,
    Plus,
    Trash2,
    Save,
    Edit,
    RotateCcw,
    Loader2
} from "lucide-react";
import { useBlogPageData } from "../../hooks/useBlogPageData";
import EditableText from "../../components/editable/EditableText";
import { Toaster, toast } from "react-hot-toast";
import { BlogPost } from "../../types/blog-page";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

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

    const {
        data,
        updateSection,
        updateMultiple,
        editMode,
        setEditMode,
        saveData,
        isLoaded,
        resetToDefault
    } = useBlogPageData();

    const [isSaving, setIsSaving] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showConfirmation, setShowConfirmation] = useState(false);

    // slugify helper
    const slugify = (text: string) =>
        text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

    const posts = data.posts || [];
    const categories = data.categories || [];
=======
    ChevronLeft
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

    const IMAGE_BASE_URL = "/uploads/blogs";

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
                const searchQuery = debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : "";
                const apiUrl = `${API_BASE_URL}/EducationAndInternship/Website/front/blogs?page=${currentPage}&limit=9${searchQuery}`;

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
    }, [currentPage, debouncedSearch]);

    // Helper to strip HTML and truncate
    const getExcerpt = (html: string, length: number = 100) => {
        if (!html) return "";
        const text = html.replace(/<[^>]*>?/gm, '');
        return text.length > length ? text.substring(0, length) + "..." : text;
    };
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

    const handleEditClick = () => {
        setIsEditLoading(true);
        setTimeout(() => {
            setEditMode(true);
            setIsEditLoading(false);
        }, 600);
    };

<<<<<<< HEAD
    const handleSaveClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmSave = async () => {
        setIsSaving(true);
        const success = saveData();
        setTimeout(() => {
            if (success) {
                setEditMode(false);
                toast.success("✅ Blog data saved successfully");
            } else {
                toast.error("❌ Failed to save blog data");
            }
            setIsSaving(false);
            setShowConfirmation(false);
        }, 800);
    };

    const addPost = () => {
        const newPost: BlogPost = {
            id: Date.now(),
            slug: `new-post-${Date.now()}`,
            title: "New Blog Post Title",
            author: "Author Name",
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            category: selectedCategory === "All" ? (categories[0]?.name || "Uncategorized") : selectedCategory,
            excerpt: "A brief summary of your new blog post...",
            heroImage: "/blog/blog-main-hero.png",
            image: "/blog/blog-main-hero.png",
            contentImage: "/blog/training-ui.png",
            introduction: "Introduction for the new blog post...",
            content: "<p>Start writing your blog content here...</p>"
        };
        updateSection("posts", [...posts, newPost]);
        toast.success("Blog post added");
    };

    const deletePost = (id: number) => {
        if (confirm("Are you sure you want to delete this blog post?")) {
            updateSection("posts", posts.filter(p => p.id !== id));
            toast.success("Post removed");
        }
    };

    const updatePost = (updatedPost: BlogPost) => {
        updateSection("posts", posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    };

    const addCategory = () => {
        const newCat = { id: Date.now(), name: "New Category" };
        updateSection("categories", [...categories, newCat]);
        toast.success("Category added");
    };

    const deleteCategory = (id: number) => {
        if (confirm("Are you sure you want to delete this category?")) {
            updateSection("categories", categories.filter(c => c.id !== id));
            toast.success("Category removed");
        }
    };

    const updateCategoryName = (id: number, name: string) => {
        const oldCat = categories.find(c => c.id === id);
        const updatedCats = categories.map(c => c.id === id ? { ...c, name } : c);

        if (oldCat) {
            const updatedPosts = posts.map(p => p.category === oldCat.name ? { ...p, category: name } : p);
            updateMultiple({ categories: updatedCats, posts: updatedPosts });
        } else {
            updateSection("categories", updatedCats);
        }
    };

    const stripHtml = (htmlContent: string) => {
        if (typeof window === 'undefined') return htmlContent;
        const div = document.createElement("div");
        div.innerHTML = htmlContent;
        return div.textContent || div.innerText || "";
    };

    const toggleRecentPost = (postId: number) => {
        const current = data.recentPostIds || [];
        if (current.includes(postId)) {
            updateSection("recentPostIds", current.filter(id => id !== postId));
            toast.success("Removed from recent posts");
        } else {
            updateSection("recentPostIds", [...current, postId]);
            toast.success("Added to recent posts");
        }
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

=======
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
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

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FBFCFF]">
                <Loader2 className="w-10 h-10 text-[#3E58EE] animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
<<<<<<< HEAD
            className="w-full bg-[#FBFCFF] pb-20 relative"
=======
            className="w-full bg-[#FBFCFF] pb-20"
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <Toaster position="top-right" />

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleConfirmSave}
                title="Save Changes"
                message="Are you sure you want to save all the changes made to this page? This action will update the content permanently."
                confirmText="Save Changes"
                cancelText="Cancel"
                type="success"
                isLoading={isSaving}
                requirePassword={true}
                username="admin@sifs.com"
                expectedPassword="admin123"
            />

            {/* Admin Controls */}
            <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
                {!editMode ? (
                    <button
                        onClick={handleEditClick}
                        disabled={isEditLoading}
                        className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium ${isEditLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isEditLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Edit size={18} />
                        )}
                        {isEditLoading ? 'Loading...' : 'Edit Page'}
                    </button>
                ) : (
                    <button
                        onClick={handleSaveClick}
                        disabled={isSaving}
                        className={`flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium animate-in fade-in zoom-in ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Save size={18} />
                        )}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </div>

            {/* TOP BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
<<<<<<< HEAD
                    title={data.hero.title}
                    subtitle={data.hero.subtitle}
                    bgImage={data.hero.bgImage}
                    editMode={editMode}
                    onUpdate={(hero) => updateSection("hero", hero)}
=======
                    title="Blog"
                    subtitle={
                        <>
                            Explore our latest insights, news, and articles on <br /> forensic science and criminal investigation.
                        </>
                    }
                    bgImage="/blog-gradient-bg.png"
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: BLOG POSTS GRID */}
                    <div className="lg:col-span-2">
<<<<<<< HEAD
                        {editMode && (
                            <button
                                onClick={addPost}
                                className="w-full mb-8 p-4 border-2 border-dashed border-blue-200 rounded-2xl text-blue-500 font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={20} /> Add New Blog Post
                            </button>
                        )}

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
                                            {editMode && (
                                                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => deletePost(post.id)}
                                                        className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                                        title="Delete Post"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleRecentPost(post.id)}
                                                        className={`p-2 rounded-full shadow-lg transition-colors ${data.recentPostIds.includes(post.id)
                                                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                            : "bg-white text-gray-400 hover:text-yellow-600"
                                                            }`}
                                                        title={data.recentPostIds.includes(post.id) ? "Remove from Recent" : "Add to Recent"}
                                                    >
                                                        <Plus size={16} className={data.recentPostIds.includes(post.id) ? "rotate-45" : ""} />
                                                    </button>
                                                </div>
                                            )}

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
                                                        {editMode ? (
                                                            <select
                                                                value={post.category}
                                                                onChange={(e) => updatePost({ ...post, category: e.target.value })}
                                                                className="bg-transparent outline-none cursor-pointer"
                                                            >
                                                                {categories.map(c => (
                                                                    <option key={c.id} value={c.name}>
                                                                        {stripHtml(c.name)}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        ) : stripHtml(post.category)}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 mt-3 leading-tight group-hover:text-[#3E58EE] transition-colors">
                                                    <EditableText
                                                        html={post.title}
                                                        editMode={editMode}
                                                        onChange={(val) => updatePost({ ...post, title: val, slug: slugify(stripHtml(val)) })}
                                                    />
                                                </h3>

                                                <div className="text-gray-500 text-sm mt-2 line-clamp-3">
                                                    <EditableText
                                                        html={post.excerpt}
                                                        editMode={editMode}
                                                        onChange={(val) => updatePost({ ...post, excerpt: val })}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 text-[11px] text-gray-500">
                                                    <div className="flex items-center gap-1 font-semibold">
                                                        <Calendar size={14} className="text-blue-500" />
                                                        <EditableText
                                                            html={post.date}
                                                            editMode={editMode}
                                                            onChange={(val) => updatePost({ ...post, date: val })}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-1 font-semibold">
                                                        <User size={14} className="text-blue-500" />
                                                        <EditableText
                                                            html={post.author}
                                                            editMode={editMode}
                                                            onChange={(val) => updatePost({ ...post, author: val })}
                                                        />
                                                    </div>
=======
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
                                                    src={`${IMAGE_BASE_URL}/${post.main_image}`}
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
                                                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                                                    {getExcerpt(post.content, 120)}
                                                </p>

                                                {/* Read More Button */}
                                                <div className="mt-auto">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <button className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2.5 rounded-xl font-semibold text-sm group-hover:bg-[#3E58EE] group-hover:text-white transition-all duration-300">
                                                            Read Full Article
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    </Link>
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                                                </div>

                                                {!editMode && (
                                                    <Link href={`/blog/${post.slug}`} className="mt-4 flex items-center text-[#3E58EE] text-xs font-bold hover:underline">
                                                        Read Full Article <ChevronRight size={14} />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
<<<<<<< HEAD
                            </AnimatePresence>
                        </motion.div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <Search className="mx-auto w-12 h-12 text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">No blog posts found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or category filters</p>
                            </div>
=======
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="text-gray-400 mb-2">No blogs found matching your criteria.</div>
                                <button
                                    onClick={() => { setSearchTerm(""); setDebouncedSearch(""); }}
                                    className="text-[#3E58EE] font-semibold hover:underline"
                                >
                                    Clear Search
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
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                        )}
                    </div>

                    {/* RIGHT: SIDEBAR */}
                    <div className="space-y-8">
                        {/* SEARCH */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-4">
                            <h4 className="text-lg font-bold text-gray-900 mb-4">Search blog</h4>
<<<<<<< HEAD
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search here"
                                    value={searchQuery || ""}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg py-2.5 px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#3E58EE]/20 transition-all"
=======
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#FBFCFF] border border-gray-200 rounded-xl py-3 px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#3E58EE]/20 focus:border-[#3E58EE] transition-all group-hover:border-gray-300"
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                                />
                                <Search className="absolute right-3 top-3 text-gray-400 group-focus-within:text-[#3E58EE] transition-colors" size={18} />
                            </div>
                        </motion.div>

                        {/* CATEGORIES */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
<<<<<<< HEAD
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-gray-900 text-lg">Categories</h4>
                                {editMode && (
                                    <button
                                        onClick={addCategory}
                                        className="text-[#3E58EE] hover:bg-blue-50 p-1 rounded-full transition-colors"
=======
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
                                        className="w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all bg-[#FBFCFF] text-gray-600 hover:bg-[#F3F6FF] hover:text-[#3E58EE]"
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                                    >
                                        <Plus size={20} />
                                    </button>
                                )}
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
                                            <EditableText
                                                html={cat.name}
                                                editMode={editMode}
                                                onChange={(val) => updateCategoryName(cat.id, val)}
                                            />
                                            <ChevronRight size={14} />
                                        </div>
                                        {editMode && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                                                className="absolute -right-2 -top-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <Plus size={12} className="rotate-45" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* RECENT POSTS */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-lg text-gray-900 mb-4">Recent Post</h4>
                            <div className="space-y-5">
<<<<<<< HEAD
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
                                            {editMode && (
                                                <button
                                                    onClick={() => toggleRecentPost(post.id)}
                                                    className="absolute -right-2 -top-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remove from Recent"
                                                >
                                                    <Plus size={10} className="rotate-45" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                                {editMode && data.recentPostIds.length === 0 && (
                                    <div className="text-xs text-gray-400 italic text-center py-4 border-2 border-dashed border-gray-100 rounded-xl">
                                        Click + on any post card to add it to recent posts
                                    </div>
                                )}
=======
                                {blogs.slice(0, 4).map((post, i) => (
                                    <Link
                                        key={i}
                                        href={`/blog/${post.slug}`}
                                        className="flex gap-4 group cursor-pointer items-start"
                                    >
                                        <div className="w-20 h-20 rounded-xl bg-gray-200 flex-shrink-0 overflow-hidden shadow-sm">
                                            <img
                                                src={`${IMAGE_BASE_URL}/${post.main_image}`}
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
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
