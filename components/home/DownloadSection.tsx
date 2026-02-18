"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../lib/config";

interface DownloadItem {
    id: number;
    title: string;
    image: string;
    download_pdf: string;
    serial_number: number;
    pdf_url: string;
}

interface SectionData {
    title: string;
    subtitle: string;
}

const DownloadSection = () => {
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);
    const [sectionData, setSectionData] = useState<SectionData>({
        title: "Access Learning Structure",
        subtitle: "Download Prospectus of our Forensic Courses and Trainings",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Section Data
                const frontRes = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
                if (frontRes.ok) {
                    const frontData = await frontRes.json();
                    if (frontData.success && frontData.data?.be) {
                        setSectionData({
                            title: frontData.data.be.download_section_title || "Access Learning Structure",
                            subtitle: frontData.data.be.download_section_subtitle || "Download Prospectus of our Forensic Courses and Trainings",
                        });
                    }
                }

                // Fetch Downloads List
                const downloadRes = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/downloads?page=1&limit=10`);
                if (downloadRes.ok) {
                    const downloadData = await downloadRes.json();
                    if (downloadData.success && downloadData.data) {
                        setDownloads(downloadData.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching download data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <section className="bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded w-1/3 mb-12"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-2xl h-48 shadow-sm"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (downloads.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-[#F8FAFC] py-20 px-4 md:px-8">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                <header className="mb-14 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                            {sectionData.title}
                        </h2>
                        <p className="text-lg text-slate-600 font-medium">
                            {sectionData.subtitle}
                        </p>
                    </motion.div>
                </header>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {downloads.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                                }
                            }}
                            className="group relative bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100 flex flex-col items-center text-center h-full"
                        >
                            {/* Icon Container */}
                            <div className="mb-6 relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-blue-50 group-hover:scale-110 transition-transform duration-500">
                                    <i className={item.image.replace("iconpicker-component", "")}></i>
                                </div>
                                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20 scale-110 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                                {item.title}
                            </h3>

                            <p className="text-slate-500 text-sm mb-8">
                                Document (PDF)
                            </p>

                            <div className="mt-auto w-full">
                                <a
                                    href={item.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-300 group/btn shadow-md hover:shadow-blue-200"
                                >
                                    Download Now
                                    <svg
                                        className="ml-2 w-4 h-4 transform group-hover/btn:translate-y-0.5 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default DownloadSection;
