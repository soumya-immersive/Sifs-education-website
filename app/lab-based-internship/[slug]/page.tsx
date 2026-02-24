import { notFound } from "next/navigation";
import InternshipHero from "../../../components/internship/InternshipHero";
import InternshipSidebar from "../../../components/internship/InternshipSidebar";
import InternshipInfo from "../../../components/internship/InternshipInfo";
import InternshipHighlights from "../../../components/internship/InternshipHighlights";
import InternshipAccordionBlocks from "../../../components/internship/InternshipAccordionBlocks";
import InternshipPaymentDetails from "../../../components/internship/InternshipPaymentDetails";
import InternshipEnquiriesSection from "../../../components/internship/InternshipEnquiriesSection";

async function getInternshipDetails(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/training/training-details/${slug}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        const json = await res.json();
        return json.success && json.data ? json.data : null;
    } catch (error) {
        console.error("Error fetching internship details:", error);
        return null;
    }
}

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const apiData = await getInternshipDetails(slug);

    if (!apiData) {
        notFound();
    }

    // The API structure is { success: true, data: { training: { ... }, ... } }
    // So apiData here is the { training: ..., ... } object
    const training = apiData.training || {};

    const internshipData: any = {
        id: training.id,
        programSlug: "lab-based-internship", // Matches the check in InternshipCard
        slug: training.slug,
        title: training.title,
        overview: training.sub_title || training.training_outline,
        internshipCode: training.training_code || "LBI-001",
        heroImage: training.image_url || "/internships/internship.png",

        // Additional fields mapped from API
        description: training.training_outline,
        duration: training.duration,
        mode: training.mode_of_study,
        rating: 4.8,
        reviewsCount: 150,
        price: training.price_level_1,
        originalPrice: training.price_level_1 ? parseInt(training.price_level_1) * 1.2 : 0,

        video_id: training.video_id,
        video_url: training.video_url,

        // Map top-level data
        instructors: apiData.instructors || [],
        faq: apiData.faq || [],
        reviews: apiData.reviews || [],
        comments: apiData.comments || [],
        prospectus: apiData.prospectus,
        created_at: training.created_at,
        updated_at: training.updated_at,

        ...training // Spread remaining fields if needed by other components
    };

    return (
        <section className="bg-white">
            <InternshipHero internship={internshipData} />

            <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <InternshipInfo internship={internshipData} />
                    {/* Mapped highlights if available in API, else fallback or empty */}
                    <InternshipHighlights internship={internshipData} />

                    {/* Pass data for dynamic rendering of accordions */}
                    <InternshipAccordionBlocks internship={internshipData} />

                    <InternshipPaymentDetails internship={internshipData} />
                </div>

                <div className="lg:-mt-32">
                    <InternshipSidebar internship={internshipData} />
                </div>
            </div>

            <InternshipEnquiriesSection enquiries={internshipData.comments} />
        </section>
    );
}
