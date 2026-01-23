import { notFound } from "next/navigation";
import EventHero from "../../../components/events-inner/EventHero";
import EventContent from "../../../components/events-inner/EventContent";
import EventSchedule from "../../../components/events-inner/EventSchedule";
import EventSidebar from "../../../components/events-inner/EventSidebar";
import EventFaq from "../../../components/events-inner/EventFaq";
import UpcomingEvents from "../../../components/events-inner/UpcomingEvents";
import Participatory from "../../../components/events-inner/Participatory";

// Fetch event details function - tries both new and old APIs
async function getEventDetails(slug: string) {
  try {
    // Try new conference/event-details API first
    const newApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/EducationAndInternship/Website/event/event-details/${slug}`;

    try {
      const newResponse = await fetch(newApiUrl, { cache: 'no-store' });
      if (newResponse.ok) {
        const result = await newResponse.json();
        if (result.success && result.data?.event) {
          const item = result.data.event;
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:3000';

          return {
            id: item.id,
            title: item.title.replace(/^"|"$/g, ''),
            slug: item.slug,
            description: item.event_outline || item.sub_title || "",
            image: item.image_url || "",
            category: "Forensic Science",
            date: item.formatted_date || "Date TBA",
            startDate: item.event_date,
            endDate: item.event_date,
            mode: item.mode_of_study || "Online",
            location: item.mode_of_study || "Online",
            price: item.int_price_level_1 && item.int_price_level_1 !== "00"
              ? item.int_price_level_1
              : item.price_level_1 && item.price_level_1 !== "00"
                ? item.price_level_1
                : "Free",
            schedule: [],
            faqs: [],
            banner_title: item.title,
            banner_subtitle: item.sub_title,
            video_url: item.video_url,
            video_id: item.video_id,
            case_studies: item.case_studies,
            call_for_assistance: item.call_for_assistance,
          };
        }
      }
    } catch (newApiError) {
      console.log("New API failed, trying old API...");
    }

    // Fallback to old EventManagement API
    const oldApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/EventManagement/Website/events/${slug}`;
    const response = await fetch(oldApiUrl, { cache: 'no-store' });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (result.success && result.data && result.data.event) {
      const item = result.data.event;
      const clean = (str: any) => (str ? str.toString().replace(/^"|"$/g, '') : "");

      // Handle Image
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:3000';
      let imageUrl = item.image || item.banner_image || "";
      if (!imageUrl && result.data.gallery_images && result.data.gallery_images.length > 0) {
        imageUrl = result.data.gallery_images[0].image_url || `${baseUrl}/uploads/events/${result.data.gallery_images[0].image}`;
      }
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `${baseUrl}/uploads/events/${imageUrl}`;
      }

      // Date Formatting helper
      const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      };

      let formattedDate = item.formatted_start_date;

      const startDateVal = item.start_date ? new Date(item.start_date) : null;
      const endDateVal = item.end_date ? new Date(item.end_date) : null;

      if (startDateVal && !isNaN(startDateVal.getTime())) {
        if (endDateVal && !isNaN(endDateVal.getTime()) && startDateVal.getTime() !== endDateVal.getTime()) {
          if (startDateVal.getMonth() === endDateVal.getMonth() && startDateVal.getFullYear() === endDateVal.getFullYear()) {
            formattedDate = `${startDateVal.getDate().toString().padStart(2, '0')} - ${formatDate(item.end_date)}`;
          } else {
            formattedDate = `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`;
          }
        } else {
          formattedDate = formatDate(item.start_date);
        }
      } else if (!formattedDate) {
        formattedDate = "Date TBA";
      }

      const schedule: any[] = result.data.schedule || [];
      const faqs: any[] = result.data.faqs || [];

      return {
        id: item.id,
        title: clean(item.title),
        slug: item.slug,
        description: clean(item.description) || clean(item.event_outline) || "",
        image: imageUrl,
        category: clean(item.category_name) || "Forensic Science",
        date: formattedDate,
        startDate: item.start_date,
        endDate: item.end_date,
        mode: clean(item.mode_of_study) || "Online",
        location: clean(item.location) || "Online",
        price: clean(item.price) || clean(item.int_price_level_1) || "Free",
        schedule: schedule,
        faqs: faqs,
        banner_title: item.banner_title,
        banner_subtitle: item.banner_subtitle,
        video_url: item.video_url,
        video_id: item.video_id,
        case_studies: item.case_studies,
        call_for_assistance: item.call_for_assistance,
      };
    }
    return null;

  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
}

// Fetch upcoming events
async function getUpcomingEvents() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
    const response = await fetch(`${apiUrl}/EventManagement/Website`, {
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const result = await response.json();
    return result.success && result.data ? result.data.upcomingEvents : [];
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  // Parallel data fetching
  const [event, upcomingEvents] = await Promise.all([
    getEventDetails(slug),
    getUpcomingEvents()
  ]);

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
      <UpcomingEvents events={upcomingEvents || []} />
      <Participatory />
    </main>
  );
}