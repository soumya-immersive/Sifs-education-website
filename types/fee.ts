export interface FeeCategory {
    id: number;
    language_id: number;
    name: string;
    slug: string;
    image: string | null;
    short_text: string;
    status: number;
    serial_number: number;
    created_at: string;
    updated_at: string;
    fee_count: number;
}

export interface FeeItem {
    id: number;
    language_id: number;
    fee_category_id: number;
    title: string;
    sub_title: string;
    price: string;
    icon: string;
    redirect_url: string;
    serial_number: number;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface FeeCategoriesResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        feeCategories: FeeCategory[];
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

export interface FeeCategoryDetailResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        feeCategory: FeeCategory;
        fees: FeeItem[];
    };
}
