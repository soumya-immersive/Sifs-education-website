"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import AboutHero from "../../components/about/AboutHero";

import InitiativesSection from "../../components/about/InitiativesSection";
import ExpertTeam from "../../components/about/ExpertTeam";
import TestimonialsSection from '../../components/common/TestimonialsSection';

import { API_BASE_URL } from "@/lib/config";
import { useAboutPageData } from "@/hooks/useAboutPageData";

export default function AboutPage() {
  const { data, isLoaded: hookLoaded } = useAboutPageData();
  const [apiData, setApiData] = useState<any>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/about`);
        const json = await response.json();

        if (json.success && json.data) {
          setApiData(json.data);
        }
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
      heading: apiData?.title || data.hero.heading,
      subtitle: apiData?.subtitle || data.hero.subtitle,
      image: apiData?.featured_image_url || data.hero.image,
      h2: apiData?.name || data.hero.h2,
      // If API has body, use it. Pass as single array item for existing component structure.
      paragraphs: apiData?.body ? [apiData.body] : data.hero.paragraphs,
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
          data={data.team}
          editMode={false}
          updateData={() => { }}
        />

        <TestimonialsSection
          data={data.testimonials}
          editMode={false}
          updateData={() => { }}
        />
      </div>
    </main>
  );
}
