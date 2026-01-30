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
async function getApiCourses(programSlug: string, endpoint: string): Promise<Course[]> {
  try {
    const response = await fetch(endpoint, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error("Failed to fetch courses:", response.status, response.statusText);
      return [];
    }

    const json: ApiCoursesResponse = await response.json();

    if (json.success && json.data && Array.isArray(json.data.data)) {
      return json.data.data.map((apiCourse) => ({
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
    console.error("Error fetching courses:", error);
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

  // 1. Check if the slug corresponds to a PROGRAM (Category)
  const programData = coursePrograms.find((p) => p.slug === slug);

  if (programData) {
    // --- RENDER PROGRAM LISTING ---
    let programCourses: Course[] = [];

    const apiEndpoints: Record<string, string> = {
      "associate-degree": `${API_BASE_URL}/EducationAndInternship/Website/courses/online-courses`,
      "foundation-certificate": `${API_BASE_URL}/EducationAndInternship/Website/courses/foundation-forensic-courses`,
      "advanced-certificate": `${API_BASE_URL}/EducationAndInternship/Website/courses/short-term-courses`,
      "short-term-courses": `${API_BASE_URL}/EducationAndInternship/Website/courses/short-term-courses`,
      "professional-courses": `${API_BASE_URL}/EducationAndInternship/Website/courses/professional-forensic-courses`,
      "classroom-courses": `${API_BASE_URL}/EducationAndInternship/Website/courses/classroom-courses`
    };

    if (apiEndpoints[slug]) {
      programCourses = await getApiCourses(slug, apiEndpoints[slug]);
    } else {
      programCourses = courses.filter((course) => course.programSlug === slug);
    }

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

  // 3. If neither, 404
  notFound();
}
