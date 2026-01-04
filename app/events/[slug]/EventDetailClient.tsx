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
import { Loader2 } from "lucide-react";

interface EventDetailClientProps {
    slug: string;
    initialEvent: Event | undefined;
}

export default function EventDetailClient({ slug, initialEvent }: EventDetailClientProps) {
    const { data, updateEvent, updateSection, editMode } = useEventsPageData();
    const [event, setEvent] = useState<Event | undefined>(initialEvent);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Find event in dynamic data
        if (data && data.events) {
            const found = data.events.find((e) => e.slug === slug);
            if (found) {
                setEvent(found);
            } else if (!initialEvent) {
                // If not found in dynamic data and no initial event
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
        <main className="min-h-screen bg-white mb-24">
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
