import { Metadata } from "next";
import Image from "next/image";
import { API_BASE_URL, BASE_URL } from "@/lib/config";
import { notFound } from "next/navigation";

interface PageData {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  slug: string;
  featured_image: string;
  body: string;
  featured_image_url: string;
  seo: {
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    seo_og_image: string;
  };
}

interface ApiResponse {
  success: boolean;
  data: PageData;
}

async function getTermsData(): Promise<PageData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/page/terms-and-conditions`, {
      cache: "no-store", // Ensure fresh data from the API
    });

    if (!res.ok) {
      console.error("Failed to fetch terms data:", res.status);
      return null;
    }

    const json: ApiResponse = await res.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching terms data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTermsData();
  if (!data) return { title: "Terms & Conditions | SIFS India" };

  return {
    title: data.seo?.seo_title || data.title,
    description: data.seo?.seo_description || data.subtitle,
    keywords: data.seo?.seo_keywords,
    openGraph: {
      title: data.seo?.seo_title || data.title,
      description: data.seo?.seo_description || data.subtitle,
      images: data.seo?.seo_og_image ? [{ url: data.seo.seo_og_image }] : (data.featured_image_url ? [{ url: data.featured_image_url }] : []),
    },
  };
}

export default async function TermsAndConditions() {
  const data = await getTermsData();

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F0F5F9] pb-36 ">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        {data.featured_image ? (
          <Image
            src={`${BASE_URL}/uploads/${data.featured_image}`}
            alt={data.title}
            fill
            className="object-cover brightness-90"
            priority
          />
        ) : data.featured_image_url ? (
          <Image
            src={data.featured_image_url}
            alt={data.title}
            fill
            className="object-cover brightness-90"
            priority
          />
        ) : (
          <Image
            src="/terms-hero.png"
            alt="Terms and Conditions Banner"
            fill
            className="object-cover brightness-90"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
            {data.title}
          </h1>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 relative z-10">
        <div className="bg-white shadow-2xl rounded-sm p-8 md:p-16 text-gray-700">

          <div className="space-y-10 text-[13px] md:text-[14px] leading-relaxed">

            {/* Dynamic Content Area */}
            <div
              className="dynamic-content-area"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />

            {/* If body is empty, show a message */}
            {!data.body && (
              <div className="text-center py-20 text-gray-400">
                <p>Content for Terms & Conditions is currently being updated. Please check back later.</p>
              </div>
            )}

            {/* Footer Details */}
            {/* <section className="pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="font-bold text-black uppercase tracking-wider">Head Office Address</h3>
                <address className="not-italic text-sm text-gray-500 leading-relaxed">
                  Sherlock Institute of Forensic Science, India,<br />
                  A-14, Mahendru Enclave,<br />
                  Near Model Town, Delhi-110033
                </address>
              </div>
              <div className="flex items-end md:justify-end italic text-xs text-gray-400">
                &quot;Please write the name of your course in the subject line of your email or on the envelope&quot;.
              </div>
            </section> */}

          </div>
        </div>
      </div>
    </div>
  );
}