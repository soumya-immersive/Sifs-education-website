import { notFound } from "next/navigation";
import { Metadata } from "next";
import ConferenceDetailClient from "./ConferenceDetailClient";

interface EventData {
    id: number;
    title: string;
    sub_title: string;
    slug: string;
    mode_of_study: string;
    video_url: string;
    video_id: string;
    image_url: string;
    price_level_1: string;
    int_price_level_1: string;
    call_for_assistance: string;
    duration: string;
    level: string | null;
    event_outline: string;
    case_studies: string;
    event_date: string;
    formatted_date: string;
    event_category_id: number;
}

interface ApiResponse {
    success: boolean;
    data: {
        event: EventData;
        seo: {
            title: string;
            description: string;
            keywords: string;
            og_image: string;
        };
    };
}

// Fetch conference event details
async function getConferenceDetails(slug: string): Promise<EventData | null> {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/EducationAndInternship/Website/event/event-details/${slug}`;
        const response = await fetch(apiUrl, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`API request failed: ${response.status}`);
            return null;
        }

        const result: ApiResponse = await response.json();

        if (result.success && result.data?.event) {
            return result.data.event;
        }
        return null;

    } catch (error) {
        console.error("Error fetching conference details:", error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api"}/EducationAndInternship/Website/event/event-details/${slug}`;
        const response = await fetch(apiUrl, { cache: 'no-store' });
        const result: ApiResponse = await response.json();

        if (result.success && result.data?.seo) {
            const seo = result.data.seo;
            return {
                title: seo.title,
                description: seo.description,
                keywords: seo.keywords,
                openGraph: {
                    title: seo.title,
                    description: seo.description,
                    images: [seo.og_image],
                },
            };
        }
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    return {
        title: "Conference Details",
        description: "Forensic Science Conference",
    };
}

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ConferenceDetailPage({ params }: Props) {
    const { slug } = await params;
    const event = await getConferenceDetails(slug);

    if (!event) {
        notFound();
    }

    return <ConferenceDetailClient event={event} />;
}
