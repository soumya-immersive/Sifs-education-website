export interface Testimonial {
    id: number;
    language_id: number;
    image: string;
    comment: string;
    name: string;
    rank: string;
    serial_number: number;
    language_code: string;
    language_name: string;
    image_url: string;
}

export interface Pagination {
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

export interface TestimonialsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: {
        data: Testimonial[];
        pagination: Pagination;
        languages: any[];
        currentLanguage: string;
        currentLanguageId: number;
    };
}

export interface SingleTestimonialResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Testimonial;
}
