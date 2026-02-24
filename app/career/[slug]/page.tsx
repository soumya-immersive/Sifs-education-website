import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/common/PageBanner";
import { API_BASE_URL } from "@/lib/config";
import type { CareerDetailsResponse, CareerJob } from "@/types/career";
import ApplyButton from "@/components/career/ApplyButton";
import {
    MapPin,
    Briefcase,
    Clock,
    Calendar,
    DollarSign,
    Users,
    Mail
} from "lucide-react";

async function getJobDetails(slug: string): Promise<CareerJob | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/career-details/${slug}`, {
            cache: 'no-store', // Ensure fresh data
        });

        if (!response.ok) return null;

        const json: CareerDetailsResponse = await response.json();

        if (json.success && json.data && json.data.job) {
            return json.data.job;
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch job details:", error);
        return null;
    }
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const job = await getJobDetails(slug);

    if (!job) {
        return {
            title: "Job Not Found | SIFS India",
        };
    }

    return {
        title: `${job.title} | Career at SIFS India`,
        description: job.meta_description || `Join us as a ${job.title}`,
        keywords: job.meta_keywords || "",
    };
}

export default async function JobDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const job = await getJobDetails(slug);

    if (!job) {
        notFound();
    }

    // Helper to render HTML content safely
    const renderHTML = (htmlContent: string) => {
        return { __html: htmlContent };
    };

    return (
        <div className="w-full bg-[#FBFCFF] pb-20">
            <PageBanner
                title={job.title}
                subtitle="Join our team and help shape the future of forensic science."
                bgImage="/contact-gradient-bg.png"
            />

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT CONTENT: Description & Requirements */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Job Responsibilities */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#3E58EE] flex items-center justify-center">
                                    <Briefcase size={20} />
                                </span>
                                Job Responsibilities
                            </h2>
                            <div
                                className="prose prose-blue max-w-none text-gray-600 leading-relaxed"
                                dangerouslySetInnerHTML={renderHTML(job.job_responsibilities)}
                            />
                        </div>

                        {/* Requirements */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#3E58EE] flex items-center justify-center">
                                    <Users size={20} />
                                </span>
                                Requirements
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Educational Requirements</h3>
                                    <div
                                        className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={renderHTML(job.educational_requirements)}
                                    />
                                </div>

                                {job.experience_requirements && (
                                    <>
                                        <hr className="border-gray-100" />
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Experience Requirements</h3>
                                            <div
                                                className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={renderHTML(job.experience_requirements)}
                                            />
                                        </div>
                                    </>
                                )}

                                {job.additional_requirements && (
                                    <>
                                        <hr className="border-gray-100" />
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Additional Requirements</h3>
                                            <div
                                                className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={renderHTML(job.additional_requirements)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Benefits */}
                        {job.benefits && (
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#3E58EE] flex items-center justify-center">
                                        <DollarSign size={20} />
                                    </span>
                                    Benefits
                                </h2>
                                <div
                                    className="prose prose-blue max-w-none text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={renderHTML(job.benefits)}
                                />
                            </div>
                        )}

                        {/* Important Note */}
                        {job.read_before_apply && (
                            <div className="bg-[#FFF8E6] p-6 rounded-xl border border-[#FFE082]">
                                <h4 className="font-bold text-[#D08522] mb-2 text-lg">Read Before Apply</h4>
                                <div
                                    className="text-gray-700 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={renderHTML(job.read_before_apply)}
                                />
                            </div>
                        )}

                    </div>

                    {/* RIGHT SIDEBAR: Job Overview */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Job Overview</h3>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <Calendar className="text-[#3E58EE] mt-1 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Published On</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {new Date(job.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="text-[#3E58EE] mt-1 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Deadline</p>
                                        <div
                                            className="text-sm font-semibold text-red-500"
                                            dangerouslySetInnerHTML={renderHTML(job.deadline)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Users className="text-[#3E58EE] mt-1 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Vacancy</p>
                                        <p className="text-sm font-semibold text-gray-900">{job.vacancy}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Briefcase className="text-[#3E58EE] mt-1 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Employment Status</p>
                                        <div
                                            className="text-sm font-semibold text-gray-900"
                                            dangerouslySetInnerHTML={renderHTML(job.employment_status)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Briefcase className="text-[#3E58EE] mt-1 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Experience</p>
                                        <div
                                            className="text-sm font-semibold text-gray-900"
                                            dangerouslySetInnerHTML={renderHTML(job.experience)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="text-[#3E58EE] mt-1 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Job Location</p>
                                        <p className="text-sm font-semibold text-gray-900">{job.job_location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <DollarSign className="text-[#3E58EE] mt-1 shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase">Salary</p>
                                        <div
                                            className="text-sm font-semibold text-gray-900"
                                            dangerouslySetInnerHTML={renderHTML(job.salary)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <ApplyButton
                                    email={job.email}
                                    title={job.title}
                                    isExpired={job.is_expired}
                                />
                                {/* <p className="text-xs text-center text-gray-400 mt-3">
                                    Send your resume to <span className="text-gray-800 font-medium">{job.email}</span>
                                </p> */}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
