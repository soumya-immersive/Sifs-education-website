import { useState, useEffect } from 'react';
import { Slider } from '@/types/slider';
import { API_BASE_URL } from '@/lib/config';

export const useSliderData = () => {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                setLoading(true);
                const apiUrl = `${API_BASE_URL}/EducationAndInternship/Website/front`;
                console.log('🚀 Fetching from:', apiUrl);

                const response = await fetch(apiUrl, { cache: 'no-store' });
                console.log('📡 Response status:', response.status, response.statusText);

                if (!response.ok) {
                    throw new Error('Failed to fetch sliders');
                }

                const data = await response.json();
                console.log('📦 Raw API Response:', data);
                console.log('📋 Sliders array:', data.sliders);
                console.log('📋 Data.data?.sliders:', data.data?.sliders);

                // Check if sliders are nested in data.data
                const slidersArray = data.sliders || data.data?.sliders || [];
                console.log('✅ Using sliders:', slidersArray);

                // Sort by serial_number to maintain order
                const sortedSliders = slidersArray.sort(
                    (a: Slider, b: Slider) => a.serial_number - b.serial_number
                );

                console.log('🎯 Final sorted sliders:', sortedSliders);
                setSliders(sortedSliders);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('❌ Error fetching sliders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSliders();
    }, []);

    return { sliders, loading, error };
};
