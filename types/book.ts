export interface BookCategory {
    id: number;
    language_id: number;
    name: string;
    slug: string;
    image: string | null;
    short_text: string | null;
    status: number;
    serial_number: number;
    created_at: string;
    updated_at: string;
}

export interface Book {
    id: number;
    language_id: number;
    book_category_id: number;
    book_code: string;
    title: string;
    author: string;
    description: string;
    slug: string;
    image: string;
    home_image: string;
    book_pdf: string | null;
    price: string;
    int_price: string;
    publish_date: string;
    download_count: number | null;
    page_count: number;
    word_count: string | null;
    serial_number: number;
    seo_title: string;
    meta_keywords: string;
    meta_description: string;
    status: number;
    featured: number;
    created_at: string;
    updated_at: string;
    category_name?: string;
    category_slug?: string;
    image_url: string;
    home_image_url: string;
    seo_og_image?: string;
}

export interface BooksResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        sbooks: Book[];
        fbooks: Book[];
        books: Book[];
        categories: BookCategory[];
        cat_name: string;
        sb: string;
        pageSection: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
            links: {
                url: string | null;
                label: string;
                active: boolean;
            }[];
        };
    };
}

export interface BookDetailResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        book: Book;
        pageSection: any;
        seo_title: string;
        seo_description: string;
        seo_keyword: string;
        seo_og_image: string;
        indiaLocation: {
            country: string;
            countryCode: string;
            city: string;
            isIndia: boolean;
        };
    };
}

export interface RegistrationFormResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        book: Book;
        countries: {
            id: number;
            sortname: string;
            name: string;
            phonecode: number;
        }[];
        indiaLocation: {
            country: string;
            countryCode: string;
            city: string;
            isIndia: boolean;
        };
    };
}

export interface RegistrationProcessResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        success_message: string;
        redirect_url: string;
    };
}
