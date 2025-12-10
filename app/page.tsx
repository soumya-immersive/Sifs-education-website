// app/page.tsx
import Banner from "../components/home/Banner";
import GlobalInfluence from "../components/home/GlobalInfluence";
import AboutUs from "../components/home/AboutUs";
import EventsSection from "@/components/home/EventsSection";
import ExploreCourses from '@/components/home/ExploreCourses';

export default function HomePage() {
  return (
    <>
      <Banner />
      <GlobalInfluence />
      <AboutUs />
      <EventsSection />
      <ExploreCourses />
      {/* <Features /> */}
      {/* <Testimonials /> */}
    </>
  );
}
