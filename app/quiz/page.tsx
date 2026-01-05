"use client";

import React, { useState } from "react";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut } from "framer-motion";
import { Calendar, User, ChevronDown, ChevronRight, ChevronsLeft, ChevronLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";

export default function QuizZonePage(props: { params: Promise<any>; searchParams: Promise<any> }) {
    const params = React.use(props.params);
    const searchParams = React.use(props.searchParams);

    const [activeTab, setActiveTab] = useState("2020");
    const [openQuiz, setOpenQuiz] = useState<number | null>(1);

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
                    subtitle="Reference giving information on its origins, as well as a <br /> random Lipsum generator."
                    bgImage="/quiz-gradient-bg.png"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12">

                {/* HERO SECTION: WELCOME TO QUIZ */}
                <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" variants={fadeUp}>
                    <div className="relative">
                        <img src="/quiz.png" alt="Student" className="w-full object-cover" />
                        {/* Decorative elements could be SVGs or absolute images here */}
                    </div>

                    <div className="space-y-6">
                        <span className="inline-block mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                            Quiz 169
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


                        <div className="text-gray-600 text-sm space-y-4 leading-relaxed">
                            <p className="italic font-medium">"Achieving Better Understanding and Higher Knowledge is the Best Reward in Life"</p>
                            <p>In addition, SIFS India always believes to bring the act of learning into your behavior. With the same objective, we are announcing our new series of Forensic Quizzes with some interesting rewards.</p>

                            <h4 className="font-bold text-gray-900 pt-2">What You Have to Do?</h4>
                            <p>B. Claim your eCertificate of Achievement and post on Social Media Platforms (Facebook, LinkedIn, and Instagram) with proper hashtags...</p>

                            <h4 className="font-bold text-gray-900 pt-2">Rewards:</h4>
                            <p>All 100% scorers (First Attempt) who will post their certificate on LinkedIn, Instagram, and Facebook... will get Meritorious eCertificate of Excellence!</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Calendar size={18} className="text-[#3E58EE]" />
                                <div><p className="font-bold">Start Date:</p><p>07th December 2025</p></div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Calendar size={18} className="text-[#3E58EE]" />
                                <div><p className="font-bold">End Date:</p><p>12th December 2025</p></div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 col-span-2">
                                <User size={18} className="text-[#3E58EE]" />
                                <div><p className="font-bold">Quiz Crafted by:</p><p>Ayush Goyal</p></div>
                            </div>
                        </div>


                    </div>
                </motion.div>

                <motion.div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center mb-20 px-12" variants={fadeUp}>
                    <div className="bg-[#d7dde9] border border-[#4559ED] p-2 rounded-lg text-center text-[14px] text-[#6B7385]">
                        <b>Note:</b> You have to send your Post Screenshot at sifs.forensicquiz@gmail.com to win the competition.
                    </div>
                </motion.div>

                {/* MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: QUIZ HUB */}
                    <div className="lg:col-span-2">
                        <motion.div variants={fadeUp}>
                            <p className="text-[#3E58EE] text-sm font-medium">Explore our all of the quizzes!</p>
                            <h3 className="text-2xl font-medium text-black mb-12">
                                Foren{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">sic Quiz</span>
                                    <Image
                                        src="/yellow-underline.png"
                                        alt=""
                                        width={100}
                                        height={14}
                                        className="absolute left-0 -bottom-1 z-0"
                                    />
                                </span>{" "}
                                Hub
                            </h3>


                            {/* Year Tabs */}
                            <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
                                {["2020", "2021", "2022", "2023", "2024", "2025"].map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setActiveTab(year)}
                                        className={`pb-2 text-sm font-semibold transition-all ${activeTab === year ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"}`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>

                            <h4 className="text-lg font-bold text-gray-900 mb-4">{activeTab} Quiz's</h4>

                            {/* Accordion List */}
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((idx) => (
                                    <div key={idx} className="border rounded-lg overflow-hidden bg-white">
                                        <button
                                            onClick={() => setOpenQuiz(openQuiz === idx ? null : idx)}
                                            className={`w-full flex items-center justify-between p-4 text-sm font-medium text-left transition-all duration-300 ${openQuiz === idx
                                                ? "bg-gradient-to-r from-[#D08522] to-[#FF9F20] text-white shadow-lg hover:shadow-xl hover:from-[#D08522]/90 hover:to-[#FF9F20]/90"
                                                : "bg-[#EBEBEB] text-[#777777] hover:bg-gray-200"
                                                }`}
                                        >
                                            <span><b>Quiz</b> {idx}: History of Indian Forensics | 2nd to 4th July 2020</span>
                                            {openQuiz === idx ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                        </button>

                                        {openQuiz === idx && (
                                            <div className="p-6 text-[14px] text-[#6B7385] space-y-3 leading-relaxed border-t font-regular">
                                                <p className="italic font-medium">"Achieving Better Understanding and Higher Knowledge is the Best Reward in Life"</p>
                                                <p>In addition, SIFS India always believes to bring the act of learning into your behavior...</p>
                                                <div className="pt-2">
                                                    <p className="font-bold text-gray-900">What You Have to Do?</p>
                                                    <p>A. Participate & successfully complete the quiz!</p>
                                                    <p>B. Claim your eCertificate of Achievement and post on Social Media...</p>
                                                </div>
                                                <button className="text-[#3E58EE] font-bold text-xs mt-4">Check on Download Certificate and search your certificate by entering registered Email ID.</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* PAGINATION */}
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronsLeft size={16} /></button>
                                <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronLeft size={16} /></button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#3E58EE] text-white text-sm">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-md border text-gray-600 text-sm">2</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-md border text-gray-600 text-sm">3</button>
                                <span className="text-gray-400">...</span>
                                <button className="w-8 h-8 flex items-center justify-center rounded-md border text-gray-600 text-sm">10</button>
                                <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronRight size={16} /></button>
                                <button className="p-2 border rounded-md text-gray-400 hover:bg-gray-50"><ChevronsRight size={16} /></button>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: APPLICANT FORM */}
                    <motion.div variants={fadeUp}>
                        <div className="bg-white rounded-2xl border sticky top-6">
                            <h3 className="text-lg font-bold text-black p-4 border-b border-[#D9D9D9]">Applicant Details</h3>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="text-[14px] font-mrdium text-black mb-0 block">Name as printed on certificate</label>
                                    <input type="text" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="text-[14px] font-mrdium text-black mb-0 block">E-mail</label>
                                    <input type="email" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="text-[14px] font-mrdium text-black mb-0 block">Organization/Institution name</label>
                                    <input type="text" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="text-[14px] font-mrdium text-black mb-0 block">Mobile number</label>
                                    <input type="text" className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <button className="w-1/2 mt-4 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                                    Attempt Quiz Now →
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
}