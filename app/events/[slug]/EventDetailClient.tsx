"use client";

import { useState } from "react";
import { Event } from "../../../types/events-page";
import EventHero from "../../../components/events-inner/EventHero";
import EventContent from "../../../components/events-inner/EventContent";
import EventSchedule from "../../../components/events-inner/EventSchedule";
import EventSidebar from "../../../components/events-inner/EventSidebar";
import EventFaq from "../../../components/events-inner/EventFaq";
import UpcomingEvents from "../../../components/events-inner/UpcomingEvents";
import Participatory from "../../../components/events/Participatory";
import { EVENTS_PAGE_INITIAL_DATA } from "../../../lib/data/events-page-data";
import { ParticipatoryData } from "../../../types/events-page";

interface EventDetailClientProps {
    slug: string;
    initialEvent: Event | undefined;
}

export default function EventDetailClient({ slug, initialEvent }: EventDetailClientProps) {
    const [event] = useState<Event | undefined>(initialEvent);

    if (!event) return null;

    // Use global participatory data since it's shared across events usually, 
    // or if it was meant to be event specific, we'd need it in the event object.
    // Based on previous code, it used `data.participatory` from the main events data.
    const participatoryData: ParticipatoryData = EVENTS_PAGE_INITIAL_DATA.participatory;

    // Filter out current event from upcoming
    const upcomingEvents = EVENTS_PAGE_INITIAL_DATA.events.filter(e => e.id !== event.id);

    return (
        <main className="min-h-screen bg-white mb-24 relative">
            <EventHero event={event} />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column - Main Content */}
                    <div className="lg:w-2/3 space-y-12">
                        <EventContent event={event} />
                        <EventSchedule event={event} />
                        <EventFaq event={event} />
                    </div>

                    <div className="lg:w-1/3">
                        <EventSidebar event={event} />
                    </div>

                </div>
            </div>
            {/* Show other events as upcoming */}
            <UpcomingEvents events={upcomingEvents} />

            <Participatory
                data={participatoryData}
            />
        </main>
    );
}
