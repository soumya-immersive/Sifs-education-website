import { notFound } from "next/navigation";
import { courses, type Course } from "../../../../data/courses";
import { API_BASE_URL } from "@/lib/config";
import type { ApiCourseDetailsResponse, ApiComment } from "@/types/course";

import CourseHero from "../../../../components/course/CourseHero";
import CourseSidebar from "../../../../components/course/CourseSidebar";
import CourseInfo from "../../../../components/course/CourseInfo";
import CourseHighlights from "../../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../../components/course/EnquiriesSection";

interface PageProps {
  params: Promise<{
    program: string;
    course: string;
  }>;
}

async function getApiCourseDetails(slug: string, programSlug: string): Promise<Course | null> {
  const url = `${API_BASE_URL}/EducationAndInternship/Website/courses/course-details/${slug}`;
  console.log(`[CourseDetails] Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    console.log(`[CourseDetails] Response Status: ${response.status}`);

    if (!response.ok) {
      console.error(`[CourseDetails] Failed: ${response.statusText}`);
      return null;
    }

    const json: ApiCourseDetailsResponse = await response.json();

    if (json.success && json.data && json.data.course) {
      const apiCourse = json.data.course;
      const apiComments = json.data.comments || [];

      return {
        id: apiCourse.id,
        programSlug: programSlug,
        slug: apiCourse.slug,
        title: apiCourse.title,
        overview: apiCourse.sub_title || "",
        courseCode: apiCourse.course_code,
        heroImage: apiCourse.image_url || "/courses/course1.png", // Fallback

        // Extended fields
        description: apiCourse.sub_title || "", // Using subtitle as description
        priceLevel1: apiCourse.price_level_1,
        priceLevel2: apiCourse.price_level_2,
        priceLevel3: apiCourse.price_level_3,
        callForAssistance: apiCourse.call_for_assistance,
        duration: apiCourse.duration,
        level: apiCourse.level,
        courseOutline: apiCourse.course_outline,
        caseStudies: apiCourse.case_studies,
        faqs: apiComments,
        video_url: apiCourse.video_url || undefined,

        // New Mappings
        instructors: json.data.instructors,
        courseFaqs: json.data.faq,
        reviewsList: json.data.reviews,
        prospectus: json.data.prospectus,

        // Defaults for required fields not in API
        rating: 5.0,
        reviewsCount: 120,
        bannerImage: "/course/hero-bg.png",
      };
    } else {
      console.error("[CourseDetails] Invalid JSON structure:", JSON.stringify(json).slice(0, 200));
    }
    return null;
  } catch (error) {
    console.error("[CourseDetails] Error fetching course details:", error);
    return null;
  }
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { program, course: courseSlug } = await params;

  let course: Course | null | undefined;

  const apiSupportedPrograms = ["associate-degree", "foundation-certificate", "advanced-certificate", "short-term-courses", "professional-courses", "classroom-courses"];

  if (apiSupportedPrograms.includes(program)) {
    course = await getApiCourseDetails(courseSlug, program);
  } else {
    course = courses.find(
      (c) =>
        c.programSlug === program &&
        c.slug === courseSlug
    );
  }

  if (!course) notFound();

  return (
    <section className="bg-white">
      <CourseHero course={course} />

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CourseInfo course={course} />

          {/* For dynamic courses, content like highlights and payment details are included in the courseOutline/Overview */}
          {!course.courseOutline && <CourseHighlights course={course} />}

          <AccordionBlocks course={course} />

          {!course.courseOutline && <PaymentDetails course={course} />}
        </div>

        <div className="lg:-mt-32">
          <CourseSidebar course={course} />
        </div>
      </div>

      <EnquiriesSection enquiries={course.faqs} />
    </section>
  );
}