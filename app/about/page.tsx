"use client";

import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Save, Edit } from "lucide-react";
import AboutHero from "../../components/about/AboutHero";
import MissionVision from "../../components/about/MissionVision";
import InitiativesSection from "../../components/about/InitiativesSection";
import ExpertTeam from "../../components/about/ExpertTeam";
import TestimonialsSection from '../../components/common/TestimonialsSection';
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import { useAboutPageData } from "@/hooks/useAboutPageData";

export default function AboutPage() {
  const { data, updateSection, editMode, setEditMode, saveData, isLoaded } = useAboutPageData();

  const [isSaving, setIsSaving] = React.useState(false);
  const [isEditLoading, setIsEditLoading] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditLoading(true);
    // Simulate a small delay for better UX or if actual async work is needed later
    setTimeout(() => {
      setEditMode(true);
      setIsEditLoading(false);
    }, 600);
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    await saveData(); // Ensure saveData is awaited if it returns a promise, or just wait
    // Simulate save delay if saveData is synchronous/fast
    setTimeout(() => {
      setEditMode(false);
      setIsSaving(false);
      setShowConfirmation(false);
      toast.success("✅ Content saved successfully");
    }, 800);
  };

  return (
    <main className="bg-[#F7F9FC] relative min-h-screen">
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
      />

      {/* Global Edit Control */}
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

      <div className={editMode ? "ring-4 ring-blue-500/20" : ""}>
        <AboutHero
          data={data.hero}
          editMode={editMode}
          updateData={(heroData) => updateSection("hero", heroData)}
        />
        <MissionVision
          data={data.mission}
          editMode={editMode}
          updateData={(missionData) => updateSection("mission", missionData)}
        />
        <InitiativesSection
          data={data.initiatives}
          editMode={editMode}
          updateData={(initData) => updateSection("initiatives", initData)}
        />
        <ExpertTeam
          data={data.team}
          editMode={editMode}
          updateData={(teamData) => updateSection("team", teamData)}
        />
        <TestimonialsSection
          data={data.testimonials}
          editMode={editMode}
          updateData={(testData) => updateSection("testimonials", testData)}
        />
      </div>
    </main>
  );
}
