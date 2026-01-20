import { notFound } from "next/navigation";
import InternshipHero from "../../../components/internship/InternshipHero";
import InternshipSidebar from "../../../components/internship/InternshipSidebar";
import InternshipInfo from "../../../components/internship/InternshipInfo";
import InternshipHighlights from "../../../components/internship/InternshipHighlights";
import InternshipAccordionBlocks from "../../../components/internship/InternshipAccordionBlocks";
import InternshipReviews from "../../../components/internship/InternshipReviews";
import InternshipPaymentDetails from "../../../components/internship/InternshipPaymentDetails";
import InternshipEnquiriesSection from "../../../components/internship/InternshipEnquiriesSection";

async function getInternshipDetails(slug: string) {
    try {
        const res = await fetch(`http://localhost:3000/api/EducationAndInternship/Website/training/training-details/${slug}`, {
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
        ...training, // Spread first to populate specific fields (and ensure we don't miss anything)

        id: training.id,
        programSlug: "online-forensic-internship", // Hardcoded for this route
        slug: training.slug,
        title: training.title,
        overview: training.sub_title || training.training_outline,
        internshipCode: training.training_code || "OFI-001",
        heroImage: training.image_url || "/internships/internship.png",

        // Additional fields mapped from API
        description: training.training_outline, // Use outline as main description if needed, or stick to sub_title
        duration: training.duration,
        mode: training.mode_of_study,
        // Calculate rating dynamically
        rating: (apiData.reviews && apiData.reviews.length > 0)
            ? (apiData.reviews.reduce((acc: number, curr: any) => acc + (curr.star || 0), 0) / apiData.reviews.length)
            : 0,
        reviewsCount: apiData.reviews ? apiData.reviews.length : 0,
        price: training.price_level_1,

        // Calculate original price (showing a discount) or use a logic if exists
        originalPrice: training.price_level_1 ? Math.floor(parseInt(training.price_level_1) * 1.2) : 0,

        video_id: training.video_id,
        video_url: training.video_url,

        priceLevel1: training.price_level_1,
        priceLevel2: training.price_level_2,
        priceLevel3: training.price_level_3,
        instructors: apiData.instructors || [],

        faq: apiData.faq || [],
        reviews: apiData.reviews || [],
        comments: apiData.comments || [],

        // Pass HTML content fields
        case_studies: training.case_studies,
        training_outline: training.training_outline,

        // SEO & Meta
        meta_keywords: training.meta_keywords,
        meta_description: training.meta_description,
        seo_title: training.seo_title,

        // Map highlights from meta_keywords if explicit highlights aren't there
        highlights: training.meta_keywords ? training.meta_keywords.split(',').map((k: string) => k.trim()) : [],

        callForAssistance: training.call_for_assistance,
    };

    return (
        <section className="bg-white">
            <InternshipHero internship={internshipData} />

            <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <InternshipInfo internship={internshipData} />
                    <InternshipHighlights internship={internshipData} />
                    <InternshipAccordionBlocks internship={internshipData} />
                    <InternshipReviews internship={internshipData} />
                    <InternshipPaymentDetails internship={internshipData} />
                </div>

                <div className="lg:-mt-32">
                    <InternshipSidebar internship={internshipData} />
                </div>
            </div>

            <InternshipEnquiriesSection />
        </section>
    );
}
