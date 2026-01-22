"use client";

import { useState, useEffect } from "react";
import { Edit, Save, Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import AchievementsHero from "../../components/achievements/AchievementsHero";
import AchievementsIntro from "../../components/achievements/AchievementsIntro";
import ParticipationTimeline from "../../components/achievements/ParticipationTimeline";
import AchievementYearCard from "../../components/achievements/AchievementYearCard";
import OurPresence from "../../components/achievements/OurPresence";
import AcademicCollaborations from "../../components/achievements/AcademicCollaborations";
import ClientsPortfolio from "../../components/achievements/ClientsPortfolio";
import TestimonialsSection from '../../components/common/TestimonialsSection';
import { useAchievementsPageData } from "@/hooks/useAchievementsPageData";
<<<<<<< HEAD:app/achievements/page.tsx
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
=======
import { API_BASE_URL } from "@/lib/config";
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e:app/our-achievements/page.tsx

export default function AchievementsPage() {
    const { data, updateSection, editMode, setEditMode, saveData, isLoaded: hookLoaded } = useAchievementsPageData();
    const [isSaving, setIsSaving] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
<<<<<<< HEAD:app/achievements/page.tsx
    const [showConfirmation, setShowConfirmation] = useState(false);
=======
    const [apiData, setApiData] = useState<any>(null);
    const [apiLoaded, setApiLoaded] = useState(false);
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e:app/our-achievements/page.tsx

    useEffect(() => {
        const fetchAchievementsData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/our-achievements`);
                const json = await response.json();
                if (json.success && json.data) {
                    setApiData(json.data);
                }
            } catch (error) {
                console.error("Failed to fetch achievements data", error);
                toast.error("Failed to lead updated content");
            } finally {
                setApiLoaded(true);
            }
        };
        fetchAchievementsData();
    }, []);

    if (!hookLoaded || !apiLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // Merge API data with local data
    // We prioritize API data for specific fields
    const finalData = {
        ...data,
        hero: {
            ...data.hero,
            // User requested to remove static data image
            image: ""
        },
        intro: {
            ...data.intro,
            heading: apiData?.title || data.intro.heading,
            badgeText: apiData?.subtitle || data.intro.badgeText,
            // Map API featured image to Intro Main Image and remove static fallback
            mainImage: apiData?.featured_image_url || "",
            // If API has body, use it as the single paragraph (HTML supported). 
            // Otherwise fall back to local paragraphs.
            paragraphs: apiData?.body ? [apiData.body] : data.intro.paragraphs,
            // If using API body, likely we don't want the static list appended unless specified. 
            // For now, we'll keep the list from local data.
            list: data.intro.list
        }
    };

    const handleEditClick = () => {
        setIsEditLoading(true);
        setTimeout(() => {
            setEditMode(true);
            setIsEditLoading(false);
        }, 600);
    };

    const handleSaveClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmSave = () => {
        setIsSaving(true);
        // Simulate save
        setTimeout(() => {
            saveData();
            setEditMode(false);
            setIsSaving(false);
            setShowConfirmation(false);
            toast.success("✅ Content saved successfully");
        }, 800);
    };

    return (
        <section className="bg-white relative min-h-screen">
            <Toaster position="top-right" />

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleConfirmSave}
                title="Save Changes"
                message="Are you sure you want to save all the changes made to this page? This action will update the content permanently."
                confirmText="Save Changes"
                cancelText="Cancel"
                type="success"
                isLoading={isSaving}
                requirePassword={true}
                username="admin@sifs.com"
                expectedPassword="admin123"
            />

            {/* Global Edit Control - Fixed at bottom right like About Page */}
            <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
                {!editMode ? (
                    <button
                        onClick={handleEditClick}
                        disabled={isEditLoading}
                        className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium ${isEditLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isEditLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Edit size={18} />
                        )}
                        {isEditLoading ? 'Loading...' : 'Edit Page'}
                    </button>
                ) : (
                    <button
                        onClick={handleSaveClick}
                        disabled={isSaving}
                        className={`flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium animate-in fade-in zoom-in ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Save size={18} />
                        )}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </div>

            <AchievementsHero
                data={finalData.hero}
                editMode={editMode}
                updateData={(d) => updateSection("hero", d)}
            />
            <AchievementsIntro
                data={finalData.intro}
                editMode={editMode}
                updateData={(d) => updateSection("intro", d)}
            />
            <section className="max-w-7xl mx-auto py-20 px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    <ParticipationTimeline
                        data={finalData.participationTimeline}
                        editMode={editMode}
                        updateData={(d) => updateSection("participationTimeline", d)}
                    />
                    <AchievementYearCard
                        data={finalData.achievementYears}
                        editMode={editMode}
                        updateData={(d) => updateSection("achievementYears", d)}
                    />
                </div>
            </section>
            <OurPresence
                data={finalData.presence}
                editMode={editMode}
                updateData={(d) => updateSection("presence", d)}
            />
            <AcademicCollaborations
                data={finalData.universityCollaborations}
                editMode={editMode}
                updateData={(d) => updateSection("universityCollaborations", d)}
            />
            <ClientsPortfolio
                data={finalData.clients}
                editMode={editMode}
                updateData={(d) => updateSection("clients", d)}
            />
            <TestimonialsSection
                data={finalData.testimonials}
                editMode={editMode}
                updateData={(d) => updateSection("testimonials", d)}
            />
        </section>
    );
}
