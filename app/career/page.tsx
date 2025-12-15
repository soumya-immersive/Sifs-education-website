// app/career/page.tsx
"use client";

import PageBanner from "../../components/common/PageBanner";
import ForensicInsightsSection from '../../components/career/ForensicInsightsSection';
import JobCard from '../../components/career/JobCard';
import { motion } from "framer-motion";
import React from "react";

export default function CareerPage() {

    // Fade + slide-up animation
    const fadeUp: any = { // cast to any to avoid strict TS typing for ease
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94], // bezier easing (keeps animation exact)
            },
        },
    };

    // Container animation for stagger
    const staggerContainer: any = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.18,
            },
        },
    };

    return (
        <motion.div 
            className="w-full"
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

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">

                {/* JOB CARDS WITH STAGGER ANIMATION */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={fadeUp}>
                        <JobCard
                            title="Intern-Education Department"
                            experience="Fresher"
                            deadline="20th October, 2025"
                            workExperience="Post Graduate in field of forensic science"
                        />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <JobCard
                            title="Intern-Education Department"
                            experience="Fresher"
                            deadline="31st March, 2025"
                            workExperience="Any Graduate or Post Graduate in field of forensic science"
                        />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <JobCard
                            title="Cyber Security Trainer"
                            experience="1–3 Years"
                            deadline="31st March, 2025"
                            workExperience="A Bachelor's degree with excellent passing percentage in relevant fields."
                        />
                    </motion.div>
                </motion.div>

                {/* FORENSIC INSIGHTS SECTION */}
                <motion.div className="mt-16" variants={fadeUp}>
                    <ForensicInsightsSection />
                </motion.div>

            </div>
        </motion.div>
    );
}
