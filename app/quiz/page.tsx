"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut } from "framer-motion";
import { Calendar, User, ChevronDown, ChevronRight, ChevronsLeft, ChevronLeft, ChevronsRight, ClipboardCheck } from "lucide-react";
import Image from "next/image";
import { useQuizData } from "@/hooks/useQuizData";
import { QuizFormData } from "@/types/quiz";
import { API_BASE_URL } from "@/lib/config";
import QuizPageSkeleton from "@/components/skeletons/QuizPageSkeleton";

export default function QuizZonePage() {
    const router = useRouter();
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
    const [certificateNumber, setCertificateNumber] = useState("");
    const [verifyMessage, setVerifyMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Date TBA";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const { data, loading, error } = useQuizData(selectedYear);

    // Reset pagination when year changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedYear]);

    // Pagination Logic
    const allQuizzes = data?.pastQuizzes || [];
    const totalPages = Math.ceil(allQuizzes.length / ITEMS_PER_PAGE);
    const currentQuizzes = allQuizzes.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    // Update form data and selected year when data changes
    useEffect(() => {
        if (data?.activeQuiz) {
            setFormData(prev => ({
                ...prev,
                quiz: data.activeQuiz?.id || 0,
                event_id: data.activeQuiz?.event_id || data.activeQuiz?.event?.id || 0,
            }));
        }

        // If current selected year is not in available years, default to the latest available year
        if (data?.availableYears && data.availableYears.length > 0) {
            if (!data.availableYears.includes(selectedYear)) {
                setSelectedYear(data.availableYears[0]);
            }
        }
    }, [data, selectedYear]);

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
            const response = await fetch(`${API_BASE_URL}/EventManagement/Website/quiz/${formData.quiz}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    organisation_name: formData.organisation_name,
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setFormMessage({ type: 'success', text: result.message || 'Quiz registration successful!' });

                // Redirect to quiz questions page
                setTimeout(() => {
                    router.push(`/quiz-questions?quiz_id=${formData.quiz}&applicant_id=${result.data.applicant_id}`);
                }, 1500);

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    organisation_name: "",
                    mobile: "",
                    quiz: data?.activeQuiz?.id || 0,
                    event_id: data?.activeQuiz?.event_id || data?.activeQuiz?.event?.id || 0,
                });
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



    const handleVerifyCertificate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setVerifyMessage(null);

        try {
            const response = await fetch(`${API_BASE_URL}/EventManagement/Website/verify-certificate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ certificate_number: certificateNumber }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const { applicant } = result.data;
                const searchParams = new URLSearchParams({
                    name: applicant?.name || '',
                    cert_no: applicant?.certificate_number || certificateNumber,
                    quiz: applicant?.quiz_title || applicant?.event?.title || 'Forensic Quiz',
                    date: applicant?.formatted_date || new Date().toLocaleDateString('en-GB')
                });
                router.push(`/quiz-certificate?${searchParams.toString()}`);
            } else {
                setVerifyMessage({ type: 'error', text: result.message || 'Certificate verification failed' });
            }
        } catch (err) {
            setVerifyMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setIsVerifying(false);
        }
    };


    if (loading) {
        return <QuizPageSkeleton />;
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
                    bgImage="/quiz-gradient-bg.png"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12">

                {/* HERO SECTION: ACTIVE QUIZ */}
                {data?.activeQuiz && (
                    <motion.div className="grid grid-cols-1 gap-12 items-center justify-center  mb-16" variants={fadeUp}>
                        <div className="space-y-6">
                            {/* <span className="inline-block mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                                Quiz {data.activeQuiz.id}
                            </span> */}
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
                                {data.activeQuiz.event?.title || data.activeQuiz.title}
                            </h3>

                            <div
                                className="text-gray-600 text-sm space-y-4 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: data.activeQuiz.description || "<p>No description available.</p>" }}
                            />

                            <div className="grid grid-cols-2 gap-0 pt-4 border-t text-sm">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar size={18} className="text-[#3E58EE]" />
                                    <div>
                                        <p className="font-bold">Start Date:</p>
                                        <p>{formatDate(data.activeQuiz.start_date || data.activeQuiz.event?.start_date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar size={18} className="text-[#3E58EE]" />
                                    <div>
                                        <p className="font-bold">End Date:</p>
                                        <p>{formatDate(data.activeQuiz.end_date || data.activeQuiz.event?.end_date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT: QUIZ HUB */}
                    <div className="lg:col-span-2">
                        <motion.div variants={fadeUp}>
                            <p className="text-[#3E58EE] text-sm font-bold tracking-wide uppercase mb-2">Explore our all of the quizzes!</p>
                            <h3 className="text-3xl font-bold text-black mb-8">
                                Forensic{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">Quiz</span>
                                    <Image
                                        src="/yellow-underline.png"
                                        alt=""
                                        width={120}
                                        height={14}
                                        className="absolute left-0 -bottom-1 z-0"
                                    />
                                </span>{" "}
                                Hub
                            </h3>


                            {/* Year Tabs */}
                            <div className="flex gap-4 sm:gap-8 border-b border-gray-200 mb-8 overflow-x-auto pb-1 scrollbar-hide">
                                {data?.availableYears?.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={`pb-2 text-base font-bold transition-all whitespace-nowrap ${selectedYear === year
                                            ? "text-black border-b-2 border-black"
                                            : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>

                            <h4 className="text-lg font-bold text-gray-900 mb-6">{selectedYear} Quiz's</h4>

                            {/* Accordion List */}
                            <div className="space-y-4">
                                {currentQuizzes.length > 0 ? (
                                    currentQuizzes.map((quiz) => (
                                        <div key={quiz.id} className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
                                            <button
                                                onClick={() => setOpenQuiz(openQuiz === quiz.id ? null : quiz.id)}
                                                className={`w-full flex items-center justify-between p-4 sm:p-5 text-sm sm:text-base font-bold text-left transition-all duration-300 ${openQuiz === quiz.id
                                                    ? "bg-gradient-to-r from-[#D08522] to-[#FF9F20] text-white shadow-md"
                                                    : "bg-[#F5F5F5] text-[#555555] hover:bg-gray-200"
                                                    }`}
                                            >
                                                <span className="pr-4">
                                                    {quiz.event?.title || quiz.title}
                                                </span>
                                                <span className={`shrink-0 transition-transform duration-300 ${openQuiz === quiz.id ? 'rotate-180' : ''}`}>
                                                    <ChevronDown size={20} className={openQuiz === quiz.id ? "text-white" : "text-gray-500"} />
                                                </span>
                                            </button>

                                            {openQuiz === quiz.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <div className="p-6 text-[14px] text-[#6B7385] space-y-4 leading-relaxed border-t border-gray-100 bg-white">
                                                        <div dangerouslySetInnerHTML={{ __html: quiz.description }} className="prose prose-sm max-w-none text-gray-600" />


                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                        <p className="text-gray-500">No quizzes found for {selectedYear}</p>
                                    </div>
                                )}
                            </div>

                            {/* PAGINATION (Visual Only as per design) */}
                            {/* PAGINATION */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12 select-none">
                                    {/* First Page */}
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="p-2 border rounded-md text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronsLeft size={16} />
                                    </button>

                                    {/* Previous Page */}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 border rounded-md text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    {/* Page Numbers */}
                                    {getPageNumbers().map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof page === "number" && setCurrentPage(page)}
                                            disabled={page === "..."}
                                            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${page === currentPage
                                                ? "bg-[#3E58EE] text-white shadow-sm"
                                                : page === "..."
                                                    ? "text-gray-400 cursor-default"
                                                    : "border text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {/* Next Page */}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border rounded-md text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={16} />
                                    </button>

                                    {/* Last Page */}
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border rounded-md text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronsRight size={16} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* RIGHT: APPLICANT FORM */}
                    <div className="lg:col-span-1">
                        <motion.div variants={fadeUp}>
                            <div className="bg-white rounded-2xl border border-gray-200 sticky top-24 shadow-sm overflow-hidden">
                                <h3 className="text-lg font-bold text-black p-5 border-b border-gray-100 bg-white">Applicant Details</h3>
                                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                    <div>
                                        <label className="text-[14px] font-medium text-black mb-1.5 block">Name as printed on certificate</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#3E58EE] focus:ring-2 focus:ring-[#3E58EE]/10 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[14px] font-medium text-black mb-1.5 block">E-mail</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#3E58EE] focus:ring-2 focus:ring-[#3E58EE]/10 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[14px] font-medium text-black mb-1.5 block">Organization/Institution name</label>
                                        <input
                                            type="text"
                                            name="organisation_name"
                                            value={formData.organisation_name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#3E58EE] focus:ring-2 focus:ring-[#3E58EE]/10 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[14px] font-medium text-black mb-1.5 block">Mobile number</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#3E58EE] focus:ring-2 focus:ring-[#3E58EE]/10 transition-all"
                                        />
                                    </div>

                                    {formMessage && (
                                        <div className={`p-3 rounded-lg text-xs font-medium ${formMessage.type === 'success'
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                            {formMessage.text}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-2 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        ) : (
                                            <>Attempt Quiz Now <ChevronRight size={16} /></>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                </div>


                {data?.activeQuiz && (
                    <motion.div className="mt-20 text-center" variants={fadeUp}>
                        <div className="bg-[#E7ECEF] border border-[#d7dde9] inline-block p-4 rounded-xl">
                            <p className="text-[#6B7385] text-sm">
                                <b>Note:</b> You have to send your Post Screenshot at <span className="text-[#3E58EE]">sifs.forensicquiz@gmail.com</span> to win the competition.
                            </p>
                        </div>
                    </motion.div>
                )}

            </div>
        </motion.div>
    );
}
