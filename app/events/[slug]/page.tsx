import { notFound } from "next/navigation";
import EventHero from "../../../components/events-inner/EventHero";
import EventContent from "../../../components/events-inner/EventContent";
import EventSchedule from "../../../components/events-inner/EventSchedule";
import EventSidebar from "../../../components/events-inner/EventSidebar";
import EventFaq from "../../../components/events-inner/EventFaq";
import UpcomingEvents from "../../../components/events-inner/UpcomingEvents";
import Participatory from "../../../components/events-inner/Participatory";

// Fetch event details function
async function getEventDetails(slug: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/EducationAndInternship/Website/event/event-details/${slug}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (result.success && result.data && result.data.event) {
      // Correct path to event object: result.data.event
      // Based on user provided JSON: result.data.event contains fields.
      const item = result.data.event;
      const clean = (str: any) => (str ? str.toString().replace(/^"|"$/g, '') : "");

      let imageUrl = item.image_url || ""; // API provides image_url directly
      if (!imageUrl && item.image) {
        imageUrl = `http://localhost:3000/uploads/events/${item.image}`;
        // Note: Use 'uploads/events/' if API doesn't give full URL, but here image_url is provided.
      }

      // Use formatted_date from API if available, else date
      const formattedDate = item.formatted_date || (item.event_date ? new Date(item.event_date).toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric"
      }) : "Date TBA");

      // Extract schedules and FAQs if they exist in result.data or item
      // The JSON provided shows schedule/faqs are NOT in `event` object.
      // But user provided JSON sample doesn't show `pageSection` content either.
      // Assuming they might be separate or missing.
      // If missing, we default to empty.

      // Check `pageSection` or other fields if arrays are there.
      // User JSON has "pageSection": {}.
      // If API returns schedule, it might be in `pageSection` or root of `data`.
      // We will default to empty for now if not found.

      const schedule: any[] = []; // Placeholder if not in JSON provided
      const faqs: any[] = [];    // Placeholder

      return {
        id: item.id,
        title: clean(item.title),
        slug: item.slug,
        description: clean(item.event_outline) || clean(item.description) || "",
        image: imageUrl,
        category: clean(item.category_name) || "Forensic Science",
        date: formattedDate,
        startDate: item.event_date,
        mode: clean(item.mode_of_study) || "Online",
        location: clean(item.location) || "Online",
        price: clean(item.int_price_level_1) || clean(item.price_level_1),
        schedule: schedule,
        faqs: faqs
      };
    }
    return null;

  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  const event = await getEventDetails(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white mb-24">
      <EventHero event={event as any} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column - Main Content */}
          <div className="lg:w-2/3 space-y-12">
            <EventContent event={event as any} />
            <EventSchedule event={event as any} />
            <EventFaq event={event as any} />
          </div>

          <div className="lg:w-1/3">
            <EventSidebar event={event as any} />
          </div>

        </div>
      </div>
      <UpcomingEvents />
      <Participatory />
    </main>
  );
}