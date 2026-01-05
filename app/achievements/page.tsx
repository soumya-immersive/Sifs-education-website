"use client";

import { useState } from "react";
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
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

export default function AchievementsPage() {
    const { data, updateSection, editMode, setEditMode, saveData, isLoaded } = useAchievementsPageData();
    const [isSaving, setIsSaving] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

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
                data={data.hero}
                editMode={editMode}
                updateData={(d) => updateSection("hero", d)}
            />
            <AchievementsIntro
                data={data.intro}
                editMode={editMode}
                updateData={(d) => updateSection("intro", d)}
            />
            <section className="max-w-7xl mx-auto py-20 px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                    <ParticipationTimeline
                        data={data.participationTimeline}
                        editMode={editMode}
                        updateData={(d) => updateSection("participationTimeline", d)}
                    />
                    <AchievementYearCard
                        data={data.achievementYears}
                        editMode={editMode}
                        updateData={(d) => updateSection("achievementYears", d)}
                    />
                </div>
            </section>
            <OurPresence
                data={data.presence}
                editMode={editMode}
                updateData={(d) => updateSection("presence", d)}
            />
            <AcademicCollaborations
                data={data.universityCollaborations}
                editMode={editMode}
                updateData={(d) => updateSection("universityCollaborations", d)}
            />
            <ClientsPortfolio
                data={data.clients}
                editMode={editMode}
                updateData={(d) => updateSection("clients", d)}
            />
            <TestimonialsSection
                data={data.testimonials}
                editMode={editMode}
                updateData={(d) => updateSection("testimonials", d)}
            />
        </section>
    );
}
