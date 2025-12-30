import { notFound } from "next/navigation";
import { internships } from "../../../../data/internships";

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
    internship: string; 
  }>;
}

export default async function InternshipDetailsPage({ params }: Props) {
  const { program, internship: internshipSlug } = await params; 

  const internshipData = internships.find(
    (i) =>
      i.programSlug === program &&
      i.slug === internshipSlug
  );

  if (!internshipData) notFound();

  return (
    <section className="bg-white">
      <InternshipHero internship={internshipData} />

      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <InternshipInfo internship={internshipData} />
          <InternshipHighlights internship={internshipData} />
          <InternshipAccordionBlocks internship={internshipData} />
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