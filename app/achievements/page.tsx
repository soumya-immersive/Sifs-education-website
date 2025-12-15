"use client";

import AchievementsHero from "../../components/achievements/AchievementsHero";
import AchievementsIntro from "../../components/achievements/AchievementsIntro";
import ParticipationTimeline from "../../components/achievements/ParticipationTimeline";
import AchievementYearCard from "../../components/achievements/AchievementYearCard";
import OurPresence from "../../components/achievements/OurPresence";
import AcademicCollaborations from "../../components/achievements/AcademicCollaborations";
import ClientsPortfolio from "../../components/achievements/ClientsPortfolio";
import TestimonialsSection from '../../components/common/TestimonialsSection';

export default function achievements() {
    return (
        <section className="bg-white">
            <AchievementsHero />
            <AchievementsIntro />
            <section className="max-w-7xl mx-auto py-20 px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    <ParticipationTimeline />
                    <AchievementYearCard />
                </div>
            </section>
            <OurPresence />
            <AcademicCollaborations />
            <ClientsPortfolio />
            <TestimonialsSection /> 
        </section>
    );
}
