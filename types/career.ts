export interface CareerJob {
    id: number;
    jcategory_id: number;
    language_id: number;
    title: string;
    slug: string;
    vacancy: number;
    deadline: string;
    experience: string;
    job_responsibilities: string;
    employment_status: string;
    educational_requirements: string;
    experience_requirements: string;
    additional_requirements: string;
    job_location: string;
    salary: string;
    benefits: string;
    read_before_apply: string;
    email: string;
    serial_number: number;
    seo_title: string;
    meta_keywords: string;
    meta_description: string;
    created_at: string;
    updated_at: string;
    is_expired: boolean;
}

export interface CareerCategory {
    id: number;
    language_id: number;
    name: string;
    status: number;
    serial_number: number;
    created_at: string;
    updated_at: string;
}

export interface CareerPagination {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    showing_from: number;
    showing_to: number;
    has_previous: boolean;
    has_next: boolean;
    search_query: string;
}

export interface CareersResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        data: CareerJob[];
        pagination: CareerPagination;
        summary: {
            showing: string;
            search_info: string;
        };
        jcats: CareerCategory[];
        jobscount: number;
    };
}

export interface CareerDetailsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        job: CareerJob;
        jcats: CareerCategory[];
        jobscount: number;
        seo_title: string;
        seo_description: string;
        seo_keyword: string;
        seo_og_image: string | null;
        currentLang: {
            id: number;
            name: string;
            code: string;
            is_default: number;
            rtl: number;
            created_at: string;
            updated_at: string;
        };
    };
}
