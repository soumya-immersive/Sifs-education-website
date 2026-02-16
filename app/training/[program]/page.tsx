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
  mode_of_study: string;
}

async function getApiTrainings(
  program: string,
  page: number = 1,
  limit: number = 10,
  search: string = "",
  sduration: string = "",
  sno: string = ""
): Promise<{ trainings: Training[]; pagination?: PaginationData }> {
  const queryParams = new URLSearchParams();
  // Fetch with a higher limit to ensure we find the category, as the API paginates categories
  queryParams.append("limit", "100");
  if (search) queryParams.append("search", search);
  if (sduration) queryParams.append("sduration", sduration);
  if (sno) queryParams.append("sno", sno);
  queryParams.append("_t", String(Date.now()));

  const url = `${API_BASE_URL}/EducationAndInternship/Website/training-categories?${queryParams.toString()}`;

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

      let targetCategory: any = null;

      if (json.success && json.data) {
        if (Array.isArray(json.data.categories)) {
          targetCategory = json.data.categories.find((c: any) => c.slug === program);
        } else if (Array.isArray(json.data)) {
          // Fallback if data is direct array
          targetCategory = json.data.find((c: any) => c.slug === program);
        }
      }

      if (targetCategory && Array.isArray(targetCategory.trainings)) {
        const allTrainings = targetCategory.trainings.map((t: ApiTraining) => ({
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
          trainingOutline: "", // Not in new API
        }));

        let filteredTrainings = allTrainings;

        // Client-side filtering to ensure accuracy if API doesn't filter nested items
        if (search) {
          const searchLower = search.toLowerCase();
          filteredTrainings = filteredTrainings.filter((t: any) =>
            t.title.toLowerCase().includes(searchLower) ||
            t.overview.toLowerCase().includes(searchLower)
          );
        }

        if (sduration) {
          const durationLower = sduration.toLowerCase();
          filteredTrainings = filteredTrainings.filter((t: any) =>
            t.duration.toLowerCase().includes(durationLower)
          );
        }

        // Manual Pagination
        const total = filteredTrainings.length;
        const totalPages = Math.ceil(total / limit);
        const offset = (page - 1) * limit;
        const paginatedTrainings = filteredTrainings.slice(offset, offset + limit);

        const pagination: PaginationData = {
          current_page: page,
          per_page: limit,
          total: total,
          total_pages: totalPages,
          showing_from: offset + 1,
          showing_to: Math.min(offset + limit, total),
          has_previous: page > 1,
          has_next: page < totalPages,
        };

        return { trainings: paginatedTrainings, pagination };
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
    search?: string;
    sduration?: string;
    sno?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function TrainingProgramPage({ params, searchParams }: Props) {
  const { program } = await params;
  const { page, limit, search, sduration, sno } = (await searchParams) || {};

  const currentPage = parseInt(page || "1", 10);
  const currentLimit = parseInt(limit || "10", 10);

  // Validate program
  const programData = trainingPrograms.find((p) => p.slug === program);

  if (!programData) notFound();

  const { trainings: programTrainings, pagination } = await getApiTrainings(
    program,
    currentPage,
    currentLimit,
    search || "",
    sduration || "",
    sno || ""
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
