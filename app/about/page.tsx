"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Save, Edit } from "lucide-react";

import AboutHero from "../../components/about/AboutHero";
import MissionVision from "../../components/about/MissionVision";
import InitiativesSection from "../../components/about/InitiativesSection";
import ExpertTeam from "../../components/about/ExpertTeam";
import TestimonialsSection from '../../components/common/TestimonialsSection';
<<<<<<< HEAD
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
=======

import { API_BASE_URL } from "@/lib/config";
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
import { useAboutPageData } from "@/hooks/useAboutPageData";

export default function AboutPage() {
  const { data, updateSection, editMode, setEditMode, saveData, isLoaded: hookLoaded } = useAboutPageData();
  const [apiData, setApiData] = useState<any>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

<<<<<<< HEAD
  const [isSaving, setIsSaving] = React.useState(false);
  const [isEditLoading, setIsEditLoading] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
=======
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/about`);
        const json = await response.json();
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

        if (json.success && json.data) {
          setApiData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch about page data:", error);
        toast.error("Failed to load page updated content");
      } finally {
        setIsApiLoaded(true);
      }
    };

    fetchAboutData();
  }, []);

  if (!hookLoaded || !isApiLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Merge API data with local data
  const finalData = {
    ...data,
    hero: {
      ...data.hero,
      heading: apiData?.title || data.hero.heading,
      subtitle: apiData?.subtitle || data.hero.subtitle,
      image: apiData?.featured_image_url || data.hero.image,
      h2: apiData?.name || data.hero.h2,
      // If API has body, use it. Pass as single array item for existing component structure.
      paragraphs: apiData?.body ? [apiData.body] : data.hero.paragraphs,
    }
  };

<<<<<<< HEAD
  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
=======
  const handleSave = () => {
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
    setIsSaving(true);
    setTimeout(() => {
      saveData();
      setEditMode(false);
      setIsSaving(false);
<<<<<<< HEAD
      setShowConfirmation(false);
      toast.success("✅ Content saved successfully");
=======
      toast.success("Content saved locally");
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
    }, 800);
  };

  return (
    <main className="bg-[#F7F9FC] relative min-h-screen">
      <Toaster position="top-right" />

<<<<<<< HEAD
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

      {/* Global Edit Control */}
=======
      {/* Edit Controls */}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
      <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium"
          >
            <Edit size={18} /> Edit Page
          </button>
        ) : (
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      <div className="">
        <AboutHero
          data={finalData.hero}
          editMode={editMode}
          updateData={(d) => updateSection("hero", d)}
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
