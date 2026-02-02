import { useState, useEffect } from 'react';
import { API_BASE_URL, BASE_URL } from '@/lib/config';

export interface SlideData {
    bg: string;
    title: string;
    text: string;
    button_text: string;
    button_url: string;
    video_link?: string;
}

export const useIntroSectionData = () => {
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [fullResponse, setFullResponse] = useState<any>(null); // To store the complete API response
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIntroData = async () => {
            try {
                setLoading(true);
                const apiUrl = `${API_BASE_URL}/EducationAndInternship/Website/front`;
                console.log('Fetching from:', apiUrl);

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Full API Response:', result); // Log the full response for the user
                setFullResponse(result); // Save the entire response

                // Find the data container (bs) wherever it might be
                let bsData = null;
                if (result?.data?.bs) {
                    bsData = result.data.bs;
                } else if (result?.bs) {
                    bsData = result.bs;
                } else if (result?.data) {
                    bsData = result.data;
                }

                if (bsData) {
                    const parsedSlides: SlideData[] = [];

                    // Slide 1: Intro Section
                    if (bsData.intro_section_title) {
                        parsedSlides.push({
                            bg: bsData.intro_bg
                                ? `${BASE_URL}/uploads/Education-And-Internship-Admin-IntroSection/${bsData.intro_bg}`
                                : '',
                            title: bsData.intro_section_title,
                            text: bsData.intro_section_text || '',
                            button_text: bsData.intro_section_button_text || 'Explore',
                            button_url: bsData.intro_section_button_url || '#',
                            video_link: bsData.intro_section_video_link || '',
                        });
                    }

                    // Slide 2: Education Section
                    if (bsData.education_section_title) {
                        parsedSlides.push({
                            bg: bsData.education_bg
                                ? `${BASE_URL}/uploads/Education-And-Internship-Admin-EducationSection/${bsData.education_bg}`
                                : '',
                            title: bsData.education_section_title,
                            text: bsData.education_section_text || '',
                            button_text: bsData.education_section_button_text || 'Explore',
                            button_url: bsData.education_section_button_url || '#',
                        });
                    }

                    // Slide 3: Education2/Announcement Section
                    if (bsData.education2_section_title) {
                        parsedSlides.push({
                            bg: bsData.education2_bg
                                ? `${BASE_URL}/uploads/Education-And-Internship-Admin-AnnouncementSection/${bsData.education2_bg}`
                                : '',
                            title: bsData.education2_section_title,
                            text: bsData.education2_section_subtitle || '',
                            button_text: bsData.education2_section_button_text || 'Explore',
                            button_url: bsData.education2_section_button_url || '#',
                        });
                    }

                    setSlides(parsedSlides);
                } else {
                    console.error('Data structure received:', result);
                    throw new Error('Could not find intro section data in the API response');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch intro section data');
                console.error('Error fetching intro section data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchIntroData();
    }, []);

    return { slides, fullResponse, loading, error };
};
