import { notFound } from "next/navigation";
import Link from "next/link";
import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { trainingPrograms } from "../../data/trainingPrograms";
import { trainings as staticTrainings, type Training } from "../../data/trainings";
import { courses, type Course } from "../../data/courses";
import { internships, type Internship } from "../../data/internships";
import { API_BASE_URL } from "@/lib/config";
import type { Metadata, ResolvingMetadata } from "next"; // Added Metadata imports
import type { ApiCoursesResponse } from "@/types/course";

// Courses Components
import CoursesHero from "../../components/courses/CoursesHero";
import CoursesFilterBar from "../../components/courses/CoursesFilterBar";
import CoursesGrid, { PaginationData } from "../../components/courses/CoursesGrid";
import CourseLearning from "../../components/courses/Learning";

// Internship Components
import InternshipsHero from "../../components/internships/InternshipsHero";
import InternshipsFilterBar from "../../components/internships/InternshipsFilterBar";
import InternshipsGrid from "../../components/internships/InternshipsGrid";
import InternshipLearning from "../../components/internships/Learning";

// Training Components
import TrainingHero from "../../components/trainings/TrainingHero";
import TrainingFilterBar from "../../components/trainings/TrainingFilterBar";
import TrainingGrid from "../../components/trainings/TrainingGrid";
import TrainingLearning from "../../components/trainings/Learning";
import PageBanner from "@/components/common/PageBanner"; // Added import
import CMSPageClient from "./CMSPageClient";

interface Props {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
        slevel?: string;
        sduration?: string;
        sno?: string;
        scat?: string;
    }>;
}

interface PaginatedCourses {
    courses: Course[];
    pagination?: PaginationData;
}

