"use client";

import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut } from "framer-motion";
import { Search, ChevronRight, Calendar, User, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function BlogPage() {
    // Mock Data for Posts
    const posts = Array(4).fill({
        id: 1,
        category: "Tutorial",
        title: "Hands-on Facial Reconstruction Training Delhi, India",
        excerpt: "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focused...",
        date: "2 Dec, 2025",
        author: "John Doe",
        image: "/blog.png" 
    });

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

    const recentPosts = [
        { title: "Dapibus cras nisi suscipit nibh elite purus condimentum", date: "19 Dec, 2025" },
        { title: "Dapibus cras nisi suscipit nibh elite purus condimentum", date: "19 Dec, 2025" },
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
                            Reference giving information on its origins, as well as a <br /> random Lipsum generator.
                        </>
                    }
                    bgImage="/blog-gradient-bg.png"
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
                            {posts.map((post, index) => (
                                <motion.div 
                                    key={index} 
                                    variants={fadeUp}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-48 w-full bg-gray-200">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-5">
                                        <span className="bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold px-2 py-1 rounded uppercase">
                                            {post.category}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mt-3 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50 text-[11px] text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} className="text-black" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User size={14} className="text-black" />
                                                {post.author}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* PAGINATION */}
                        <motion.div variants={fadeUp} className="flex justify-center items-center gap-2 mt-12">
                            <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronsLeft size={16}/></button>
                            <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronLeft size={16}/></button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#3E58EE] text-white text-sm">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border text-gray-600 text-sm hover:bg-gray-50">2</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border text-gray-600 text-sm hover:bg-gray-50">3</button>
                            <span className="text-gray-400">...</span>
                            <button className="w-8 h-8 flex items-center justify-center rounded-md border text-gray-600 text-sm hover:bg-gray-50">10</button>
                            <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronRight size={16}/></button>
                            <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronsRight size={16}/></button>
                        </motion.div>
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
                                    className="w-full border border-gray-200 rounded-lg py-2 px-4 pr-10 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
                            </div>
                        </motion.div>

                        {/* CATEGORIES */}
                        <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-gray-900 text-lg mb-4">Categories</h4>
                            <div className="space-y-2">
                                {categories.map((cat, i) => (
                                    <button 
                                        key={i}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                                            cat === "Crime Scene Investigation" 
                                            ? "bg-[#3E58EE] text-white" 
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
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
                            <div className="space-y-4">
                                {recentPosts.map((post, i) => (
                                    <div key={i} className="flex gap-3 group cursor-pointer">
                                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                                            <img src="/blog-thumb.png" alt="post" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h5 className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h5>
                                            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                                                <Calendar size={12} /> {post.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}