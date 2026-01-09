"use client";

import { Toaster } from "react-hot-toast";

import AchievementsHero from "../../components/achievements/AchievementsHero";
import AchievementsIntro from "../../components/achievements/AchievementsIntro";
import ParticipationTimeline from "../../components/achievements/ParticipationTimeline";
import AchievementYearCard from "../../components/achievements/AchievementYearCard";
import OurPresence from "../../components/achievements/OurPresence";
import AcademicCollaborations from "../../components/achievements/AcademicCollaborations";
import ClientsPortfolio from "../../components/achievements/ClientsPortfolio";
import TestimonialsSection from '../../components/common/TestimonialsSection';
import { ACHIEVEMENTS_PAGE_INITIAL_DATA } from "@/lib/data/achievements-page-data";

export default function AchievementsPage() {
    const data = ACHIEVEMENTS_PAGE_INITIAL_DATA;

    return (
        <section className="bg-white relative min-h-screen">
            <Toaster position="top-right" />

            <AchievementsHero
                data={data.hero}
            />
            <AchievementsIntro
                data={data.intro}
            />
            <section className="max-w-7xl mx-auto py-20 px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    <ParticipationTimeline
                        data={data.participationTimeline}
                    />
                    <AchievementYearCard
                        data={data.achievementYears}
                    />
                </div>
            </section>
            <OurPresence
                data={data.presence}
            />
            <AcademicCollaborations
                data={data.universityCollaborations}
            />
            <ClientsPortfolio
                data={data.clients}
            />
            <TestimonialsSection
                data={data.testimonials}
            />
        </section>
    );
}
