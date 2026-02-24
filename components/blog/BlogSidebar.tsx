"use client";

import { Search, ChevronRight, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL, BASE_URL } from "@/lib/config";
import type { BlogCategory, CategoriesResponse, BlogPost, BlogsResponse } from "@/types/blog";

export default function BlogSidebar() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch Categories
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/blog-categories`);
        if (res.ok) {
          const json: CategoriesResponse = await res.json();
          if (json.success && json.data.categories) {
            setCategories(json.data.categories);
          }
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    // Fetch Recent Posts
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/blogs?page=1&limit=4`);
        if (res.ok) {
          const json: BlogsResponse = await res.json();
          if (json.success && json.data.data) {
            setRecentPosts(json.data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch recent posts", err);
      }
    };

    fetchCategories();
    fetchRecentPosts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="space-y-10 sticky top-24">
      {/* Search Box */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h4 className="font-bold mb-4 text-gray-900 text-lg">Search blog</h4>
        <div className="relative group">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FBFCFF] border border-gray-200 rounded-xl py-3 px-4 pr-10 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#3E58EE]/20 focus:border-[#3E58EE] transition-all group-hover:border-gray-300 placeholder:text-gray-400"
            />
            <button type="submit" className="absolute right-3 top-3 text-gray-400 group-focus-within:text-[#3E58EE] transition-colors">
              <Search size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h4 className="font-bold text-gray-900 text-lg mb-4">Categories</h4>

        <div className="relative mb-4 group">
          <input
            type="text"
            placeholder="Search categories..."
            value={categorySearchTerm}
            onChange={(e) => setCategorySearchTerm(e.target.value)}
            className="w-full bg-[#FBFCFF] border border-gray-200 rounded-xl py-2 px-3 pr-9 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-[#3E58EE]/20 focus:border-[#3E58EE] transition-all placeholder:text-gray-400"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={14} />
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          <Link
            href="/blog"
            className="w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all bg-[#FBFCFF] text-gray-600 hover:bg-[#F3F6FF] hover:text-[#3E58EE]"
          >
            All Posts
            <ChevronRight size={14} />
          </Link>
          {categories
            .filter(cat => cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase()))
            .map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.id}`}
                className="w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-medium transition-all bg-[#FBFCFF] text-gray-600 hover:bg-[#F3F6FF] hover:text-[#3E58EE]"
              >
                <span>{cat.name}</span>
                <ChevronRight size={14} />
              </Link>
            ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h4 className="font-bold mb-6 text-gray-900 text-lg">Recent Post</h4>
        <hr className="border-gray-200 mb-6" />
        <div className="space-y-6">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-4 group"
              >
                {/* Thumbnail Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={`${BASE_URL}/uploads/Education-And-Internship-Admin-Blog-Main/${post.main_image}`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/blog-thumb.png'; // Fallback
                      (e.target as HTMLImageElement).onerror = null;
                    }}
                  />
                </div>

                {/* Post Info */}
                <div className="flex-1 min-w-0">
                  <h5 className="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#4559ED] transition-colors">
                    {post.title}
                  </h5>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(post.publish_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}