// app/about/page.tsx

import AboutHero from "../../components/about/AboutHero";
import MissionVision from "../../components/about/MissionVision";
import InitiativesSection from "../../components/about/InitiativesSection";
import ExpertTeam from "../../components/about/ExpertTeam";
import TestimonialsSection from '../../components/common/TestimonialsSection';

export default function AboutPage() {
  return (
    <main className="bg-[#F7F9FC]">
      <AboutHero />
      <MissionVision />
      <InitiativesSection />
      <ExpertTeam />
      <TestimonialsSection />
    </main>
  );
}