// ----------------------------------------------------------------------
// HELPER: Fetch Courses for Program Listing
// ----------------------------------------------------------------------
async function getApiCourses(programSlug: string, endpoint: string, page: number = 1, limit: number = 10, search: string = "", slevel: string = "", sduration: string = "", sno: string = ""): Promise<PaginatedCourses & { success: boolean }> {
    try {
        const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";
        const levelQuery = slevel ? `&slevel=${encodeURIComponent(slevel)}` : "";
        const durationQuery = sduration ? `&sduration=${encodeURIComponent(sduration)}` : "";
        const sortQuery = sno ? `&sno=${encodeURIComponent(sno)}` : "";

        const paginatedEndpoint = `${endpoint}?page=${page}&limit=${limit}${searchQuery}${levelQuery}${durationQuery}${sortQuery}&_t=${Date.now()}`;
        const response = await fetch(paginatedEndpoint, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return { courses: [], success: false };
        }

        const json = await response.json();

        // Check if data is directly in json.data (array) - No pagination
        if (json.success && Array.isArray(json.data)) {
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
            return { courses: mappedCourses, success: true };
        }

        // Check if data is in json.data.data (nested with pagination)
        if (json.success && json.data && Array.isArray(json.data.data)) {
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

            return {
                courses: mappedCourses,
                success: true,
                pagination: {
                    current_page: json.data.current_page,
                    per_page: json.data.per_page,
                    total: json.data.total,
                    total_pages: json.data.last_page,
                    showing_from: ((json.data.current_page - 1) * json.data.per_page) + 1,
                    showing_to: Math.min(json.data.current_page * json.data.per_page, json.data.total),
                    has_previous: json.data.current_page > 1,
                    has_next: json.data.current_page < json.data.last_page
                }
            };
        } else if (json.success && json.data && Array.isArray(json.data.courses)) {
            const mappedCourses = json.data.courses.map((apiCourse: any) => ({
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
            return { courses: mappedCourses, success: true };
        }

        return { courses: [], success: json.success || false };
    } catch (error) {
        console.error(`[getApiCourses] Error fetching courses:`, error);
        return { courses: [], success: false };
    }
}

// ----------------------------------------------------------------------
// HELPER: Fetch Internships for Program Listing
// ----------------------------------------------------------------------
async function getApiInternships(programSlug: string, endpoint: string, page: number = 1, limit: number = 10, search: string = "", sduration: string = "", sno: string = "", scat: string = ""): Promise<{ internships: Internship[], pagination?: PaginationData, success: boolean }> {
    try {
        const queryParams = new URLSearchParams();
        // Use a high limit to fetch all categories to find the correct one
        queryParams.append('limit', "100");
        if (search) queryParams.append('search', search);
        if (sno) queryParams.append('sno', sno);
        if (sduration) queryParams.append('sduration', sduration);
        if (scat) queryParams.append('scat', scat);
        queryParams.append('_t', String(Date.now()));

        const url = `${endpoint}?${queryParams.toString()}`;
        const response = await fetch(url, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return { internships: [], success: false };
        }

        const json = await response.json();

        let targetCategory: any = null;
        let dataArr: any[] = [];

        if (json.success && json.data) {
            if (Array.isArray(json.data.categories)) {
                targetCategory = json.data.categories.find((c: any) => c.slug === programSlug);
            } else if (Array.isArray(json.data)) {
                // Fallback if data is direct array
                targetCategory = json.data.find((c: any) => c.slug === programSlug);
            }
        }

        if (targetCategory && Array.isArray(targetCategory.trainings)) {
            dataArr = targetCategory.trainings;
        }

        // Fix: Only return success if we actually found the category or valid data
        if (targetCategory) {
            if (dataArr.length > 0) {
                let filteredItems = dataArr.map((item: any) => ({
                    id: item.id.toString(),
                    title: item.title,
                    overview: item.sub_title,
                    image: item.image_url,
                    heroImage: item.image_url,
                    slug: item.slug,
                    programSlug: programSlug,
                    category: item.mode_of_study || 'Training',
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

                // Client-side filtering
                if (search) {
                    const searchLower = search.toLowerCase();
                    filteredItems = filteredItems.filter((t: any) =>
                        t.title.toLowerCase().includes(searchLower) ||
                        (t.overview && t.overview.toLowerCase().includes(searchLower))
                    );
                }

                if (sduration) {
                    const durationLower = sduration.toLowerCase();
                    filteredItems = filteredItems.filter((t: any) =>
                        t.duration && t.duration.toLowerCase().includes(durationLower)
                    );
                }

                // Manual Pagination
                const total = filteredItems.length;
                const totalPages = Math.ceil(total / limit);
                const offset = (page - 1) * limit;
                const paginatedItems = filteredItems.slice(offset, offset + limit);

                const pagination: PaginationData = {
                    current_page: page,
                    per_page: limit,
                    total: total,
                    total_pages: totalPages,
                    showing_from: offset + 1,
                    showing_to: Math.min(offset + limit, total),
                    has_previous: page > 1,
                    has_next: page < totalPages
                };

                return { internships: paginatedItems, pagination, success: true };
            }

            // Category found but empty list
            return { internships: [], success: true };
        }

        // Category not found
        return { internships: [], success: false };

    } catch (error) {
        console.error("Error fetching internships:", error);
        return { internships: [], success: false };
    }
}

// ----------------------------------------------------------------------
// HELPER: Fetch Generic CMS Page
// ----------------------------------------------------------------------
interface PageApiData {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    featured_image: string;
    body: string;
    featured_image_url: string;
    seo?: {
        seo_title: string;
        seo_description: string;
        seo_keywords: string;
        seo_og_image: string;
    };
    seo_title?: string;
    meta_description?: string;
    meta_keywords?: string;
}


async function getGenericPage(slug: string): Promise<PageApiData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/${slug}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return null;

        const json = await res.json();

        if (json.success && json.data) {
            return json.data;
        }

        return null;
    } catch (error) {
        console.error(`Error fetching generic page data for slug: ${slug}`, error);
        return null;
    }
}


// ----------------------------------------------------------------------
// GENERATE METADATA
// ----------------------------------------------------------------------
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;

    // 1. Try to fetch as a GENERIC CMS PAGE
    const genericPageData = await getGenericPage(slug);

    if (genericPageData) {
        const title = genericPageData.seo?.seo_title || genericPageData.seo_title || genericPageData.title;
        const description = genericPageData.seo?.seo_description || genericPageData.meta_description || genericPageData.subtitle;
        const keywords = genericPageData.seo?.seo_keywords || genericPageData.meta_keywords;
        const ogImage = genericPageData.seo?.seo_og_image || genericPageData.featured_image_url;

        return {
            title: title,
            description: description,
            keywords: keywords,
            openGraph: {
                title: title,
                description: description,
                images: ogImage ? [ogImage] : [],
            },
        };
    }

    // Default fallback (could be improved to fetch course/training titles)
    return {
        title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    };
}


export default async function ProgramPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page, limit, search, slevel, sduration, sno } = await searchParams;

    const currentPage = parseInt(page as string) || 1;
    const currentLimit = parseInt(limit as string) || 10;

    console.log(`[ProgramPage] Processing slug: ${slug}, page: ${currentPage}`);

    // 1. Try to fetch as a COURSE CATEGORY first
    let apiSlug = slug;
    if (slug === 'foundation-certificate') {
        apiSlug = 'foundation-forensic-courses';
    }

    const categoryEndpoint = `${API_BASE_URL}/EducationAndInternship/Website/front/courses/category/${apiSlug}`;
    console.log(`[ProgramPage] Attempting to fetch courses from: ${categoryEndpoint}, page: ${currentPage}, search: ${search}, slevel: ${slevel}, sduration: ${sduration}, sno: ${sno}`);
    const result = await getApiCourses(slug, categoryEndpoint, currentPage, currentLimit, search || "", slevel || "", sduration || "", sno || "");
    const programCourses = result.courses;
    const pagination = result.pagination;
    const courseSuccess = result.success;

    // 2. Try to fetch as an INTERNSHIP or TRAINING PROGRAM
    const trainingEndpoint = `${API_BASE_URL}/EducationAndInternship/Website/training-categories`;
    const { scat, search: iSearch, sduration: iDuration, sno: iSno } = await searchParams;
    const internshipResult = await getApiInternships(slug, trainingEndpoint, currentPage, currentLimit, (iSearch as string) || "", (iDuration as string) || "", (iSno as string) || "", (scat as string) || "");
    const programItems = internshipResult.internships;
    const internshipPagination = internshipResult.pagination;
    const trainingSuccess = internshipResult.success;

    // 3. Try to fetch as a GENERIC CMS PAGE
    const genericPageData = await getGenericPage(slug);

    // ----------------------------------------------------------------------
    // UNIFIED RENDERING LOGIC
    // ----------------------------------------------------------------------

    // PRIORITY 1: Generic CMS Page
    if (genericPageData) {
        return <CMSPageClient initialPageData={genericPageData} />;
    }



    // ----------------------------------------------------------------------
    // UNIFIED RENDERING LOGIC
    // ----------------------------------------------------------------------

    // Check if it's potentially a Course Program
    const knownCourseProgram = coursePrograms.find((p) => p.slug === slug);
    const isCourseProgram = knownCourseProgram || courseSuccess;

    // Check if it's potentially an Internship or Training Program
    const internshipProgram = internshipPrograms.find((p) => p.slug === slug);
    const trainingProgram = trainingPrograms.find((p) => p.slug === slug);
    const isInternshipOrTraining = internshipProgram || trainingProgram || trainingSuccess;

    const DataNotFoundMessage = ({ title = "No Items Found", message = "No items are available in this category at the moment." }: { title?: string, message?: string }) => (
        <div className="py-20 text-center max-w-lg mx-auto px-4">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-500 mb-8">{message}</p>
        </div>
    );

    if (isCourseProgram) {
        const displayProgram = knownCourseProgram || {
            label: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            slug: slug
        };

        return (
            <main>
                <CoursesHero program={displayProgram} />
                <CoursesFilterBar />
                {programCourses.length > 0 ? (
                    <CoursesGrid courses={programCourses} pagination={pagination} slug={slug} />
                ) : (
                    <DataNotFoundMessage title="No Courses Found" />
                )}
                <CourseLearning />
            </main>
        );
    }

    if (isInternshipOrTraining) {
        const displayProgram = internshipProgram || trainingProgram || {
            label: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            slug: slug
        };

        const isTrainingType = trainingProgram || slug.toLowerCase().includes('training');

        if (isTrainingType) {
            const trainingsToDisplay = programItems.map(item => ({
                ...item,
                trainingCode: (item as any).trainingCode || item.id,
                reviewsCount: item.reviewsCount || 0,
                heroImage: item.heroImage || item.image || "/training/training.png"
            }));

            return (
                <main>
                    <TrainingHero program={displayProgram} />
                    <TrainingFilterBar />
                    {trainingsToDisplay.length > 0 ? (
                        <TrainingGrid trainings={trainingsToDisplay as any[]} pagination={internshipPagination} slug={slug} />
                    ) : (
                        <DataNotFoundMessage title="No Trainings Found" />
                    )}
                    <TrainingLearning />
                </main>
            );
        }

        return (
            <main>
                <InternshipsHero program={displayProgram} />
                <InternshipsFilterBar />
                {programItems.length > 0 ? (
                    <InternshipsGrid internships={programItems} pagination={internshipPagination} slug={slug} />
                ) : (
                    <DataNotFoundMessage title="No Internships Found" />
                )}
                <InternshipLearning />
            </main>
        );
    }




    // Default Fallback: If we couldn't determine the type but want to show something
    notFound();
}

