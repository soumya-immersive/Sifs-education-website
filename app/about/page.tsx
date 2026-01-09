"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import AboutHero from "../../components/about/AboutHero";
import MissionVision from "../../components/about/MissionVision";
import InitiativesSection from "../../components/about/InitiativesSection";
import ExpertTeam from "../../components/about/ExpertTeam";
import TestimonialsSection from '../../components/common/TestimonialsSection';
import { ABOUT_PAGE_INITIAL_DATA } from "@/lib/data/about-page-data";

export default function AboutPage() {
  const data = ABOUT_PAGE_INITIAL_DATA;

  return (
    <main className="bg-[#F7F9FC] relative min-h-screen">
      <Toaster position="top-right" />

      <div>
        <AboutHero
          data={data.hero}
        />
        <MissionVision
          data={data.mission}
        />
        <InitiativesSection
          data={data.initiatives}
        />
        <ExpertTeam
          data={data.team}
        />
        <TestimonialsSection
          data={data.testimonials}
        />
      </div>
    </main>
  );
}
