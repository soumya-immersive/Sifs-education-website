import { notFound } from "next/navigation";

import TrainingHero from "../../../components/trainings/TrainingHero";
import TrainingFilterBar from "../../../components/trainings/TrainingFilterBar";
import TrainingGrid from "../../../components/trainings/TrainingGrid";
import Learning from "../../../components/trainings/Learning";

import { trainingPrograms } from "../../../data/trainingPrograms";
import { trainings as staticTrainings, Training } from "../../../data/trainings";
import { API_BASE_URL } from "@/lib/config";

interface ApiTraining {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  image_url: string;
  training_code: string | null;
  price_level_1: string;
  duration: string;
  training_outline: string;
  case_studies: string;
  mode_of_study: string;
}

const apiEndpoints: Record<string, string> = {
  "corporate-training": `${API_BASE_URL}/EducationAndInternship/Website/training/corporate-training`,
  "onsite-training": `${API_BASE_URL}/EducationAndInternship/Website/training/onsite-training`,
  "handson-training": `${API_BASE_URL}/EducationAndInternship/Website/training/hands-on-training`,
  "online-training": `${API_BASE_URL}/EducationAndInternship/Website/training/online-training`,
};

async function getApiTrainings(program: string): Promise<Training[]> {
  const url = apiEndpoints[program];
  if (!url) return [];

  try {
    console.log(`Fetching trainings for ${program} from ${url}`);
    const res = await fetch(url, { cache: "no-store", headers: { 'Accept': 'application/json' } });

    if (!res.ok) {
      console.error(`Failed to fetch trainings for ${program}: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.error('Error Body:', text.slice(0, 500)); // Log first 500 chars
      return [];
    }

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      if (json.success && json.data?.data) {
        return json.data.data.map((t: ApiTraining) => ({
          id: t.id,
          slug: t.slug,
          programSlug: program,
          trainingCode: t.training_code || `CT-${t.id}`,
          title: t.title,
          overview: t.sub_title || "",
          heroImage: t.image_url || "/training/training.png",
          rating: 4.8,
          reviewsCount: 150,
          bannerImage: "/training/hero-bg.png",
          highlights: ["24/7 Portal Access", "Live Practical Demonstrations", "Industry Recognized Certificate"],
          price: t.price_level_1,
          duration: t.duration,
          trainingOutline: t.training_outline,
          caseStudies: t.case_studies
        }));
      }
      return [];
    } catch (parseError) {
      console.error(`Invalid JSON received for ${program}:`, text.slice(0, 200));
      return [];
    }

  } catch (error) {
    // console.error("API Fetch Error:", error);
    return [];
  }
}

interface Props {
  params: Promise<{
    program: string;
  }>;
}

export default async function TrainingProgramPage({ params }: Props) {
  const { program } = await params;

  // Validate program
  const programData = trainingPrograms.find(
    (p) => p.slug === program
  );

  if (!programData) notFound();

  let programTrainings: Training[] = [];

  if (apiEndpoints[program]) {
    programTrainings = await getApiTrainings(program);
  } else {
    programTrainings = staticTrainings.filter(
      (t) => t.programSlug === program
    );
  }

  // Fallback to static if API returns empty for supported program (optional, or just show empty)
  if (apiEndpoints[program] && programTrainings.length === 0) {
    // decide if fallback is needed. typically no, if API is meant to be source of truth.
  }

  return (
    <main>
      <TrainingHero program={programData} />
      <TrainingFilterBar />
      <TrainingGrid trainings={programTrainings} />
      <Learning />
    </main>
  );
}
