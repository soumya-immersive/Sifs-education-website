import { useState, useEffect } from 'react';
import { QuizApiResponse } from '@/types/quiz';
import { API_BASE_URL } from '@/lib/config';

export function useQuizData(year?: number) {
    const [data, setData] = useState<QuizApiResponse['data'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = year
                    ? `${API_BASE_URL}/EventManagement/Website/upcoming-quizzes?year=${year}`
                    : `${API_BASE_URL}/EventManagement/Website/upcoming-quizzes`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
                }

                const result: QuizApiResponse = await response.json();

                if (result.success) {
                    setData(result.data);
                } else {
                    throw new Error(result.message || 'Failed to fetch quiz data');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching quiz data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [year]);

    return { data, loading, error };
}
