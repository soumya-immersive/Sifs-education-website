export interface QuizEvent {
    id: number;
    language_id: number;
    title: string;
    slug: string;
    banner_title: string;
    banner_subtitle: string;
    certificate_series: string;
    download_certificate: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    formatted_start_date: string;
}

export interface Quiz {
    id: number;
    language_id: number;
    event_id: number;
    title: string;
    description: string;
    status: number;
    serial_number: number;
    created_at: string;
    updated_at: string;
    event: QuizEvent;
}

export interface QuizApiResponse {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
    data: {
        currentLang: {
            id: number;
            name: string;
            code: string;
            is_default: number;
            rtl: number;
            created_at: string;
            updated_at: string;
        };
        language_id: number;
        selected_year: number;
        timestamp: string;
        activeQuiz: Quiz | null;
        pastQuizzes: Quiz[];
        availableYears: number[];
        meta: {
            generated_at: string;
            language: string;
            total_records: {
                active_quiz: number;
                past_quizzes: number;
                available_years: number;
            };
        };
    };
}

export interface QuizFormData {
    name: string;
    email: string;
    organisation_name: string;
    mobile: string;
    quiz: number;
    event_id: number;
}
