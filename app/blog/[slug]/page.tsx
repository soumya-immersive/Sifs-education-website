import { notFound } from "next/navigation";
import BlogHero from "../../../components/blog/BlogHero";
import BlogContent from "../../../components/blog/BlogContent";
import BlogSidebar from "../../../components/blog/BlogSidebar";
import { API_BASE_URL } from "@/lib/config";
import { BlogDetailsResponse } from "@/types/blog";

// Define the Image Base URL (same as in blog listing)
const IMAGE_BASE_URL = "http://localhost:3000/uploads/Education-And-Internship-Admin-Blog";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogDetails(slug: string): Promise<BlogDetailsResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/blog-details/${slug}`, {
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch blog details: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const response = await getBlogDetails(slug);

  if (!response || !response.success || !response.data) {
    notFound();
  }

  const { blog } = response.data;

  // Prepare data for BlogHero
  const heroData = {
    title: blog.title,
    heroImage: blog.main_image ? `${IMAGE_BASE_URL}/${blog.main_image}` : undefined,
  };

  return (
    <main className="min-h-screen bg-white pb-20 mb-12">
      {/* Hero Section */}
      <BlogHero post={heroData} />

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Article Area */}
          <article className="lg:w-2/3">
            <BlogContent post={blog} />
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <BlogSidebar />
          </aside>

        </div>
      </div>
    </main>
  );
}