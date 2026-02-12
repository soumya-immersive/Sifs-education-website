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
        console.log(`[getApiCourses] Fetching from: ${endpoint}`);
        const response = await fetch(endpoint, {
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`[getApiCourses] Failed to fetch courses:`, response.status, response.statusText);
            const errorText = await response.text();
            console.error(`[getApiCourses] Error response:`, errorText);
            return [];
        }

        const responseText = await response.text();
        console.log(`[getApiCourses] Raw response (first 500 chars):`, responseText.substring(0, 500));

        let json: any;
        try {
            json = JSON.parse(responseText);
        } catch (parseError) {
            console.error(`[getApiCourses] JSON parse error:`, parseError);
            console.error(`[getApiCourses] Response text:`, responseText);
            return [];
        }

        console.log(`[getApiCourses] Parsed JSON structure:`, {
            success: json.success,
            hasData: !!json.data,
            dataKeys: json.data ? Object.keys(json.data) : [],
            isDataArray: Array.isArray(json.data),
            hasDataData: json.data?.data ? true : false,
            isDataDataArray: Array.isArray(json.data?.data)
        });

        // Check if data is directly in json.data (array)
        if (json.success && Array.isArray(json.data)) {
            console.log(`[getApiCourses] Found ${json.data.length} courses (direct array)`);
            const mappedCourses = json.data.map((apiCourse: any) => ({
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
            console.log(`[getApiCourses] Mapped courses:`, mappedCourses);
            return mappedCourses;
        }

        // Check if data is in json.data.data (nested)
        if (json.success && json.data && Array.isArray(json.data.data)) {
            console.log(`[getApiCourses] Found ${json.data.data.length} courses (nested array)`);
            const mappedCourses = json.data.data.map((apiCourse: any) => ({
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
            console.log(`[getApiCourses] Mapped courses:`, mappedCourses);
            return mappedCourses;
        } else {
            console.warn(`[getApiCourses] Invalid response structure:`, {
                success: json.success,
                hasData: !!json.data,
                isArray: Array.isArray(json.data?.data)
            });
        }

        return [];
    } catch (error) {
        console.error(`[getApiCourses] Error fetching courses:`, error);
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
    console.log(`[ProgramPage] Processing slug: ${slug}`);

    // 1. Try to fetch as a COURSE CATEGORY first (slug kuch bhi ho skta h)
    const categoryEndpoint = `${API_BASE_URL}/EducationAndInternship/Website/front/courses/category/${slug}`;
    console.log(`[ProgramPage] Attempting to fetch courses from: ${categoryEndpoint}`);
    const programCourses = await getApiCourses(slug, categoryEndpoint);

    console.log(`[ProgramPage] Retrieved ${programCourses.length} courses for slug: ${slug}`);

    // ----------------------------------------------------------------------
    // LOGIC: Render Page if API has data OR if it's a known Program
    // ----------------------------------------------------------------------
    const knownCourseProgram = coursePrograms.find((p) => p.slug === slug);

    if (programCourses.length > 0 || knownCourseProgram) {
        // Determine which courses to show: API > Static > Empty
        let coursesToDisplay = programCourses;
        if (coursesToDisplay.length === 0) {
            console.log(`[ProgramPage] No API courses for ${slug}, checking static data...`);
            coursesToDisplay = courses.filter((c) => c.programSlug === slug);
        }

        const displayProgram = knownCourseProgram || {
            label: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            slug: slug
        };

        console.log(`[ProgramPage] Rendering courses page with program:`, displayProgram);

        return (
            <main>
                <CoursesHero program={displayProgram} />
                <CoursesFilterBar />
                <CoursesGrid courses={coursesToDisplay} />
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

    // 3. Fallback to 404 if not found in any category and no data returned
    console.warn(`[ProgramPage] Slug ${slug} not found in API or local config. Returning Data Not Found.`);

    return (
        <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
            <div className="text-center max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Data Not Found</h1>
                <p className="text-gray-600 mb-8">
                    We couldn't find the page you're looking for. It might have been moved or doesn't exist.
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
