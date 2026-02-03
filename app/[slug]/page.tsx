import { notFound } from "next/navigation";
import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { courses, type Course } from "../../data/courses";
import { internships, type Internship } from "../../data/internships";
import { API_BASE_URL } from "@/lib/config";
import type { ApiCoursesResponse } from "@/types/course";

// Courses Components
import CoursesHero from "../../components/courses/CoursesHero";
import CoursesFilterBar from "../../components/courses/CoursesFilterBar";
import CoursesGrid from "../../components/courses/CoursesGrid";

// Internship Components
import InternshipsHero from "../../components/internships/InternshipsHero";
import InternshipsFilterBar from "../../components/internships/InternshipsFilterBar";
import InternshipsGrid from "../../components/internships/InternshipsGrid";

import CourseLearning from "../../components/courses/Learning";
import InternshipLearning from "../../components/internships/Learning";

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

// ----------------------------------------------------------------------
// HELPER: Fetch Internships for Program Listing
// ----------------------------------------------------------------------
async function getApiInternships(programSlug: string, endpoint: string): Promise<Internship[]> {
    try {
        const response = await fetch(endpoint, {
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error("Failed to fetch internships:", response.status, response.statusText);
            return [];
        }

        const json = await response.json();

        if (json.success && json.data && Array.isArray(json.data.data)) {
            return json.data.data.map((item: any) => ({
                id: item.id.toString(),
                title: item.title,
                overview: item.sub_title,
                image: item.image_url,
                heroImage: item.image_url,
                slug: item.slug,
                programSlug: programSlug,
                category: item.mode_of_study,
                duration: item.duration,
                level: item.level || 'All Levels',
                rating: 4.8,
                reviewsCount: 120,
                students: 500,
                price: item.price_level_1,
                originalPrice: item.price_level_1 ? parseInt(item.price_level_1) + 500 : 0,
                tags: ['Featured'],
                features: ['Certification', 'Hands-on', 'Expert Led']
            }));
        }

        return [];
    } catch (error) {
        console.error("Error fetching internships:", error);
        return [];
    }
}

export default async function ProgramPage({ params }: Props) {
    const { slug } = await params;

    // 1. Check if it's a COURSE PROGRAM
    const courseProgram = coursePrograms.find((p) => p.slug === slug);
    if (courseProgram) {
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
                <CoursesHero program={courseProgram} />
                <CoursesFilterBar />
                <CoursesGrid courses={programCourses} />
                <CourseLearning />
            </main>
        );
    }

    // 2. Check if it's an INTERNSHIP PROGRAM
    const internshipProgram = internshipPrograms.find((p) => p.slug === slug);
    if (internshipProgram) {
        let programInternships: Internship[] = [];
        const apiEndpoints: Record<string, string> = {
            "lab-based": `${API_BASE_URL}/EducationAndInternship/Website/training/lab-based-internship`,
            "online": `${API_BASE_URL}/EducationAndInternship/Website/training/online-forensic-internship`
        };

        if (apiEndpoints[slug]) {
            programInternships = await getApiInternships(slug, apiEndpoints[slug]);
        } else {
            programInternships = internships.filter((i) => i.programSlug === slug);
        }

        return (
            <main>
                <InternshipsHero program={internshipProgram} />
                <InternshipsFilterBar />
                <InternshipsGrid internships={programInternships} />
                <InternshipLearning />
            </main>
        );
    }

    // 3. Fallback to 404
    notFound();
}
