import { notFound } from "next/navigation";
import { coursePrograms } from "../../data/coursePrograms";
import { courses, type Course } from "../../data/courses";
import { API_BASE_URL } from "@/lib/config";
import type { ApiCoursesResponse } from "@/types/course";

import CoursesHero from "../../components/courses/CoursesHero";
import CoursesFilterBar from "../../components/courses/CoursesFilterBar";
import CoursesGrid from "../../components/courses/CoursesGrid";
import Learning from "../../components/courses/Learning";

interface Props {
    params: Promise<{
        slug: string;
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

export default async function ProgramPage({ params }: Props) {
    const { slug } = await params;

    // Check if the slug corresponds to a PROGRAM
    const programData = coursePrograms.find((p) => p.slug === slug);

    if (!programData) {
        notFound();
    }

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
