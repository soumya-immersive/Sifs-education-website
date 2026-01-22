export interface Slider {
    id: number;
    language_id: number;
    title: string;
    text: string;
    button_text: string;
    button_url: string;
    button_text_two: string;
    button_url_two: string;
    image: string;
    image_url?: string;
    serial_number: number;
    created_at: string;
    updated_at: string;
}

export interface SliderResponse {
    sliders: Slider[];
}
