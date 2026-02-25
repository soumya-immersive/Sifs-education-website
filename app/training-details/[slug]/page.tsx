import { notFound } from "next/navigation";
import { trainings as staticTrainings, Training } from "../../../data/trainings";
import { API_BASE_URL } from "@/lib/config";

// Importing training-specific detail components
import TrainingHero from "../../../components/training/TrainingHero";
import TrainingSidebar from "../../../components/training/TrainingSidebar";
import TrainingInfo from "../../../components/training/TrainingInfo";
// import TrainingHighlights from "../../../components/training/TrainingHighlights";
import TrainingAccordionBlocks from "../../../components/training/TrainingAccordionBlocks";
import TrainingEnquiriesSection from "../../../components/training/TrainingEnquiriesSection";

interface ApiTrainingDetail {
    id: number;
    title: string;
    sub_title: string;
    slug: string;
    image: string;
    training_code: string | null;
    price_level_1: string;
    price_level_2: string;
    price_level_3: string;
    video_url: string;
    video_id: string;
    duration: string;
    training_outline: string;
    case_studies: string;
    mode_of_study: string;
    created_at: string;
    updated_at: string;
}

async function getApiTrainingDetails(slug: string): Promise<Training | null> {
    const url = `${API_BASE_URL}/EducationAndInternship/Website/training/training-details/${slug}`;

    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return null;
        const json = await res.json();

        if (json.success && json.data?.training) {
            const t: ApiTrainingDetail = json.data.training;
            const instructors = json.data.instructors || [];
            const reviews = json.data.reviews || [];
            const faqs = json.data.faq || [];
            const comments = json.data.comments || [];
            const prospectus = json.data.prospectus || null;

            const baseUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;
            const imageUrl = t.image ? `${baseUrl}/uploads/Education-And-Internship-Admin-Training-Image/${t.image}` : "/training/training.png";

            return {
                id: t.id,
                slug: t.slug,
                programSlug: "training-details",
                trainingCode: t.training_code || `CT-${t.id}`,
                title: t.title,
                overview: t.sub_title || "",
                heroImage: imageUrl,
                rating: 4.8,
                reviewsCount: reviews.length || 150,
                bannerImage: "/training/hero-bg.png",
                highlights: ["24/7 Portal Access", "Live Practical Demonstrations", "Industry Recognized Certificate"],

                price: t.price_level_1,
                priceLevel1: t.price_level_1,
                priceLevel2: t.price_level_2,
                priceLevel3: t.price_level_3,
                video_url: t.video_url,
                video_id: t.video_id,
                instructors: instructors,

                duration: t.duration,
                trainingOutline: t.training_outline,
                caseStudies: t.case_studies,

                reviews: reviews,
                faqs: faqs,
                comments: comments,
                prospectus: prospectus,
                created_at: t.created_at,
                updated_at: t.updated_at
            };
        }
        return null;
    } catch (err) {
        console.error("Error fetching training details:", err);
        return null;
    }
}

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function TrainingDetailsPage({ params }: Props) {
    const { slug } = await params;

    let trainingData: Training | null | undefined;

    /* ---------------- Find Training Data ---------------- */
    // Try API first
    trainingData = await getApiTrainingDetails(slug);

    // Fallback to static if not found in API
    if (!trainingData) {
        trainingData = staticTrainings.find(
            (t) => t.slug === slug
        );
    }

    // If training not found → 404
    if (!trainingData) notFound();

    return (
        <section className="bg-white">
            {/* HERO SECTION */}
            <TrainingHero training={trainingData} />

            <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* MAIN CONTENT */}
                <div className="lg:col-span-2 space-y-6">
                    <TrainingInfo training={trainingData} />
                    {/* <TrainingHighlights training={trainingData} /> */}
                    <TrainingAccordionBlocks training={trainingData} />
                </div>

                {/* SIDEBAR */}
                <div className="lg:-mt-32">
                    <TrainingSidebar training={trainingData} />
                </div>
            </div>

            {/* ENQUIRY / CTA */}
            <TrainingEnquiriesSection />
        </section>
    );
}
