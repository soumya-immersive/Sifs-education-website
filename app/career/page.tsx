"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Save, Edit, Plus } from "lucide-react";
import PageBanner from "../../components/common/PageBanner";
import ForensicInsightsSection from '../../components/career/ForensicInsightsSection';
import JobCard from '../../components/career/JobCard';
import JobCategoriesSidebar from '../../components/career/JobCategoriesSidebar';
import { useCareerPageData } from "@/hooks/useCareerPageData";
import { JobOpening } from "@/types/career-page";

export default function CareerPage() {
    const { data, updateSection, updateMultiple, editMode, setEditMode, saveData, isLoaded } = useCareerPageData();
    const [isSaving, setIsSaving] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
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
        if (editMode) return allJobs;
        if (selectedCategory === "All") return allJobs;
        return allJobs.filter(job => job.category === selectedCategory);
    }, [selectedCategory, allJobs, editMode]);

    const handleEditClick = () => {
        setIsEditLoading(true);
        setTimeout(() => {
            setEditMode(true);
            setIsEditLoading(false);
        }, 600);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const success = saveData();
        setTimeout(() => {
            if (success) {
                setEditMode(false);
                toast.success("✅ Content saved successfully");
            } else {
                toast.error("❌ Failed to save content");
            }
            setIsSaving(false);
        }, 800);
    };

    const addJob = () => {
        const newJob: JobOpening = {
            id: Date.now(),
            title: "New Job Title",
            experience: "Fresher",
            deadline: "31st Dec, 2025",
            educationalExperience: "Educational background requirements...",
            category: selectedCategory === "All" ? (data.categories?.[0]?.name || "Uncategorized") : selectedCategory,
            applyButtonLabel: "Apply Now"
        };
        updateSection("jobs", [...allJobs, newJob]);
        toast.success("Job opening added");
    };

    const deleteJob = (id: number) => {
        if (confirm("Are you sure you want to delete this job opening?")) {
            updateSection("jobs", allJobs.filter(j => j.id !== id));
            toast.success("Job opening removed");
        }
    };

    const updateJob = (updatedJob: JobOpening) => {
        updateSection("jobs", allJobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    };

    // CATEGORY MANAGEMENT
    const addCategory = () => {
        const newCat = { id: Date.now(), name: "New Category" };
        updateSection("categories", [...(data.categories || []), newCat]);
        toast.success("Category added");
    };

    const deleteCategory = (id: number) => {
        if (confirm("Are you sure? This will not delete jobs in this category.")) {
            updateSection("categories", (data.categories || []).filter(c => c.id !== id));
            toast.success("Category removed");
        }
    };

    const updateCategoryName = (id: number, name: string) => {
        const oldCat = (data.categories || []).find(c => c.id === id);
        const updatedCategories = (data.categories || []).map(c => c.id === id ? { ...c, name } : c);

        if (oldCat) {
            const updatedJobs = allJobs.map(job =>
                job.category === oldCat.name ? { ...job, category: name } : job
            );
            // Single update for both
            updateMultiple({
                categories: updatedCategories,
                jobs: updatedJobs
            });
        } else {
            updateSection("categories", updatedCategories);
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

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

            {/* Global Edit Control */}
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
                        onClick={handleSave}
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

            <div className={editMode ? "ring-4 ring-blue-500/20" : ""}>
                {/* COMMON BANNER */}
                <motion.div variants={fadeUp}>
                    <PageBanner
                        title={data.hero.title}
                        subtitle={data.hero.subtitle}
                        bgImage={data.hero.bgImage}
                        editMode={editMode}
                        onUpdate={(heroData: { title: string; subtitle: string; bgImage: string }) => updateSection("hero", heroData)}
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
                                editMode={editMode}
                                onUpdateCategory={updateCategoryName}
                                onDeleteCategory={deleteCategory}
                                onAddCategory={addCategory}
                            />
                        </motion.aside>

                        {/* RIGHT CONTENT: Job List */}
                        <motion.div
                            className="flex-1 w-full flex flex-col gap-6"
                            variants={staggerContainer}
                        >
                            {editMode && (
                                <button
                                    onClick={addJob}
                                    className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 font-medium hover:bg-blue-50 transition-all mb-4"
                                >
                                    <Plus size={20} /> Add New Job Opening
                                </button>
                            )}
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
                                                editMode={editMode}
                                                onChange={updateJob}
                                                onDelete={() => deleteJob(job.id)}
                                                availableCategories={(data.categories || []).map(c => c.name)}
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
                            editMode={editMode}
                            updateData={(newData) => updateSection("insights", newData)}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

