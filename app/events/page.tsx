"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Edit, Save, Loader2 } from "lucide-react";
import { useEventsPageData } from "../../hooks/useEventsPageData";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

import EventsHero from "../../components/events/EventsHero";
import UpcomingEvents from "../../components/events/UpcomingEvents";
import JourneyStats from "../../components/events/JourneyStats";
import ArchiveProgram from "../../components/events/ArchiveProgram";
import ExpertTeam from "../../components/about/ExpertTeam";
import Participatory from "../../components/events/Participatory";
import ForensicInsightsSection from '../../components/events/ForensicInsightsSection';

export default function EventsPage() {
  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded,
    addEvent,
    updateEvent,
    deleteEvent
  } = useEventsPageData();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditLoading(true);
    setEditMode(true);
    setIsEditLoading(false);
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    const success = await saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Events page updated successfully");
      } else {
        toast.error("❌ Failed to save changes");
      }
      setIsSaving(false);
      setShowConfirmation(false);
    }, 800);
  };

  return (
    <main className="relative">
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

      {/* Admin Controls */}
      <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
        {!editMode ? (
          <button
            onClick={handleEditClick}
            disabled={isEditLoading}
            className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium ${isEditLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isEditLoading ? <Loader2 size={18} className="animate-spin" /> : <Edit size={18} />}
            {isEditLoading ? 'Loading...' : 'Edit Page'}
          </button>
        ) : (
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className={`flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium animate-in fade-in zoom-in ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <EventsHero
        data={data.hero}
        editMode={editMode}
        onUpdate={(updates) => updateSection("hero", updates)}
      />

      <UpcomingEvents
        events={data.events}
        editMode={editMode}
        onUpdateEvent={updateEvent}
        onAddEvent={addEvent}
        onDeleteEvent={deleteEvent}
        showAllButtonLabel={data.showAllButtonLabel}
        onUpdateButtonLabel={(label) => updateSection("showAllButtonLabel", label)}
      />

      <JourneyStats
        data={data.stats}
        editMode={editMode}
        onUpdate={(updates) => updateSection("stats", updates)}
      />

      <ArchiveProgram
        data={data.archive}
        editMode={editMode}
        onUpdate={(updates) => updateSection("archive", updates)}
      />

      <ExpertTeam
        data={data.team}
        editMode={editMode}
        updateData={(teamData) => updateSection("team", teamData)}
      />

      <Participatory
        data={data.participatory}
        editMode={editMode}
        onUpdate={(updates: Partial<typeof data.participatory>) => updateSection("participatory", updates)}
        onAddPartner={() => {
          const newPartner = {
            name: "New Partner Organization",
            logo: "/events/participatory1.png"
          };
          updateSection("participatory", { partners: [...data.participatory.partners, newPartner] });
        }}
        onDeletePartner={(index: number) => {
          const newPartners = data.participatory.partners.filter((_, i) => i !== index);
          updateSection("participatory", { partners: newPartners });
        }}
      />

      <ForensicInsightsSection
        data={data.insights}
        editMode={editMode}
        onUpdate={(updates) => updateSection("insights", updates)}
      />
    </main>
  );
}
