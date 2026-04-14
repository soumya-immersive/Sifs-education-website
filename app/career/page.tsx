"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Toaster } from "react-hot-toast";
import PageBanner from "../../components/common/PageBanner";
import ForensicInsightsSection from '../../components/career/ForensicInsightsSection';
import JobCard from '../../components/career/JobCard';
import JobCategoriesSidebar from '../../components/career/JobCategoriesSidebar';
import { CAREER_PAGE_INITIAL_DATA } from "@/lib/data/career-page-data";

export default function CareerPage() {
    const data = CAREER_PAGE_INITIAL_DATA;
    const [selectedCategory, setSelectedCategory] = useState("All");

    // JOB DATA HANDLING
    const allJobs = data.jobs;

    // CATEGORIES DERIVATION
    const categoriesWithCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        allJobs.forEach(job => {
            counts[job.category] = (counts[job.category] || 0) + 1;
        });

        const list = [
            { id: 0, name: "All", count: allJobs.length },
            ...(data.categories || []).map(cat => ({
                ...cat,
                count: counts[cat.name] || 0
            }))
        ];
        return list;
    }, [allJobs, data.categories]);

    // FILTER LOGIC
    const filteredJobs = useMemo(() => {
        if (selectedCategory === "All") return allJobs;
        return allJobs.filter(job => job.category === selectedCategory);
    }, [selectedCategory, allJobs]);

    // ANIMATION VARIANTS
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const staggerContainer: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            className="w-full min-h-screen relative"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
        >
            <Toaster position="top-right" />

            <div>
                {/* COMMON BANNER */}
                <motion.div variants={fadeUp}>
                    <PageBanner
                        title={data.hero.title}
                        subtitle={data.hero.subtitle}
                        bgImage={data.hero.bgImage}
                    />
                </motion.div>

                {/* MAIN CONTENT AREA */}
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* LEFT SIDEBAR: Category Selection */}
                        <motion.aside
                            className="w-full lg:w-1/3 xl:w-1/4 sticky top-24"
                            variants={fadeUp}
                        >
                            <JobCategoriesSidebar
                                activeCategory={selectedCategory}
                                onSelect={(categoryName) => setSelectedCategory(categoryName)}
                                categories={categoriesWithCounts}
                            />
                        </motion.aside>

                        {/* RIGHT CONTENT: Job List */}
                        <motion.div
                            className="flex-1 w-full flex flex-col gap-6"
                            variants={staggerContainer}
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredJobs.length > 0 ? (
                                    filteredJobs.map((job) => (
                                        <motion.div
                                            key={job.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <JobCard
                                                job={job}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200"
                                    >
                                        <p className="text-gray-500 font-medium font-bold">No job openings found in this category.</p>
                                        <button
                                            onClick={() => setSelectedCategory("All")}
                                            className="mt-4 text-blue-600 font-bold hover:underline"
                                        >
                                            View all positions
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* FORENSIC INSIGHTS SECTION */}
                    <motion.div className="mt-24" variants={fadeUp}>
                        <ForensicInsightsSection
                            data={data.insights}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

