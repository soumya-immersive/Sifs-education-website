import { notFound } from "next/navigation";

import TrainingHero from "../../../components/trainings/TrainingHero";
import TrainingFilterBar from "../../../components/trainings/TrainingFilterBar";
import TrainingGrid from "../../../components/trainings/TrainingGrid";
import Learning from "../../../components/trainings/Learning";

import { trainingPrograms } from "../../../data/trainingPrograms";
import { trainings } from "../../../data/trainings";

interface Props {
  params: Promise<{
    program: string;
  }>;
}

export default async function TrainingProgramPage({ params }: Props) {
  // ✅ IMPORTANT: unwrap params (Next.js App Router requirement)
  const { program } = await params;

  // ✅ Validate program
  const programData = trainingPrograms.find(
    (p) => p.slug === program
  );

  if (!programData) notFound();

  // ✅ FILTER TRAININGS HERE (THIS IS THE LINE YOU ASKED ABOUT)
  const programTrainings = trainings.filter(
    (t) => t.programSlug === program
  );

  return (
    <main>
      <TrainingHero program={programData} />
      <TrainingFilterBar />
      <TrainingGrid trainings={programTrainings} />
      <Learning />
    </main>
  );
}
