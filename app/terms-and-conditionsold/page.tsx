import Image from "next/image";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "../../lib/config";

async function getPageData() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/EducationAndInternship/Website/page/terms-and-conditions`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            return null;
        }

        const result = await response.json();
        return result.success ? result.data : null;
    } catch (error) {
        console.error("Error fetching terms and conditions:", error);
        return null;
    }
}

export async function generateMetadata() {
    const pageData = await getPageData();

    if (!pageData) {
        return {
            title: "Terms & Conditions | SIFS India",
            description: "Terms and conditions for SIFS India courses and programs",
        };
    }

    return {
        title: pageData.seo?.seo_title || pageData.title,
        description: pageData.seo?.seo_description || pageData.subtitle,
        keywords: pageData.seo?.seo_keywords,
        openGraph: {
            title: pageData.seo?.seo_title || pageData.title,
            description: pageData.seo?.seo_description || pageData.subtitle,
            images: pageData.seo?.seo_og_image ? [pageData.seo.seo_og_image] : [],
        },
    };
}

export default async function TermsAndConditionsPage() {
    const pageData = await getPageData();

    if (!pageData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F0F5F9] pb-20 mb-12">
            {/* Hero Section with Featured Image */}
            <div className="relative h-[400px] w-full">
                <Image
                    src="/terms-hero.png"
                    alt={pageData.title}
                    fill
                    className="object-cover brightness-90"
                    priority
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                        {pageData.title}
                    </h1>
                </div>
            </div>

            {/* Content Card */}
            <div className="max-w-6xl mx-auto -mt-16 px-4 relative z-10">
                <div className="bg-white shadow-2xl rounded-sm p-8 md:p-16 text-gray-700">
                    {/* Dynamic HTML Content from API */}
                    <div
                        className="prose prose-sm md:prose-base max-w-none 
                       prose-headings:text-black prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide
                       prose-h2:text-lg prose-h2:mb-4
                       prose-h3:text-base prose-h3:mb-3
                       prose-p:text-[13px] md:prose-p:text-[14px] prose-p:leading-relaxed prose-p:mb-4
                       prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2
                       prose-li:text-gray-600
                       prose-a:text-[#0056B3] prose-a:font-medium prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: pageData.body }}
                    />
                </div>
            </div>
        </div>
    );
}
