"use client";

import { useState, useEffect } from "react";
import { useEventsPageData } from "../../../hooks/useEventsPageData";
import { Event } from "../../../types/events-page";
import EventHero from "../../../components/events-inner/EventHero";
import EventContent from "../../../components/events-inner/EventContent";
import EventSchedule from "../../../components/events-inner/EventSchedule";
import EventSidebar from "../../../components/events-inner/EventSidebar";
import EventFaq from "../../../components/events-inner/EventFaq";
import UpcomingEvents from "../../../components/events-inner/UpcomingEvents";
import Participatory from "../../../components/events/Participatory";
import { Loader2, Edit, Save } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";

interface EventDetailClientProps {
    slug: string;
    initialEvent: Event | undefined;
}

export default function EventDetailClient({ slug, initialEvent }: EventDetailClientProps) {
    const { data, updateEvent, updateSection, editMode, setEditMode, saveData } = useEventsPageData();
    const [event, setEvent] = useState<Event | undefined>(initialEvent);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        // Find event in dynamic data
        if (data && data.events) {
            const found = data.events.find((e) => e.slug === slug);
            if (found) {
                setEvent(found);
            }
        }
        setIsLoading(false);
    }, [data, slug, initialEvent]);

    if (isLoading && !event) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    if (!event) return null;

    const handleUpdate = (updates: Partial<Event>) => {
        updateEvent(event.id, updates);
    };

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
                toast.success("✅ Event details saved successfully");
            } else {
                toast.error("❌ Failed to save changes");
            }
            setIsSaving(false);
            setShowConfirmation(false);
        }, 800);
    };

    // Handlers for Participatory Section
    const handleUpdateParticipatory = (newData: any) => {
        updateSection('participatory', newData);
    };

    const handleAddPartner = () => {
        const newPartner = {
            name: "New Partner Organization",
            logo: "/events/participatory1.png",
        };
        updateSection("participatory", {
            partners: [...data.participatory.partners, newPartner],
        });
    };

    const handleDeletePartner = (index: number) => {
        const newPartners = data.participatory.partners.filter((_, i) => i !== index);
        updateSection("participatory", { partners: newPartners });
    };

    return (
        <main className="min-h-screen bg-white mb-24 relative">
            <Toaster position="top-right" />

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleConfirmSave}
                title="Save Changes"
                message="Are you sure you want to save the changes to this event? This action will update the content permanently."
                confirmText="Save Changes"
                cancelText="Cancel"
                type="success"
                isLoading={isSaving}
                requirePassword={true}
                username="admin@sifs.com"
                expectedPassword="admin123"
            />

            {/* Edit Controls */}
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

            <EventHero event={event} editMode={editMode} onUpdate={handleUpdate} />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column - Main Content */}
                    <div className="lg:w-2/3 space-y-12">
                        <EventContent event={event} editMode={editMode} onUpdate={handleUpdate} />
                        <EventSchedule event={event} editMode={editMode} onUpdate={handleUpdate} />
                        <EventFaq event={event} editMode={editMode} onUpdate={handleUpdate} />
                    </div>

                    <div className="lg:w-1/3">
                        <EventSidebar event={event} editMode={editMode} onUpdate={handleUpdate} />
                    </div>

                </div>
            </div>
            {/* Show other events as upcoming */}
            <UpcomingEvents events={data.events.filter(e => e.id !== event.id)} />

            <Participatory
                data={data.participatory}
                editMode={editMode}
                onUpdate={handleUpdateParticipatory}
                onAddPartner={handleAddPartner}
                onDeletePartner={handleDeletePartner}
            />
        </main>
    );
}
