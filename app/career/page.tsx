"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import PageBanner from "../../components/common/PageBanner";
import ForensicInsightsSection from '../../components/career/ForensicInsightsSection';
import JobCard from '../../components/career/JobCard';
import JobCategoriesSidebar from '../../components/career/JobCategoriesSidebar';
import { API_BASE_URL } from "@/lib/config";
import type { CareerJob, CareerCategory, CareersResponse } from "@/types/career";

export default function CareerPage() {
    // 1. STATE MANAGEMENT
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [jobs, setJobs] = useState<CareerJob[]>([]);
    const [categories, setCategories] = useState<CareerCategory[]>([]);
    const [loading, setLoading] = useState(true);

    // 2. FETCH DATA
    useEffect(() => {
        const fetchCareers = async () => {
            try {
                setLoading(true);
                // Fetching a larger limit to get all jobs for client-side filtering/counting in this simple implementation
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/career?page=1&limit=100`);
                const json: CareersResponse = await response.json();

                if (json.success && json.data) {
                    setJobs(json.data.data || []);
                    setCategories(json.data.jcats || []);
                }
            } catch (error) {
                console.error("Failed to fetch career opportunities:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    // 3. PREPARE CATEGORY DATA WITH COUNTS
    const sidebarCategories = useMemo(() => {
        const categoryCounts = new Map<number, number>();

        // Count jobs per category
        jobs.forEach(job => {
            const count = categoryCounts.get(job.jcategory_id) || 0;
            categoryCounts.set(job.jcategory_id, count + 1);
        });

        const formattedCategories = categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            count: categoryCounts.get(cat.id) || 0
        }));

        // Add "All" category
        return [
            { name: "All", count: jobs.length },
            ...formattedCategories
        ];
    }, [jobs, categories]);

    // 4. FILTER LOGIC
    const filteredJobs = useMemo(() => {
        if (selectedCategory === "All") return jobs;
        return jobs.filter(job => {
            // Find the category object for this job to check its name matches selectedCategory
            const cat = categories.find(c => c.id === job.jcategory_id);
            return cat && cat.name === selectedCategory;
        });
    }, [selectedCategory, jobs, categories]);

    // 5. ANIMATION VARIANTS
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
            className="w-full min-h-screen bg-[#FBFCFF] pb-10"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
        >
            {/* COMMON BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
                    title="Join Us! Your Path to Excellence"
                    subtitle="Explore exciting career opportunities and become part of our dynamic team."
                    bgImage="/contact-gradient-bg.png"
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
                            categories={sidebarCategories}
                            activeCategory={selectedCategory}
                            onSelect={(categoryName) => setSelectedCategory(categoryName)}
                        />
                    </motion.aside>

                    {/* RIGHT CONTENT: Job List */}
                    <motion.div
                        className="flex-1 w-full flex flex-col gap-6"
                        variants={staggerContainer}
                    >
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : (
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
                                                title={job.title}
                                                experience={job.experience}
                                                deadline={job.deadline}
                                                educationalExperience={job.educational_requirements || "Not specified"}
                                                slug={job.slug}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200"
                                    >
                                        <p className="text-gray-500 font-medium">No job openings found in this category.</p>
                                        <button
                                            onClick={() => setSelectedCategory("All")}
                                            className="mt-4 text-blue-600 font-bold hover:underline"
                                        >
                                            View all positions
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
}