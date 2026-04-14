"use client";

import React from "react";
import { notFound } from "next/navigation";

import CourseHero from "../../../../components/course/CourseHero";
import CourseSidebar from "../../../../components/course/CourseSidebar";
import CourseInfo from "../../../../components/course/CourseInfo";
import CourseHighlights from "../../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../../components/course/EnquiriesSection";

import { COURSES_PAGE_INITIAL_DATA } from "../../../../lib/data/courses-page-data";

interface PageProps {
  params: Promise<{
    program: string;
    course: string;
  }>;
}

export default function CourseDetailsPage({ params: paramsPromise }: PageProps) {
  const params = React.use(paramsPromise);
  const { program, course: courseSlug } = params;

  const data = COURSES_PAGE_INITIAL_DATA;

  const course = data.courses.find(
    (c) => c.programSlug === program && c.slug === courseSlug
  );

  if (!course) notFound();

  return (
    <main className="relative bg-white min-h-screen">
      <CourseHero
        course={course}
      />

      <div className="max-w-7xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
        <div className="lg:col-span-2 space-y-12">
          <CourseInfo
            course={course}
          />
          <CourseHighlights
            course={course}
          />
          <AccordionBlocks
            course={course}
          />
          <PaymentDetails
            course={course}
          />
        </div>

        <div className="lg:-mt-48 relative z-20">
          <CourseSidebar
            course={course}
          />
        </div>
      </div>

      <EnquiriesSection
        data={data.enquiries}
      />
    </main>
  );
}