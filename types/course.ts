export interface ApiCourse {
    id: number;
    language_id: number;
    course_category_id: number;
    course_code: string;
    title: string;
    sub_title: string;
    slug: string;
    mode_of_study: string;
    video_url: string | null;
    google_form_url: string | null;
    video_id: string | null;
    image: string;
    profile_image: string | null;
    price_level_1: string;
    price_level_2: string;
    price_level_3: string;
    int_price_level_1: string;
    int_price_level_2: string;
    int_price_level_3: string;
    call_for_assistance: string;
    duration: string;
    level: string;
    course_outline: string;
    evaluation: string | null;
    career: string | null;
    case_studies: string;
    serial_number: number;
    seo_title: string;
    meta_keywords: string;
    meta_description: string;
    status: number;
    featured: number;
    created_at: string;
    updated_at: string;
    language_code: string;
    language_name: string;
    image_url: string;
}

export interface ApiCoursesResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        data: ApiCourse[];
        pagination: {
            current_page: number;
            per_page: number;
            total: number;
            total_pages: number;
            showing_from: number;
            showing_to: number;
            has_previous: boolean;
            has_next: boolean;
            search_query: string;
        };
        summary: {
            showing: string;
            search_info: string;
        };
        filters: {
            search: string;
            sort: string;
            level: string;
            duration: string;
            studyMode: string;
        };
        rurl: string;
        url: string;
    };
}

// --- New Types for Course Details ---

// --- New Types for Course Details ---

export interface ApiInstructor {
    id: number;
    name: string;
    email: string;
    rank: string;
    education: string;
    about: string;
    image: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    image_url: string;
}

export interface ApiFaq {
    id: number;
    question: string;
    answer: string;
    status: number;
    serial_number: number;
}

export interface ApiReview {
    id: number;
    student_name: string;
    star: number;
    review: string;
    status: number;
}

export interface ApiProspectus {
    id: number;
    course_id: number;
    level_one: string;
    body_one: string;
    level_two: string | null;
    body_two: string | null;
    level_three: string | null;
    body_three: string | null;
    level_four: string | null;
    body_four: string | null;
    image_url: string;
}

export interface ApiComment {
    id: number;
    record_type: string;
    service_id: number;
    name: string;
    mobile: string;
    email: string;
    query: string;
    reply: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface ApiCourseDetailsData {
    course: ApiCourse;
    url: string;
    comments: ApiComment[];
    instructors: ApiInstructor[]; // Added
    faq: ApiFaq[]; // Added
    reviews: ApiReview[]; // Added
    prospectus: ApiProspectus; // Added
    indiaLocation: boolean;
    seo_title: string;
    seo_description: string;
    seo_keyword: string;
    // pageSection might not be present in this response, so made optional or removed if not needed? 
    // The sample JSON didn't show pageSection but showed others. I will leave it out or optional.
    pageSection?: any;
}

export interface ApiCourseDetailsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: ApiCourseDetailsData;
}
