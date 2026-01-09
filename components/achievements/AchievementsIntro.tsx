"use client";

import Image from "next/image";

interface AchievementsIntroProps {
    data: {
        backgroundImage: string;
        mainImage: string;
        badgeText: string;
        heading: string;
        paragraphs: string[];
        list: string[];
    };
}

export default function AchievementsIntro({
    data,
}: AchievementsIntroProps) {
    if (!data) return null;

    return (
        <section className="relative py-20 bg-cover bg-center no-repeat">
            {/* Background Image - Absolute */}
            <div className="absolute inset-0 z-0">
                <img
                    src={data.backgroundImage || "/placeholder.png"}
                    alt="Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-14 items-start">
                    <div className="relative w-full">
                        <img
                            src={data.mainImage || "/placeholder.png"}
                            alt="SIFS Achievements"
                            className="w-full h-auto rounded-2xl object-cover"
                        />
                    </div>

                    <div>
                        <span className="inline-block rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                            <div
                                dangerouslySetInnerHTML={{ __html: data.badgeText }}
                            />
                        </span>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-4">
                            <span className="relative inline-block">
                                <span className="relative z-10">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: data.heading }}
                                    />
                                </span>

                                <Image
                                    src="/yellow-underline.png"
                                    alt=""
                                    width={220}
                                    height={16}
                                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-0"
                                />
                            </span>
                        </h2>

                        <div className="space-y-4 mb-6">
                            {data.paragraphs.map((para, index) => (
                                <div key={index} className="relative group">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: para }}
                                        className="text-sm text-gray-600 leading-relaxed block"
                                    />
                                </div>
                            ))}
                        </div>

                        <ul className="text-sm text-[#00467A] list-disc pl-5 space-y-3">
                            {data.list.map((item, index) => (
                                <li key={index} className="pl-2 relative group">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: item }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
