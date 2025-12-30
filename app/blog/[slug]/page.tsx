import { notFound } from "next/navigation";
import BlogHero from "../../../components/blog/BlogHero";
import BlogContent from "../../../components/blog/BlogContent";
import BlogSidebar from "../../../components/blog/BlogSidebar";

// Assume you have a data file or API
import { posts } from "../../../data/posts"; 

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20 mb-12">
      <BlogHero post={post} />
      
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Article Area */}
          <article className="lg:w-2/3">
            <BlogContent post={post} />
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