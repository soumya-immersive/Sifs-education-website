"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function EventsHero() {
    return (
    <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative">
                <Image
                src="/events/1.png"
                alt="Forensic Training"
                width={520}
                height={420}
                className="rounded-xl object-cover"
                />

                <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-semibold">
                🎓 9,394+ Enrolled Learners
                </div>
            </div>

            {/* Right Content */}
            <div>
                <span className="mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                    Online Training in
                </span>

                <h1 className="text-4xl font-bold text-black mb-4 mt-4">
                    Forensic Science
                </h1>

                <p className="text-[#6B7385] mb-6 font-normal">
                    The Forensic Science & Criminal Investigation Online Internship program by SIFS India aims to equip you with an understanding of the theories, methods, and applications of forensic science within the legal framework for criminal investigations.
                </p>

                <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 font-normal text-black">
                        <Check className="text-green-500" size={18} /> Training without border
                    </li>
                    <li className="flex items-center gap-2 font-normal text-black">
                        <Check className="text-green-500" size={18} /> Online
                    </li>
                </ul>

                <hr />

                <h2 className="text-lg font-semibold text-black mb-2 mt-4">
                    Download your certificate
                </h2>

                <p className="text-[#6B7385] mb-6 font-normal">
                    Hey you’ve done great job! here you can download your <br /> certificate of achievement.
                </p>

                <button className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90">
                    Download Certificate →
                </button>
            </div>
        </div>
    </section>
  );
}
