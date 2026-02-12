import { notFound, redirect } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";
import type { ApiCourseDetailsResponse } from "@/types/course";
import { courses, type Course } from "../../../data/courses";
import { coursePrograms } from "../../../data/coursePrograms";

// Course Detail Imports
import CourseHero from "../../../components/course/CourseHero";
import CourseSidebar from "../../../components/course/CourseSidebar";
import CourseInfo from "../../../components/course/CourseInfo";
import CourseHighlights from "../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../components/course/EnquiriesSection";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
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
                programSlug: "", // Not critical for details page
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

export default async function CourseDetailsPage({ params }: PageProps) {
    const { slug } = await params;

    // 1. Check if slug matches a known PROGRAM (redirect if so)
    const knownProgram = coursePrograms.find(p => p.slug === slug);
    if (knownProgram) {
        console.log(`[CourseDetailsPage] Slug '${slug}' is a program. Redirecting to /${slug}`);
        redirect(`/${slug}`);
    }

    // 2. Try static data
    let course: Course | null | undefined = courses.find((c) => c.slug === slug);

    // 3. Try API
    if (!course) {
        course = await getApiCourseDetails(slug);
    }

    if (!course) notFound();

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
