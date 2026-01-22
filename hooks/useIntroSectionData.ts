import { useState, useEffect } from 'react';

interface IntroSectionData {
    intro_bg: string;
    intro_section_title: string;
    intro_section_text: string;
    intro_section_button_text: string;
    intro_section_button_url: string;
    intro_section_video_link: string;
}

export const useIntroSectionData = () => {
    const [data, setData] = useState<IntroSectionData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIntroData = async () => {
            try {
                setLoading(true);
                const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'}/EducationAndInternship/Website/front`;
                console.log('Fetching from:', apiUrl);

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('API Response:', result);
                console.log('API Response keys:', Object.keys(result || {}));

                if (result.data) {
                    console.log('result.data keys:', Object.keys(result.data || {}));
                }

                // Try different possible data structures
                let bsData = null;

                // Check: result.data.bs
                if (result?.data?.bs) {
                    bsData = result.data.bs;
                }
                // Check: result.bs
                else if (result?.bs) {
                    bsData = result.bs;
                }
                // Check: result.data.be (another possible structure)
                else if (result?.data?.be) {
                    bsData = result.data.be;
                }
                // Check: result.data directly (the data object itself might have the properties)
                else if (result?.data?.intro_section_title) {
                    bsData = result.data;
                }
                // Check: result directly has the properties
                else if (result?.intro_section_title) {
                    bsData = result;
                }

                if (bsData) {
                    const introData: IntroSectionData = {
                        intro_bg: bsData.intro_bg || '',
                        intro_section_title: bsData.intro_section_title || 'Forensic Science Institute',
                        intro_section_text: bsData.intro_section_text || '',
                        intro_section_button_text: bsData.intro_section_button_text || 'Explore',
                        intro_section_button_url: bsData.intro_section_button_url || '/about',
                        intro_section_video_link: bsData.intro_section_video_link || '',
                    };
                    console.log('Parsed intro data:', introData);
                    setData(introData);
                } else {
                    console.error('Data structure received:', result);
                    console.error('Could not find intro section data in any expected location');
                    throw new Error(`Invalid data structure. Expected "bs" property but got: ${JSON.stringify(Object.keys(result || {}))}`);
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

    return { data, loading, error };
};
