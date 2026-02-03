"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import AboutHero from "../../components/about/AboutHero";

import InitiativesSection from "../../components/about/InitiativesSection";
import ExpertTeam from "../../components/about/ExpertTeam";
import TestimonialsSection from '../../components/home/TestimonialsSection';

import { API_BASE_URL, BASE_URL } from "@/lib/config";
import { useAboutPageData } from "@/hooks/useAboutPageData";

export default function AboutPage() {
  const { data, isLoaded: hookLoaded } = useAboutPageData();
  const [apiData, setApiData] = useState<any>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [pageRes, frontRes, teamRes] = await Promise.all([
          fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/about`),
          fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`),
          fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/team`)
        ]);

        const pageJson = await pageRes.json();
        const frontJson = await frontRes.json();
        const teamJson = await teamRes.json();

        setApiData({
          page: pageJson.success ? pageJson.data : null,
          front: frontJson.success ? frontJson.data : null,
          team: teamJson.success ? teamJson.data : null
        });

      } catch (error) {
        console.error("Failed to fetch about page data:", error);
      } finally {
        setIsApiLoaded(true);
      }
    };

    fetchAboutData();
  }, []);

  if (!hookLoaded || !isApiLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Merge API data with local data
  const finalData = {
    ...data,
    hero: {
      ...data.hero,
      heading: apiData?.page?.title || data.hero.heading,
      subtitle: apiData?.page?.subtitle || data.hero.subtitle,
      image: apiData?.page?.featured_image_url || data.hero.image,
      h2: apiData?.page?.name || data.hero.h2,
      paragraphs: apiData?.page?.body ? [apiData.page.body] : data.hero.paragraphs,
    },
    team: {
      ...data.team,
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
        : data.team.experts
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
          data={data.initiatives}
          editMode={false}
          updateData={() => { }}
        />

        <ExpertTeam
          data={finalData.team}
          editMode={false}
          updateData={() => { }}
        />

        <TestimonialsSection />
      </div>
    </main>
  );
}
