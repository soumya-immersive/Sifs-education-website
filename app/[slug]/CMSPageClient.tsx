"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import AboutHero from "../../components/about/AboutHero";
import InitiativesSection from "../../components/about/InitiativesSection";
import ExpertTeam from "../../components/about/ExpertTeam";
import TestimonialsSection from '../../components/home/TestimonialsSection';

import { API_BASE_URL, BASE_URL } from "@/lib/config";
import { useAboutPageData } from "@/hooks/useAboutPageData";

interface CMSPageClientProps {
    initialPageData: any;
}

export default function CMSPageClient({ initialPageData }: CMSPageClientProps) {
    const { data: globalData, isLoaded: hookLoaded } = useAboutPageData();
    const [apiData, setApiData] = useState<any>(null);
    const [isApiLoaded, setIsApiLoaded] = useState(false);

    useEffect(() => {
        const fetchCommonData = async () => {
            try {
                // Fetch front and team data (same as About page) to keep design consistent
                const [frontRes, teamRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`),
                    fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/team`)
                ]);

                const frontJson = await frontRes.json();
                const teamJson = await teamRes.json();

                setApiData({
                    front: frontJson.success ? frontJson.data : null,
                    team: teamJson.success ? teamJson.data : null
                });

            } catch (error) {
                console.error("Failed to fetch common CMS page data:", error);
            } finally {
                setIsApiLoaded(true);
            }
        };

        fetchCommonData();
    }, []);

    if (!hookLoaded || !isApiLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // Merge Page-specific data with global design sections
    const finalData = {
        ...globalData,
        hero: {
            ...globalData.hero,
            heading: initialPageData.title || globalData.hero.heading,
            subtitle: initialPageData.subtitle || globalData.hero.subtitle,
            image: initialPageData.featured_image_url || globalData.hero.image,
            h2: initialPageData.name || initialPageData.title || globalData.hero.h2,
            paragraphs: initialPageData.body ? [initialPageData.body] : globalData.hero.paragraphs,
        },
        team: {
            ...globalData.team,
            subtitle: apiData?.front?.bs?.team_subtitle || "Meet our Expert Team",
            headingPrefix: "",
            headingHighlight: apiData?.front?.bs?.team_title || "Our Experts",
            headingSuffix: "",
            experts: apiData?.team?.members?.length > 0
                ? apiData.team.members.map((m: any) => {
                    let imageUrl = m.image || "";
                    if (imageUrl && !imageUrl.startsWith("http")) {
                        imageUrl = `${BASE_URL}/uploads/Education-And-Internship-Admin-Member/${imageUrl}`;
                    }
                    return {
                        name: m.name,
                        role: m.rank || "Expert",
                        image: imageUrl || "/teams/team1.png"
                    };
                })
                : globalData.team.experts
        }
    };

    return (
        <main className="bg-[#F7F9FC] relative min-h-screen">
            <div className="">
                <AboutHero
                    data={finalData.hero}
                    editMode={false}
                    updateData={() => { }}
                />

                <InitiativesSection
                    data={globalData.initiatives}
                    editMode={false}
                    updateData={() => { }}
                />

                {/* <ExpertTeam
                    data={finalData.team}
                    editMode={false}
                    updateData={() => { }}
                /> */}

                <TestimonialsSection />
            </div>
        </main>
    );
}
