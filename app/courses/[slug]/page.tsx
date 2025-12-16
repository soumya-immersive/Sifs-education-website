import CourseHero from "../../../components/course/CourseHero";
import CourseSidebar from "../../../components/course/CourseSidebar";
import CourseInfo from "../../../components/course/CourseInfo";
import CourseHighlights from "../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../components/course/EnquiriesSection";

export default function CourseDetailsPage() {
    return (
        <section className="bg-white">
            <CourseHero />

            <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <CourseInfo />
                    <CourseHighlights />
                    <AccordionBlocks />
                    <PaymentDetails />
                </div>

                <div className="lg:-mt-32">
                    <CourseSidebar />
                </div>
            </div>
            <EnquiriesSection />
    </section>
  );
}
