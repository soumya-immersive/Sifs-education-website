import { notFound } from "next/navigation";
import { events } from "../../../data/events";
import EventDetailClient from "./EventDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  // Find event in static data for initial render / server side validation
  // The client component will look it up in dynamic data (localStorage) as well.
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <EventDetailClient slug={slug} initialEvent={event} />
  );
}

export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}