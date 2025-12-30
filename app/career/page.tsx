"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import PageBanner from "../../components/common/PageBanner";
import ForensicInsightsSection from '../../components/career/ForensicInsightsSection';
import JobCard from '../../components/career/JobCard';
import JobCategoriesSidebar from '../../components/career/JobCategoriesSidebar';

export default function CareerPage() {
    // 1. STATE MANAGEMENT
    const [selectedCategory, setSelectedCategory] = useState("All");

    // 2. JOB DATA
    const allJobs = [
        {
            id: 1,
            title: "Intern-Education Department",
            experience: "Fresher",
            deadline: "20th March, 2025",
            educationalExperience: "Post Graduate in Field of Forensic Science",
            category: "Forensic Trainee"
        },
        {
            id: 2,
            title: "Intern Education Department",
            experience: "Fresher",
            deadline: "31st March, 2025",
            educationalExperience: "Any Graduate or Post Graduate in Field of Forensic Science",
            category: "Forensic Trainee"
        },
        {
            id: 3,
            title: "Cyber Security Trainer",
            experience: "1-3 Years",
            deadline: "31st March, 2025",
            educationalExperience: "A Bachelor's degree with excellent passing percentage in relevant fields of IT such as BCA or BTech, related",
            category: "Marketing Strategic" 
        },
        {
            id: 4,
            title: "Educational Counsellor",
            experience: "1-3 Years",
            deadline: "31st March, 2025",
            educationalExperience: "A Bachelor's degree with excellent passing percentage in relevant fields of marketing, education, counsellin...",
            category: "Scientific Officer"
        }
    ];

    // 3. FILTER LOGIC
    const filteredJobs = useMemo(() => {
        if (selectedCategory === "All") return allJobs;
        return allJobs.filter(job => job.category === selectedCategory);
    }, [selectedCategory, allJobs]);

    // 4. ANIMATION VARIANTS (Fixed Typing for Easing)
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94], // TypeScript now validates this correctly
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
            className="w-full min-h-screen"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
        >
            {/* COMMON BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
                    title="Join Us! Your Path to Excellence"
                    subtitle="Reference giving information on its origin, as well as a random Lipsum generator"
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
                            activeCategory={selectedCategory}
                            onSelect={(categoryName) => setSelectedCategory(categoryName)}
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
                                            title={job.title}
                                            experience={job.experience}
                                            deadline={job.deadline}
                                            educationalExperience={job.educationalExperience}
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
                    </motion.div>
                </div>

                {/* FORENSIC INSIGHTS SECTION */}
                <motion.div className="mt-24" variants={fadeUp}>
                    <ForensicInsightsSection />
                </motion.div>
            </div>
        </motion.div>
    );
}