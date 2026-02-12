export interface QuizEvent {
    id: number;
    language_id: number;
    title: string;
    name: string;
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
    language_id?: number;
    event_id?: number;
    name: string;
    title: string;
    description: string;
    status: number;
    serial_number?: number;
    total_questions?: number;
    start_date?: string;
    end_date?: string;
    created_at?: string;
    updated_at?: string;
    event?: QuizEvent;
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

export interface QuizRegistrationResponse {
    success: boolean;
    message: string;
    data: {
        applicant_id: number;
        redirect_url: string;
        session_data: any;
        instructions: string;
    };
}

export interface QuizOption {
    id: string;
    text: string;
}

export interface QuizQuestion {
    id: number;
    quiz_id: number;
    question: string;
    options: QuizOption[];
    serial_number: number;
    status: number;
    answer: string;
    correct_option: QuizOption;
}

export interface QuizQuestionsResponse {
    success: boolean;
    message: string;
    data: {
        quiz: Quiz;
        questions: QuizQuestion[];
        statistics?: any;
        settings?: {
            show_answers: boolean;
            passing_percentage: number;
        };
    };
}

export interface QuizSubmissionData {
    applicant_id: number;
    answers: {
        [key: string]: string;
    };
}

export interface QuizResult {
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    passed: boolean;
    results: Array<{
        question_id: number;
        question: string;
        correct_answer: string;
        user_answer?: string;
        is_correct: boolean;
    }>;
}

export interface QuizSubmissionResponse {
    success: boolean;
    message: string;
    data: {
        results: QuizResult;
        applicant: {
            id: number;
            name: string;
            email: string;
            mobile: string;
            organisation: string;
            certificate_number: string;
            quiz_title: string;
            percentage: number;
            passed: boolean;
            [key: string]: any;
        };
        certificate: string | null;
        passed: boolean;
        message: string;
    };
}

export interface QuizVerificationResponse {
    success: boolean;
    message: string;
    data: any;
}
