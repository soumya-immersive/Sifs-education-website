export interface BlogPost {
    id: number;
    language_id: number;
    bcategory_id: number;
    title: string;
    slug: string;
    main_image: string;
    publish_date: string;
    author: string;
    content: string;
    seo_title: string | null;
    meta_keywords: string | null;
    meta_description: string | null;
    serial_number: number;
    created_at: string;
    updated_at: string;
}

export interface BlogPagination {
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

export interface BlogCategory {
    id: number;
    language_id: number;
    name: string;
    status: number;
    serial_number: number;
    blog_count: number;
    language_code?: string;
    language_name?: string;
}

export interface BlogsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp?: string;
    data: {
        data: BlogPost[];
        pagination: BlogPagination;
        summary?: {
            showing: string;
            search_info: string;
        };
        category?: BlogCategory;
        all_categories?: BlogCategory[];
    };
}
export interface BlogDetailsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: {
        blog: BlogPost;
        seo_title: string;
        seo_description: string;
        seo_keyword: string;
        seo_og_image: string;
    };
}

export interface CategoriesResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp?: string;
    data: {
        categories: BlogCategory[];
        total: number;
    };
}

export interface BlogPageMetaResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp?: string;
    data: {
        currentLang?: {
            id: number;
            name: string;
            code: string;
            is_default: number;
            rtl: number;
            created_at: string;
            updated_at: string;
        };
        be?: {
            blog_meta_title: string;
        };
        bs?: {
            blog_section_title: string;
            blog_section_subtitle: string;
        };
    };
}
