"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { API_BASE_URL, BASE_URL } from "../../lib/config";

// Swiper styles
import "swiper/css";

interface Partner {
    id: number;
    image: string;
    image_url: string;
    url: string;
}

interface SectionData {
    title: string;
    subtitle: string;
}

const Partners: React.FC = () => {
    const router = useRouter();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [sectionData, setSectionData] = useState<SectionData>({
        title: "Global Participation",
        subtitle: "Connecting Minds, Crossing Borders, Infinite Opportunities",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                // Fetch Section Data
                const frontRes = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
                if (frontRes.ok) {
                    const frontData = await frontRes.json();
                    if (frontData.success && frontData.data?.be) {
                        setSectionData({
                            title: frontData.data.be.partner_section_title || "Global Participation",
                            subtitle: frontData.data.be.partner_section_subtitle || "Connecting Minds, Crossing Borders, Infinite Opportunities",
                        });
                    }
                }

                // Fetch Partners List
                const partnerRes = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/partners?limit=100`);
                if (partnerRes.ok) {
                    const partnerData = await partnerRes.json();
                    if (partnerData.success && partnerData.data?.data) {
                        setPartners(partnerData.data.data);
                    }
                }
            } catch (error) {
                console.error("Error fetching partners data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-8 md:p-16">
                <div className="mx-auto max-w-7xl">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-2/3 mb-10"></div>
                        <div className="flex gap-4 overflow-hidden">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-gray-100 rounded-xl h-28 w-44 flex-shrink-0"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (partners.length === 0) return null;

    return (
        <section className="bg-white p-8 md:p-16 relative overflow-hidden">
            <motion.div
                className="mx-auto max-w-7xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
            >
                {/* Header Section */}
                <motion.header
                    className="flex flex-col items-start justify-between sm:flex-row sm:items-center mb-10"
                    variants={{
                        hidden: { y: 40, opacity: 0 },
                        visible: {
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
                        }
                    }}
                >
                    <div className="max-w-2xl">
                        <h2 className="text-black text-4xl font-bold mb-1">
                            {sectionData.title}
                        </h2>
                        <p className="text-gray-600 text-md">
                            {sectionData.subtitle}
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/global-participation")}
                        className="mt-4 sm:mt-0 px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                        Explore
                        <svg
                            className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                        </svg>
                    </button>
                </motion.header>

                {/* Partners Slider */}
                <motion.div
                    className="partner-slider-container"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                >
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}

                        breakpoints={{
                            480: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 3 },
                        }}
                        className="partner-swiper pb-14"
                    >
                        {partners.map((partner) => (
                            <SwiperSlide key={partner.id}>
                                <a
                                    href={partner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="relative h-64 w-full bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                                        <img
                                            src={partner.image_url || (partner.image ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Partner/${partner.image}` : "")}
                                            alt="Partner Logo"
                                            className="w-full h-full object-cover relative z-10"
                                        />
                                    </div>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </motion.div>


        </section>
    );
};

export default Partners;
