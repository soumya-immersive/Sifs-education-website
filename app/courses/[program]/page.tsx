import { notFound } from "next/navigation";

import CoursesHero from "../../../components/courses/CoursesHero";
import CoursesFilterBar from "../../../components/courses/CoursesFilterBar";
import CoursesGrid from "../../../components/courses/CoursesGrid";
import Learning from "../../../components/courses/Learning";

import { coursePrograms } from "../../../data/coursePrograms";
import { courses } from "../../../data/courses";

interface Props {
  params: Promise<{
    program: string;
  }>;
}

export default async function ProgramPage({ params }: Props) {
  const { program } = await params; 

  // Validate program
  const programData = coursePrograms.find(
    (p) => p.slug === program
  );

  if (!programData) notFound();

  // Filter courses for this program
  const programCourses = courses.filter(
    (course) => course.programSlug === program
  );

  return (
    <main>
      {/* HERO */}
      <CoursesHero program={programData} />

      {/* FILTER BAR */}
      <CoursesFilterBar />

      {/* COURSES GRID */}
      <CoursesGrid courses={programCourses} />

      {/* LEARNING SECTION */}
      <Learning />
    </main>
  );
}
