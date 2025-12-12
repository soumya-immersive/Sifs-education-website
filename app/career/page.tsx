"use client";

import PageBanner from "../../components/common/PageBanner";
import ForensicInsightsSection from '../../components/career/ForensicInsightsSection';
import JobCard from '../../components/career/JobCard';

export default function CareerPage() {
    return (
        <div className="w-full">

            {/* COMMON BANNER */}
            <PageBanner
                title="Join Us! Your Path to Excellence"
                subtitle="Reference giving information on its origin, as well as a random Lipsum generator"
                bgImage="/contact-gradient-bg.png"
            />

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <JobCard
                        title="Intern-Education Department"
                        experience="Fresher"
                        deadline="20th October, 2025"
                        workExperience="Post Graduate in field of forensic science"
                    />

                    <JobCard
                        title="Intern-Education Department"
                        experience="Fresher"
                        deadline="31st March, 2025"
                        workExperience="Any Graduate or Post Graduate in field of forensic science"
                    />

                    <JobCard
                        title="Cyber Security Trainer"
                        experience="1–3 Years"
                        deadline="31st March, 2025"
                        workExperience="A Bachelor's degree with excellent passing percentage in relevant fields."
                    />
                </div>

                <ForensicInsightsSection />
            </div>
        </div>
    );
}
