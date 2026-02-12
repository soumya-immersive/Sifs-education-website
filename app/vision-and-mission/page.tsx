"use client";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import AboutHero from "../../components/about/AboutHero";
import MissionVision from "../../components/about/MissionVision";
import { API_BASE_URL } from "@/lib/config";
import { AboutHeroData, MissionData } from "@/types/about-page";

export default function VisionMissionPage() {
    const [heroData, setHeroData] = useState<AboutHeroData | null>(null);
    // Initialize with static default data for the UI
    const [missionData, setMissionData] = useState<MissionData>({
        mainImage: "/about-us/mission-bg.png",
        cards: [
            {
                icon: "/about-us/mission.png",
                title: "Our Mission",
                description: "Our mission is to empower individuals with the essential forensic expertise to promote justice on a global scale."
            },
            {
                icon: "/about-us/vision.png",
                title: "Our Vision",
                description: "We visualize a society where forensic science plays a fundamental role in promoting justice, truth, security, and the well-being of communities."
            },
            {
                icon: "/about-us/purpose.png",
                title: "Our Purpose",
                description: "Our purpose is to excel in promoting knowledge, revealing the truth, and training forensic professionals across borders."
            }
        ]
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVisionData = async () => {
            try {
                // Ensure correct slug casing
                const url = `${API_BASE_URL}/EducationAndInternship/Website/page/vision-and-mission`;
                console.log("Fetching Vision URL:", url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                console.log("Vision API Response:", json);

                if (json.success && json.data) {
                    const apiData = json.data;

                    // Map API data to AboutHeroData structure
                    // Reusing AboutHero component as requested since the structure is similar (title, image, body content)
                    const mappedData: AboutHeroData = {
                        heading: apiData.title || "Mission & Vision",
                        subtitle: apiData.subtitle || "",
                        image: apiData.featured_image_url || "",
                        tag: "Mission & Vision",
                        badgeNumber: "", // Not applicable for this page, can be hidden via CSS or empty
                        badgeText: "",
                        h2: apiData.name || "Mission & Vision",
                        // The body is HTML, pass it as a single paragraph for the editor/viewer to render
                        paragraphs: apiData.body ? [apiData.body] : [],
                    };

                    setHeroData(mappedData);
                } else {
                    setError(json.message || "API returned unsuccessfully");
                }
            } catch (error: any) {
                console.error("Failed to fetch vision page data:", error);
                setError(error.message || "An unexpected error occurred");
                toast.error("Failed to load page content");
            } finally {
                setIsLoaded(true);
            }
        };

        fetchVisionData();
    }, []);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // Fallback if data failed to load
    if (error || !heroData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-[#F7F9FC]">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md w-full">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Unable to Load Content</h2>
                    <p className="text-gray-600 mb-6">{error || "No data available."}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#F7F9FC] relative min-h-screen pb-10">
            <Toaster position="top-right" />
            <div className="">
                <AboutHero
                    data={heroData}
                    editMode={false}
                    updateData={() => { }} // Read-only
                />
                {/* <MissionVision
                    data={missionData}
                    editMode={false} // Currently read-only as verified API data doesn't support card structure yet
                    updateData={(newData) => setMissionData(newData)}
                /> */}
            </div>
        </main>
    );
}
