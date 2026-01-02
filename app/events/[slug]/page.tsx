import { notFound } from "next/navigation";
import EventHero from "../../../components/events-inner/EventHero";
import EventContent from "../../../components/events-inner/EventContent";
import EventSchedule from "../../../components/events-inner/EventSchedule";
import EventSidebar from "../../../components/events-inner/EventSidebar";
import EventFaq from "../../../components/events-inner/EventFaq";
import UpcomingEvents from "../../../components/events-inner/UpcomingEvents";
import Participatory from "../../../components/events-inner/Participatory";

// 1. Import both the data AND the Type
import { events, Event } from "../../../data/events";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  // 2. Await params (Required in Next.js 15)
  const { slug } = await params;
  
  // 3. Find the event
  const event = events.find((e) => e.slug === slug);
  
  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white mb-24">
      {/* These will stop throwing errors once their internal files define the 'event' prop */}
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
      <UpcomingEvents />
      <Participatory />
    </main>
  );
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}