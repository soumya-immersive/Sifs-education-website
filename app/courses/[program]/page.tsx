import { notFound } from "next/navigation";

// Program Listing Imports
import CoursesHero from "../../../components/courses/CoursesHero";
import CoursesFilterBar from "../../../components/courses/CoursesFilterBar";
import CoursesGrid from "../../../components/courses/CoursesGrid";
import Learning from "../../../components/courses/Learning";

// Course Detail Imports
import CourseHero from "../../../components/course/CourseHero";
import CourseSidebar from "../../../components/course/CourseSidebar";
import CourseInfo from "../../../components/course/CourseInfo";
import CourseHighlights from "../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../components/course/EnquiriesSection";

// Data & Config
import { coursePrograms } from "../../../data/coursePrograms";
import { courses, type Course } from "../../../data/courses";
import { API_BASE_URL } from "@/lib/config";
import type { ApiCoursesResponse, ApiCourseDetailsResponse } from "@/types/course";

interface Props {
  params: Promise<{
    program: string;
  }>;
}

// ----------------------------------------------------------------------
// HELPER: Fetch Courses for Program Listing
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// HELPER: Fetch Courses for Program Listing
// ----------------------------------------------------------------------
async function getApiCourses(programSlug: string, endpoint: string): Promise<Course[]> {
  try {
    console.log(`[getApiCourses] Fetching from: ${endpoint}`);
    const response = await fetch(endpoint, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[getApiCourses] Failed: ${response.status} ${response.statusText}`);
      return [];
    }

    const json = await response.json();
    console.log(`[getApiCourses] Response success: ${json.success}, data length: ${json.data?.data?.length}`);

    if (json.success && json.data && Array.isArray(json.data.data)) {
      return json.data.data.map((apiCourse: any) => ({
        id: apiCourse.id,
        programSlug: programSlug,
        slug: apiCourse.slug,
        title: apiCourse.title,
        overview: apiCourse.sub_title || "",
        courseCode: apiCourse.course_code,
        heroImage: apiCourse.image_url,
        rating: 5.0,
        reviewsCount: 120,
        bannerImage: "/course/hero-bg.png",
        description: apiCourse.sub_title || ""
      }));
    }

    return [];
  } catch (error) {
    console.error("[getApiCourses] Error fetching courses:", error);
    return [];
  }
}

// ----------------------------------------------------------------------
// HELPER: Fetch Single Course Details
// ----------------------------------------------------------------------
async function getApiCourseDetails(slug: string): Promise<Course | null> {
  const url = `${API_BASE_URL}/EducationAndInternship/Website/courses/course-details/${slug}`;
  console.log(`[CourseDetails] Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[CourseDetails] Failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const json: ApiCourseDetailsResponse = await response.json();

    if (json.success && json.data && json.data.course) {
      const apiCourse = json.data.course;
      const apiComments = json.data.comments || [];

      return {
        id: apiCourse.id,
        // We don't necessarily know the programSlug here without context, 
        // but for display purposes it might not be critical, or we could infer it if needed.
        // For now, leaving it empty or we could try to map it if the API provided category info.
        programSlug: "",
        slug: apiCourse.slug,
        title: apiCourse.title,
        overview: apiCourse.sub_title || "",
        courseCode: apiCourse.course_code,
        heroImage: apiCourse.image_url || "/courses/course1.png",

        // Extended fields
        description: apiCourse.sub_title || "",
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

        // Defaults
        rating: 5.0,
        reviewsCount: 120,
        bannerImage: "/course/hero-bg.png",
      };
    }
    return null;
  } catch (error) {
    console.error("[CourseDetails] Error fetching course details:", error);
    return null;
  }
}

// ----------------------------------------------------------------------
// COMPONENT: Course Details View
// ----------------------------------------------------------------------
function CourseDetailsView({ course }: { course: Course }) {
  return (
    <section className="bg-white">
      <CourseHero course={course} />

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CourseInfo course={course} />

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

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------
export default async function Page({ params }: Props) {
  const { program: slug } = await params;
  console.log(`[CoursesPage] Processing slug: ${slug}`);

  // 1. Check if the slug corresponds to a PROGRAM (Category)
  const programData = coursePrograms.find((p) => p.slug === slug);

  if (programData) {
    console.log(`[CoursesPage] Found program data for: ${slug}`);

    // --- RENDER PROGRAM LISTING ---
    let programCourses: Course[] = [];

    // Map alias to actual API slug if necessary
    // If we are on 'foundation-certificate', we might need to ask for 'foundation-forensic-courses'
    let apiSlug = slug;
    if (slug === 'foundation-certificate') {
      apiSlug = 'foundation-forensic-courses';
    }

    const endpoint = `${API_BASE_URL}/EducationAndInternship/Website/front/courses/category/${apiSlug}`;
    console.log(`[CoursesPage] Using API endpoint: ${endpoint}`);

    programCourses = await getApiCourses(slug, endpoint);

    // Fallback to local courses if API returned nothing
    if (programCourses.length === 0) {
      console.log(`[CoursesPage] No API courses found, checking static data...`);
      programCourses = courses.filter((course) => course.programSlug === slug);
    }

    // Always return the page structure, even if empty (CoursesGrid handles empty state)
    return (
      <main>
        <CoursesHero program={programData} />
        <CoursesFilterBar />
        <CoursesGrid courses={programCourses} />
        <Learning />
      </main>
    );
  }

  // 2. If not a program, assume it's a COURSE and try to fetch details

  // Try finding in static data first (if any)
  let course: Course | null | undefined = courses.find((c) => c.slug === slug);

  // If not in static, try API
  if (!course) {
    course = await getApiCourseDetails(slug);
  }

  if (course) {
    // --- RENDER COURSE DETAIL ---
    return <CourseDetailsView course={course} />;
  }

  // 3. To prevent 404, show a "Data Not Found" section within the site layout
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Course Not Found</h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the course or program you're looking for. It might have been moved or doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-8 transition"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
