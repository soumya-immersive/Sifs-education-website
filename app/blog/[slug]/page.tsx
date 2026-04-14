"use client";

import React from "react";
import { notFound } from "next/navigation";
import BlogHero from "../../../components/blog/BlogHero";
import BlogContent from "../../../components/blog/BlogContent";
import { BLOG_PAGE_INITIAL_DATA } from "../../../lib/data/blog-page-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params: paramsPromise }: Props) {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const data = BLOG_PAGE_INITIAL_DATA;
  const posts = data.posts || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20 mb-12 relative">
      <Toaster position="top-right" />

      <BlogHero
        post={post}
      />

      <div className="max-w-4xl mx-auto px-4 mt-12">
        <div className="mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#3E58EE] font-bold hover:gap-3 transition-all group"
          >
            <ArrowLeft size={20} />
            <span>View All Blogs</span>
          </Link>
        </div>

        <div className="flex flex-col gap-12">
          {/* Main Article Area */}
          <article className="w-full">
            <BlogContent
              post={post}
            />
          </article>
        </div>
      </div>
    </main>
  );
}
