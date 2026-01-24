"use client";

import { useState, useEffect } from "react";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut } from "framer-motion";
import { Calendar, User, ChevronDown, ChevronRight, ChevronsLeft, ChevronLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import { useQuizData } from "@/hooks/useQuizData";
import { QuizFormData } from "@/types/quiz";
import { API_BASE_URL } from "@/lib/config";

export default function QuizZonePage() {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [openQuiz, setOpenQuiz] = useState<number | null>(null);
    const [formData, setFormData] = useState<QuizFormData>({
        name: "",
        email: "",
        organisation_name: "",
        mobile: "",
        quiz: 0,
        event_id: 0,
    });
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, loading, error } = useQuizData(selectedYear);

    // Update form data when active quiz changes
    useEffect(() => {
        if (data?.activeQuiz) {
            setFormData(prev => ({
                ...prev,
                quiz: data.activeQuiz!.id,
                event_id: data.activeQuiz!.event_id,
            }));
        }
    }, [data?.activeQuiz]);

    // Animation Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormMessage(null);

        try {
            const response = await fetch(`${API_BASE_URL}/EventManagement/Website/quiz/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setFormMessage({ type: 'success', text: result.message || 'Quiz registration successful!' });
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    organisation_name: "",
                    mobile: "",
                    quiz: data?.activeQuiz?.id || 0,
                    event_id: data?.activeQuiz?.event_id || 0,
                });

                // Redirect to quiz attempt page if URL is provided
                if (result.data?.quiz_url) {
                    setTimeout(() => {
                        window.location.href = result.data.quiz_url;
                    }, 1500);
                }
            } else {
                setFormMessage({ type: 'error', text: result.message || 'Failed to register for quiz' });
            }
        } catch (err) {
            setFormMessage({ type: 'error', text: 'An error occurred. Please try again.' });
            console.error('Quiz registration error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Strip HTML tags from description for display
    const stripHtml = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    if (loading) {
        return (
            <div className="w-full bg-[#FBFCFF] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E58EE] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading quiz data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-[#FBFCFF] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Error: {error}</p>
                </div>
            </div>
        );
    }

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
                    title="Quiz Zone"
                    subtitle={
                        <>Explore our forensic quizzes and test your knowledge</>
                    }
                    bgImage="/quiz-gradient-bg.png"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12">

                {/* HERO SECTION: ACTIVE QUIZ */}
                {data?.activeQuiz && (
                    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" variants={fadeUp}>
                        <div className="relative">
                            <img src="/quiz.png" alt="Quiz" className="w-full object-cover" />
                        </div>

                        <div className="space-y-6">
                            <span className="inline-block mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                                Quiz {data.activeQuiz.id}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-4">
                                Welcome{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">to</span>
                                    <Image
                                        src="/yellow-underline.png"
                                        alt=""
                                        width={80}
                                        height={14}
                                        className="absolute left-0 -bottom-1 z-0"
                                    />
                                </span>{" "}
                                the Quiz!
                            </h2>

                            <h3 className="text-xl font-semibold text-gray-800">
                                {data.activeQuiz.title}
                            </h3>

                            <div
                                className="text-gray-600 text-sm space-y-4 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: data.activeQuiz.description }}
                            />

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar size={18} className="text-[#3E58EE]" />
                                    <div>
                                        <p className="font-bold">Start Date:</p>
                                        <p>{data.activeQuiz.event.start_date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar size={18} className="text-[#3E58EE]" />
                                    <div>
                                        <p className="font-bold">End Date:</p>
                                        <p>{data.activeQuiz.event.end_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {data?.activeQuiz && (
                    <motion.div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center mb-20 px-12" variants={fadeUp}>
                        <div className="bg-[#d7dde9] border border-[#4559ED] p-2 rounded-lg text-center text-[14px] text-[#6B7385]">
                            <b>Note:</b> You have to send your Post Screenshot at sifs.forensicquiz@gmail.com to win the competition.
                        </div>
                    </motion.div>
                )}

            </div>
        </motion.div>
    );
}