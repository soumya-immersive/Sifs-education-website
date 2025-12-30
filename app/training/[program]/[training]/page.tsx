// /app/training/[program]/[training]/page.tsx

import { notFound } from "next/navigation";
import { trainings } from "../../../../data/trainings";

// Importing training-specific detail components
import TrainingHero from "../../../../components/training/TrainingHero";
import TrainingSidebar from "../../../../components/training/TrainingSidebar";
import TrainingInfo from "../../../../components/training/TrainingInfo";
import TrainingHighlights from "../../../../components/training/TrainingHighlights";
import TrainingAccordionBlocks from "../../../../components/training/TrainingAccordionBlocks";
import TrainingPaymentDetails from "../../../../components/training/TrainingPaymentDetails";
import TrainingEnquiriesSection from "../../../../components/training/TrainingEnquiriesSection";

interface Props {
  params: Promise<{
    program: string;
    training: string; // matches folder name [training]
  }>;
}

export default async function TrainingDetailsPage({ params }: Props) {
  // Await params (Next.js dynamic params are async)
  const { program, training: trainingSlug } = await params;

  /* ---------------- Find Training Data ---------------- */
  const trainingData = trainings.find(
    (t) =>
      t.programSlug === program &&
      t.slug === trainingSlug
  );

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
          <TrainingHighlights training={trainingData} />
          <TrainingAccordionBlocks training={trainingData} />
          <TrainingPaymentDetails training={trainingData} />
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
