// app/page.tsx
import { Metadata } from 'next';
import { API_BASE_URL } from '../lib/config';
import Banner from "../components/home/Banner";
import GlobalInfluence from "../components/home/GlobalInfluence";
import AboutUs from "../components/home/AboutUs";
import EventsSection from "../components/home/EventsSection";
import ExploreCourses from '../components/home/ExploreCourses';
import OnlineCoursesSection from '../components/home/OnlineCoursesSection';
import AdmissionStepper from '../components/home/AdmissionStepper';
import CoursesFeeSection from '../components/home/CoursesFeeSection';
import FeeStructureSection from '../components/home/FeeStructureSection';
import TrainingInternshipSection from '../components/home/TrainingInternshipSection';
import CapturedMomentsSection from '../components/home/CapturedMomentsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ForensicInsightsSection from '../components/home/ForensicInsightsSection';
import Partners from '../components/home/Partners';
import DownloadSection from '../components/home/DownloadSection';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
      cache: 'no-store',
    });
    const json = await response.json();

    if (json.success && json.data?.be) {
      const meta = json.data.be;
      return {
        title: meta.home_meta_title,
        description: meta.home_meta_description,
        keywords: meta.home_meta_keywords,
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return {
    title: "Sherlock Institute of Forensic Science",
    description: "Industry-specific and Job-ready Forensic Science Courses, Internships, and Workshops.",
  };
}


export default function HomePage() {
  return (
    <>
      <Banner />
      <GlobalInfluence />
      <AboutUs />
      <EventsSection />
      <ExploreCourses />
      <OnlineCoursesSection />
      <AdmissionStepper />
      <CoursesFeeSection />
      <FeeStructureSection />
      <TrainingInternshipSection />
      <CapturedMomentsSection />
      <TestimonialsSection />
      <Partners />
      <DownloadSection />
      <ForensicInsightsSection />
    </>
  );
}
