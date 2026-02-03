"use client";

import { useState, useEffect } from "react";
import { Edit, Save, Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import AboutHero from "../../components/about/AboutHero";
import { AboutHeroData } from "@/types/about-page";

// Mapped components
import ParticipationTimeline from "../../components/achievements/ParticipationTimeline";
import AchievementYearCard from "../../components/achievements/AchievementYearCard";
import GlobalInfluence from "../../components/home/GlobalInfluence";
import TestimonialsSection from '../../components/home/TestimonialsSection';
import { useAchievementsPageData } from "@/hooks/useAchievementsPageData";
import { API_BASE_URL } from "@/lib/config";

// Unused components for now
// import AchievementsHero from "../../components/achievements/AchievementsHero";
// import AchievementsIntro from "../../components/achievements/AchievementsIntro";
// import OurPresence from "../../components/achievements/OurPresence";
// import AcademicCollaborations from "../../components/achievements/AcademicCollaborations";
// import ClientsPortfolio from "../../components/achievements/ClientsPortfolio";

export default function AchievementsPage() {
    const { data, updateSection, editMode, setEditMode, saveData, isLoaded: hookLoaded } = useAchievementsPageData();
    const [isSaving, setIsSaving] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [apiData, setApiData] = useState<any>(null);
    const [apiLoaded, setApiLoaded] = useState(false);

    useEffect(() => {
        const fetchAchievementsData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/our-achievements`);
                const json = await response.json();
                if (json.success && json.data) {
                    setApiData(json.data);
                }
            } catch (error) {
                console.error("Failed to fetch achievements data", error);
                toast.error("Failed to lead updated content");
            } finally {
                setApiLoaded(true);
            }
        };
        fetchAchievementsData();
    }, []);

    if (!hookLoaded || !apiLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // Merge API data with local data
    // We prioritize API data for specific fields
    const finalData = {
        ...data,
        hero: {
            ...data.hero,
            image: ""
        },
        intro: {
            ...data.intro,
            heading: apiData?.title || data.intro.heading,
            badgeText: apiData?.subtitle || data.intro.badgeText,
            mainImage: apiData?.featured_image_url || "",
            paragraphs: apiData?.body ? [apiData.body] : data.intro.paragraphs,
            list: data.intro.list
        },
        participationTimeline: data.participationTimeline,
        achievementYears: data.achievementYears,
        presence: data.presence,
        universityCollaborations: data.universityCollaborations,
        clients: data.clients,
        testimonials: data.testimonials
    };

    // Map Achievements data to AboutHero format
    const mappedHeroData: AboutHeroData = {
        heading: "Our Achievements",
        subtitle: finalData.intro.badgeText,
        image: finalData.intro.mainImage,
        tag: finalData.intro.badgeText,
        badgeNumber: "",
        badgeText: "",
        h2: finalData.intro.heading,
        paragraphs: finalData.intro.paragraphs
    };

    const handleHeroUpdate = (newData: AboutHeroData) => {
        updateSection("intro", {
            ...finalData.intro,
            mainImage: newData.image,
            heading: newData.h2,
            paragraphs: newData.paragraphs,
            badgeText: newData.subtitle // mapping subtitle back to badgeText/subtitle
        });
    };

    const handleEditClick = () => {
        setIsEditLoading(true);
        setTimeout(() => {
            setEditMode(true);
            setIsEditLoading(false);
        }, 600);
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate save
        setTimeout(() => {
            saveData();
            setEditMode(false);
            setIsSaving(false);
            toast.success("✅ Content saved successfully");
        }, 800);
    };

    return (
        <section className="bg-[#F7F9FC] relative min-h-screen">
            <Toaster position="top-right" />


            <AboutHero
                data={mappedHeroData}
                editMode={editMode}
                updateData={handleHeroUpdate}
            />

            {/* <AchievementsHero
                data={finalData.hero}
                editMode={editMode}
                updateData={(d) => updateSection("hero", d)}
            />
            <AchievementsIntro
                data={finalData.intro}
                editMode={editMode}
                updateData={(d) => updateSection("intro", d)}
            /> */}

            <section className="max-w-7xl mx-auto py-20 px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    <ParticipationTimeline
                        data={finalData.participationTimeline}
                        editMode={editMode}
                        updateData={(d) => updateSection("participationTimeline", d)}
                    />
                    <AchievementYearCard
                        data={finalData.achievementYears}
                        editMode={editMode}
                        updateData={(d) => updateSection("achievementYears", d)}
                    />
                </div>
            </section>

            {/* <OurPresence
                data={finalData.presence}
                editMode={editMode}
                updateData={(d) => updateSection("presence", d)}
            /> */}

            {/* <AcademicCollaborations
                data={finalData.universityCollaborations}
                editMode={editMode}
                updateData={(d) => updateSection("universityCollaborations", d)}
            /> */}

            <GlobalInfluence />
            <TestimonialsSection />
        </section>
    );
}
