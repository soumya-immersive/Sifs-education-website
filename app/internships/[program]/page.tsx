import { notFound } from "next/navigation";

import InternshipsHero from "../../../components/internships/InternshipsHero";
import InternshipsFilterBar from "../../../components/internships/InternshipsFilterBar";
import InternshipsGrid from "../../../components/internships/InternshipsGrid";
import Learning from "../../../components/internships/Learning";

import { internshipPrograms } from "../../../data/internshipPrograms";
import { internships } from "../../../data/internships";

interface Props {
  params: Promise<{
    program: string;
  }>;
}

export default async function InternshipProgramPage({ params }: Props) {
  const { program } = await params;

  const programData = internshipPrograms.find(
    (p) => p.slug === program
  );

  if (!programData) {
    notFound();
  }

  const programInternships = internships.filter(
    (internship) => internship.programSlug === program
  );

  if (!programInternships.length) {
    notFound();
  }

  return (
    <main>
      {/* Passing program specific metadata to the Hero */}
      <InternshipsHero program={programData} />

      {/* Logic for filtering within the specific program */}
      <InternshipsFilterBar />

      {/* Grid displaying the filtered internships */}
      <InternshipsGrid internships={programInternships} />

      {/* General info section */}
      <Learning />
    </main>
  );
}