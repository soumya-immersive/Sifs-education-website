"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";
import { QuizQuestion, QuizQuestionsResponse, QuizSubmissionResponse, QuizResult } from "@/types/quiz";
import { ChevronRight, ChevronLeft, CheckCircle2, XCircle, Timer, Award, ClipboardCheck, ArrowRight, RotateCcw } from "lucide-react";
import PageBanner from "../../components/common/PageBanner";

function QuizQuestionsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const quizId = searchParams.get("quiz_id");
    const applicantId = searchParams.get("applicant_id");

    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState<QuizQuestionsResponse | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<QuizSubmissionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!quizId || !applicantId) {
            router.push("/quiz");
            return;
        }

        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EventManagement/Website/quiz/${quizId}/questions`);
                const data = await response.json();
                if (data.success) {
                    setQuizData(data);
                } else {
                    setError(data.message || "Failed to load questions");
                }
            } catch (err) {
                setError("An error occurred while fetching questions");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [quizId, applicantId, router]);

    const handleOptionSelect = (questionId: number, optionKey: string) => {
        setAnswers(prev => ({
            ...prev,
            [`question_${questionId}`]: optionKey
        }));
    };

    const handleNext = () => {
        if (quizData && currentQuestionIndex < quizData.data.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/EventManagement/Website/quiz/${quizId}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicant_id: parseInt(applicantId!),
                    answers: answers
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSubmissionResult(result);
            } else {
                setError(result.message || "Failed to submit quiz");
            }
        } catch (err) {
            setError("An error occurred while submitting the quiz");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FBFCFF]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3E58EE] mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Preparing your quiz...</p>
                </div>
            </div>
        );
    }

    if (error && !submissionResult) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FBFCFF]">
                <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-sm border border-red-100 text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push("/quiz")}
                        className="bg-[#3E58EE] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2D44CC] transition-colors"
                    >
                        Back to Quiz Hub
                    </button>
                </div>
            </div>
        );
    }

    if (submissionResult) {
        const { results, passed, message } = submissionResult.data;
        return (
            <div className="min-h-screen bg-[#FBFCFF] py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        {/* Result Header */}
                        <div className={`p-8 text-center ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
                            {passed ? (
                                <Award className="w-20 h-20 text-green-500 mx-auto mb-4" />
                            ) : (
                                <RotateCcw className="w-20 h-20 text-orange-500 mx-auto mb-4" />
                            )}
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                                {passed ? "Congratulations!" : "Keep Trying!"}
                            </h2>
                            <p className={`text-lg font-medium ${passed ? 'text-green-700' : 'text-red-700'}`}>
                                {message}
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 border-b border-gray-100">
                            <div className="bg-gray-50 p-6 rounded-2xl text-center">
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Score</p>
                                <p className="text-3xl font-bold text-[#3E58EE]">{results.percentage}%</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl text-center">
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Correct</p>
                                <p className="text-3xl font-bold text-green-600">{results.correctAnswers} / {results.totalQuestions}</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl text-center">
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Status</p>
                                <p className={`text-3xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                                    {passed ? "PASSED" : "FAILED"}
                                </p>
                            </div>
                            {passed && submissionResult.data.applicant?.certificate_number && (
                                <div className="bg-blue-50 p-6 rounded-2xl text-center border border-blue-100">
                                    <p className="text-blue-500 text-sm font-semibold uppercase tracking-wider mb-1">Certificate #</p>
                                    <p className="text-xl font-bold text-[#3E58EE] truncate">
                                        {submissionResult.data.applicant.certificate_number}
                                    </p>
                                </div>
                            )}
                        </div>


                        {/* Footer Actions */}
                        <div className="p-8 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-center">
                            {passed && (
                                <button
                                    onClick={() => {
                                        const { applicant } = submissionResult.data;
                                        const searchParams = new URLSearchParams({
                                            cert_no: applicant?.certificate_number || ''
                                        });
                                        router.push(`/certificate-download?${searchParams.toString()}`);
                                    }}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-[#3E58EE] text-white rounded-2xl font-bold hover:shadow-lg transition-all transform active:scale-95"
                                >
                                    <Award size={18} /> Download Certificate
                                </button>
                            )}
                            {!passed && (
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#3E58EE] text-[#3E58EE] rounded-2xl font-bold hover:bg-[#3E58EE] hover:text-white transition-all transform active:scale-95"
                                >
                                    <RotateCcw size={18} /> Retake Quiz
                                </button>
                            )}
                            <button
                                onClick={() => router.push("/quiz")}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all transform active:scale-95 border border-gray-200"
                            >
                                Back to Hub <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const totalQuestions = quizData?.data.questions.length || 0;
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / totalQuestions) * 100;

    return (
        <div className="min-h-screen bg-[#F6F8FF] font-sans">
            <PageBanner
                title={quizData?.data.quiz.title || "Quiz"}
                subtitle="Test your forensic knowledge and earn achievement"
                bgImage="/quiz-gradient-bg.png"
            />

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#111827]">Quiz Assessment</h2>
                        <p className="text-[#6B7280] font-medium mt-1">Please answer all questions to complete the assessment.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB] flex items-center gap-6 min-w-[280px]">
                        <div className="flex-1">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-bold text-[#3E58EE]">Progress</span>
                                <span className="text-sm font-bold text-[#111827]">{answeredCount} / {totalQuestions}</span>
                            </div>
                            <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-[#3E58EE] rounded-full"
                                />
                            </div>
                        </div>
                        <div className="h-10 w-[1px] bg-[#E5E7EB]" />
                        <div className="flex items-center gap-2 text-[#3E58EE]">
                            <Timer size={24} />
                        </div>
                    </div>
                </div>

                {/* Questions List */}
                <div className="space-y-12">
                    {quizData?.data.questions.map((question, idx) => (
                        <div key={question.id} className="relative">
                            {/* Question Box */}
                            <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F4F6] p-8 mb-6">
                                <p className="text-[#111827] text-lg md:text-xl font-semibold leading-relaxed">
                                    <span className="text-[#E91E63] font-bold mr-2">Que. {idx + 1}:</span>
                                    {question.question}
                                </p>
                            </div>

                            {/* Answer Section */}
                            <div className="pl-4 md:pl-8">
                                <p className="text-[#3E58EE] text-[15px] font-bold mb-6 flex items-center gap-2">
                                    Ans.: Select your answer
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                    {question.options.map((option, oIdx) => {
                                        const isSelected = answers[`question_${question.id}`] === option.id;
                                        const optionLabel = String.fromCharCode(64 + oIdx + 1);

                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => handleOptionSelect(question.id, option.id)}
                                                className="group flex items-center gap-4 text-left transition-all duration-200"
                                            >
                                                {/* Letter */}
                                                <span className={`text-[16px] font-bold min-w-[18px] ${isSelected ? 'text-[#3E58EE]' : 'text-[#4B5563]'
                                                    }`}>
                                                    {optionLabel}
                                                </span>

                                                {/* Radio Button */}
                                                <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-[#3E58EE] bg-white' : 'border-gray-300 group-hover:border-[#3E58EE]'
                                                    }`}>
                                                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#3E58EE]" />}
                                                </div>

                                                {/* Option Text */}
                                                <span className={`text-[15px] md:text-[16px] font-medium leading-relaxed ${isSelected ? 'text-[#3E58EE]' : 'text-[#4B5563] group-hover:text-[#111827]'
                                                    }`}>
                                                    {option.text}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Section */}
                <div className="mt-20 flex flex-col items-center">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#E5E7EB] w-full max-w-2xl text-center">
                        <h3 className="text-xl font-bold text-[#111827] mb-2">Ready to finish?</h3>
                        <p className="text-[#6B7280] mb-8">Make sure you have answered all questions before submitting.</p>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || answeredCount < totalQuestions}
                            className="w-full py-5 bg-[#3E58EE] text-white rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(62,88,238,0.3)] hover:bg-[#2D44CC] hover:shadow-[0_10px_30px_rgba(62,88,238,0.4)] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:transform-none flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <ClipboardCheck size={22} />
                                    Submit Quiz Assessment
                                </>
                            )}
                        </button>

                        {answeredCount < totalQuestions && (
                            <p className="text-[#E91E63] text-sm font-bold mt-4">
                                * Please complete all {totalQuestions} questions to submit
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function QuizQuestionsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E58EE]"></div>
            </div>
        }>
            <QuizQuestionsContent />
        </Suspense>
    );
}
