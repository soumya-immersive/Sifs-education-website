"use client";

import { Search, ChevronRight, Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BLOG_PAGE_INITIAL_DATA } from "../../lib/data/blog-page-data";
import { BlogPost } from "../../types/blog-page";

export default function BlogSidebar() {
  const router = useRouter();
  const data = BLOG_PAGE_INITIAL_DATA;
  const [searchQuery, setSearchQuery] = useState("");

  const categories = data.categories || [];
  const recentPosts = (data.recentPostIds || [])
    .map((id: number) => data.posts.find((p: BlogPost) => p.id === id))
    .filter((post): post is BlogPost => !!post);

  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') return html.replace(/<\/?[^>]+(>|$)/g, "");
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (catName: string) => {
    router.push(`/blog?category=${encodeURIComponent(catName)}`);
  };

  return (
    <div className="space-y-10 sticky top-24">
      {/* Search Box */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h4 className="font-bold mb-4 text-gray-900 text-lg">Search blog</h4>
        <hr className="border-gray-200 mb-6" />
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-4 pr-10 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4559ED]/20 focus:border-[#4559ED]/30 transition-all"
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-gray-900 text-lg">Categories</h4>
        </div>
        <hr className="border-gray-200 mb-6" />
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative">
              <div
                onClick={() => handleCategoryClick(cat.name)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl text-sm transition-all duration-200 font-medium cursor-pointer bg-gray-50 text-gray-800 hover:bg-gray-100"
              >
                <div dangerouslySetInnerHTML={{ __html: cat.name }} />
                <ChevronRight
                  className="w-4 h-4 text-gray-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h4 className="font-bold mb-6 text-gray-900 text-lg">Recent Post</h4>
        <hr className="border-gray-200 mb-6" />
        <div className="space-y-6">
          {recentPosts.map((post: BlogPost) => (
            <div key={post.id} className="relative group">
              <Link
                href={`/blog/${post.slug}`}
                className="flex gap-4 group"
              >
                {/* Thumbnail Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image || "/blog-thumb.png"}
                    alt={stripHtml(post.title)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>

                {/* Post Info */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#4559ED] transition-colors">
                    {stripHtml(post.title)}
                  </h5>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">{stripHtml(post.date)}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
