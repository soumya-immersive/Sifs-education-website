import { notFound } from "next/navigation";
import { API_BASE_URL, BASE_URL } from "@/lib/config";
import EventDetailClient from "./EventDetailClient";

async function getEventData(slug: string) {
  try {
    const apiUrl = `${API_BASE_URL}/EventManagement/Website/events/${slug}`;
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) return null;

    const result = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}

async function getUpcomingEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/EventManagement/Website`, { cache: 'no-store' });
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

  // Fetch both in parallel
  const [data, upcomingEvents] = await Promise.all([
    getEventData(slug),
    getUpcomingEvents()
  ]);

  if (!data || !data.event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <EventDetailClient data={data} />
    </main>
  );
}

