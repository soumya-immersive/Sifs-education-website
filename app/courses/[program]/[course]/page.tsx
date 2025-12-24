import { notFound } from "next/navigation";
import { courses } from "../../../../data/courses";

import CourseHero from "../../../../components/course/CourseHero";
import CourseSidebar from "../../../../components/course/CourseSidebar";
import CourseInfo from "../../../../components/course/CourseInfo";
import CourseHighlights from "../../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../../components/course/EnquiriesSection";

interface Props {
  params: Promise<{
    program: string;
    course: string;
  }>;
}

export default async function CourseDetailsPage({ params }: Props) {
  const { program, course: courseSlug } = await params; // ✅ FIX

  const course = courses.find(
    (c) =>
      c.programSlug === program &&
      c.slug === courseSlug
  );

  if (!course) notFound();

  return (
    <section className="bg-white">
      <CourseHero course={course} />

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CourseInfo course={course} />
          <CourseHighlights course={course} />
          <AccordionBlocks course={course} />
          <PaymentDetails course={course} />
        </div>

        <div className="lg:-mt-32">
          <CourseSidebar course={course} />
        </div>
      </div>

      <EnquiriesSection />
    </section>
  );
}
