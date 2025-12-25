import { notFound } from "next/navigation";
import { internships } from "../../../../data/internships";

// Importing from the singular "internship" folder for detail-specific components
import InternshipHero from "../../../../components/internship/InternshipHero";
import InternshipSidebar from "../../../../components/internship/InternshipSidebar";
import InternshipInfo from "../../../../components/internship/InternshipInfo";
import InternshipHighlights from "../../../../components/internship/InternshipHighlights";
import InternshipAccordionBlocks from "../../../../components/internship/InternshipAccordionBlocks";
import InternshipPaymentDetails from "../../../../components/internship/InternshipPaymentDetails";
import InternshipEnquiriesSection from "../../../../components/internship/InternshipEnquiriesSection";

interface Props {
  params: Promise<{
    program: string;
    internship: string; // Changed from slug to internship to match folder [internship]
  }>;
}

export default async function InternshipDetailsPage({ params }: Props) {
  // Destructure 'internship' from params (this will hold the slug value from the URL)
  const { program, internship: internshipSlug } = await params; 

  /* ---------------- Find Internship Data ---------------- */
  const internshipData = internships.find(
    (i) =>
      i.programSlug === program &&
      i.slug === internshipSlug
  );

  // If the URL doesn't match any data, show the 404 page
  if (!internshipData) notFound();

  return (
    <section className="bg-white">
      {/* HERO SECTION */}
      <InternshipHero internship={internshipData} />

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-2 space-y-6">
          <InternshipInfo internship={internshipData} />
          <InternshipHighlights internship={internshipData} />
          <InternshipAccordionBlocks internship={internshipData} />
          <InternshipPaymentDetails internship={internshipData} />
        </div>

        {/* FLOATING SIDEBAR */}
        <div className="lg:-mt-32">
          <InternshipSidebar internship={internshipData} />
        </div>
      </div>

      {/* CALL TO ACTION / ENQUIRY */}
      <InternshipEnquiriesSection />
    </section>
  );
}