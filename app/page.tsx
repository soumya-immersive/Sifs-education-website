// app/page.tsx
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
      <ForensicInsightsSection /> 
    </>
  );
}
