import { notFound } from "next/navigation";

import TrainingHero from "../../../components/trainings/TrainingHero";
import TrainingFilterBar from "../../../components/trainings/TrainingFilterBar";
import TrainingGrid from "../../../components/trainings/TrainingGrid";
import Learning from "../../../components/trainings/Learning";

import { trainingPrograms } from "../../../data/trainingPrograms";
import { trainings as staticTrainings, Training } from "../../../data/trainings";
import { PaginationData } from "../../../components/courses/CoursesGrid";
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

// Final API endpoint will be: `${API_BASE_URL}/EducationAndInternship/Website/training-categories/${program}`

async function getApiTrainings(
  program: string,
  page: number = 1,
  limit: number = 10
): Promise<{ trainings: Training[]; pagination?: PaginationData }> {
  const queryParams = new URLSearchParams();
  queryParams.append("page", String(page));
  queryParams.append("limit", String(limit));
  queryParams.append("_t", String(Date.now()));

  const url = `${API_BASE_URL}/EducationAndInternship/Website/training-categories/${program}?${queryParams.toString()}`;

  try {
    console.log(`Fetching trainings for ${program} from ${url}`);
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch trainings for ${program}: ${res.status} ${res.statusText}`
      );
      return { trainings: [] };
    }

    const text = await res.text();
    try {
      const json = JSON.parse(text);

      let dataArr: any[] = [];
      let pagination: PaginationData | undefined = undefined;

      // Handle different API response structures
      if (json.success && json.data) {
        if (Array.isArray(json.data.data)) {
          // Paginated Structure
          dataArr = json.data.data;
          pagination = {
            current_page: json.data.current_page,
            per_page: json.data.per_page,
            total: json.data.total,
            total_pages: json.data.last_page,
            showing_from: (json.data.current_page - 1) * json.data.per_page + 1,
            showing_to: Math.min(
              json.data.current_page * json.data.per_page,
              json.data.total
            ),
            has_previous: json.data.current_page > 1,
            has_next: json.data.current_page < json.data.last_page,
          };
        } else if (json.data.category?.trainings) {
          // Nested structure
          dataArr = json.data.category.trainings;
        } else if (Array.isArray(json.data)) {
          // Direct Array
          dataArr = json.data;
        }
      }

      if (Array.isArray(dataArr)) {
        const mappedTrainings = dataArr.map((t: ApiTraining) => ({
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
          highlights: [
            "24/7 Portal Access",
            "Live Practical Demonstrations",
            "Industry Recognized Certificate",
          ],
          price: t.price_level_1,
          duration: t.duration,
          trainingOutline: t.training_outline,
          caseStudies: t.case_studies,
        }));

        return { trainings: mappedTrainings, pagination };
      }
      return { trainings: [] };
    } catch (parseError) {
      console.error(
        `Invalid JSON received for ${program}:`,
        text.slice(0, 200)
      );
      return { trainings: [] };
    }
  } catch (error) {
    // console.error("API Fetch Error:", error);
    return { trainings: [] };
  }
}

interface Props {
  params: Promise<{
    program: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function TrainingProgramPage({ params, searchParams }: Props) {
  const { program } = await params;
  const { page, limit } = (await searchParams) || {};

  const currentPage = parseInt(page || "1", 10);
  const currentLimit = parseInt(limit || "10", 10);

  // Validate program
  const programData = trainingPrograms.find((p) => p.slug === program);

  if (!programData) notFound();

  const { trainings: programTrainings, pagination } = await getApiTrainings(
    program,
    currentPage,
    currentLimit
  );

  return (
    <main>
      <TrainingHero program={programData} />
      <TrainingFilterBar />
      {programTrainings.length > 0 ? (
        <TrainingGrid
          trainings={programTrainings}
          pagination={pagination}
          slug={program}
          basePath="/training"
        />
      ) : (
        <div className="py-20 text-center max-w-lg mx-auto">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            No Trainings Found
          </h2>
          <p className="text-gray-500 mb-8">
            No trainings are available in this category at the moment.
          </p>
        </div>
      )}
      <Learning />
    </main>
  );
}
