import { useState, useEffect, useCallback } from 'react';
import { FeeCategory, FeeItem, FeeCategoriesResponse, FeeCategoryDetailResponse, HomepageResponse } from '@/types/fee';
import { API_BASE_URL } from '@/lib/config';

export const useFeeCategoriesData = () => {
    const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
    const [selectedCategoryFees, setSelectedCategoryFees] = useState<FeeItem[]>([]);
    const [sectionTitle, setSectionTitle] = useState('');
    const [sectionSubtitle, setSectionSubtitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [feesLoading, setFeesLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all fee categories
    useEffect(() => {
        const fetchFeeCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/fee-categories`);

                if (!response.ok) {
                    throw new Error('Failed to fetch fee categories');
                }

                const data: FeeCategoriesResponse = await response.json();

                if (data.success && data.data?.feeCategories) {
                    // Sort by serial_number to maintain order
                    const sortedCategories = data.data.feeCategories
                        .filter((cat) => cat.status === 1)
                        .sort((a, b) => a.serial_number - b.serial_number);
                    setFeeCategories(sortedCategories);
                } else {
                    setFeeCategories([]);
                }

                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching fee categories:', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchHomepageData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
                if (response.ok) {
                    const data: HomepageResponse = await response.json();
                    if (data.success && data.data?.be) {
                        setSectionTitle(data.data.be.pricing_section_title);
                        setSectionSubtitle(data.data.be.pricing_section_subtitle);
                    }
                }
            } catch (err) {
                console.error('Error fetching homepage data:', err);
            }
        };

        fetchFeeCategories();
        fetchHomepageData();
    }, []);

    // Fetch fees for a specific category by slug
    const fetchCategoryFees = useCallback(async (slug: string) => {
        if (!slug) return;

        try {
            setFeesLoading(true);
            const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/fee-category/${slug}`);

            if (!response.ok) {
                throw new Error('Failed to fetch category fees');
            }

            const data: FeeCategoryDetailResponse = await response.json();

            if (data.success && data.data?.fees) {
                // Sort by serial_number to maintain order
                const sortedFees = data.data.fees
                    .filter((fee) => fee.status === 1)
                    .sort((a, b) => a.serial_number - b.serial_number);
                setSelectedCategoryFees(sortedFees);
            } else {
                setSelectedCategoryFees([]);
            }
        } catch (err) {
            console.error('Error fetching category fees:', err);
            setSelectedCategoryFees([]);
        } finally {
            setFeesLoading(false);
        }
    }, []);

    return {
        feeCategories,
        selectedCategoryFees,
        loading,
        feesLoading,
        error,
        fetchCategoryFees,
        sectionTitle,
        sectionSubtitle
    };
};
