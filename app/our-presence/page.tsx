"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import AboutHero from "../../components/about/AboutHero";
import { API_BASE_URL } from "@/lib/config";
import { AboutHeroData } from "@/types/about-page";

export default function OurPresencePage() {
    const [heroData, setHeroData] = useState<AboutHeroData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchPresenceData = async () => {
            try {
                // Fetching from: /EducationAndInternship/Website/page/our-presence
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/our-presence`);
                const json = await response.json();

                if (json.success && json.data) {
                    const apiData = json.data;

                    // Map API data to AboutHeroData structure
                    // The "Our Presence" page has title, subtitle, featured_image, and HTML body (with tables).
                    // We reuse AboutHero which can render HTML content in its main area.

                    const mappedData: AboutHeroData = {
                        heading: apiData.title || "Our Presence",
                        subtitle: apiData.subtitle || "Global Outreach",
                        image: apiData.featured_image_url || "",
                        // The tag could be the name or a static string
                        tag: "Our Presence",
                        badgeNumber: "", // Hide badge
                        badgeText: "",
                        h2: apiData.name || "Our Presence",
                        // Pass body as a single element in paragraphs array, 
                        // AboutHero handles rendering it (via EditableText usually, which handles HTML)
                        paragraphs: apiData.body ? [apiData.body] : [],
                    };

                    setHeroData(mappedData);
                }
            } catch (error) {
                console.error("Failed to fetch Our Presence data:", error);
                toast.error("Failed to load page content");
            } finally {
                setIsLoaded(true);
            }
        };

        fetchPresenceData();
    }, []);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!heroData) {
        return <div className="p-10 text-center">Failed to load content.</div>;
    }

    return (
        <main className="bg-[#F7F9FC] relative min-h-screen">
            <Toaster position="top-right" />

            {/* 
              Reuse AboutHero for consistency. 
              We might need to ensure the HTML tables in 'body' are styled correctly.
              AboutHero uses EditableText which uses dangerouslySetInnerHTML, usually fine.
              However, global CSS might be needed for table borders if not present.
            */}
            <AboutHero
                data={heroData}
                editMode={false}
                updateData={() => { }} // Read-only
            />
        </main>
    );
}
