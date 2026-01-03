"use client";

import { Search, ChevronRight, Calendar, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBlogPageData } from "../../hooks/useBlogPageData";
import EditableText from "../editable/EditableText";
import { toast } from "react-hot-toast";

export default function BlogSidebar() {
  const router = useRouter();
  const { data, isLoaded, editMode, updateSection } = useBlogPageData();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  const categories = data.categories || [];
  const recentPosts = (data.recentPostIds || [])
    .map(id => data.posts.find(p => p.id === id))
    .filter(Boolean);

  const stripHtml = (html: string) => {
    if (typeof window === 'undefined') return html.replace(/<\/?[^>]+(>|$)/g, "");
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const updateCategoryName = (id: number, newName: string) => {
    const updated = categories.map(c => c.id === id ? { ...c, name: newName } : c);
    updateSection("categories", updated);
  };

  const deleteCategory = (id: number) => {
    updateSection("categories", categories.filter(c => c.id !== id));
    toast.success("Category deleted");
  };

  const addCategory = () => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    updateSection("categories", [...categories, { id: newId, name: "New Category" }]);
  };

  const toggleRecentPost = (postId: number) => {
    const current = data.recentPostIds || [];
    if (current.includes(postId)) {
      updateSection("recentPostIds", current.filter(id => id !== postId));
      toast.success("Removed from recent posts");
    } else {
      updateSection("recentPostIds", [...current, postId]);
      toast.success("Added to recent posts");
    }
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (editMode) {
      setSelectedCategory(catName);
    } else {
      router.push(`/blog?category=${encodeURIComponent(catName)}`);
    }
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
          {editMode && (
            <button onClick={addCategory} className="text-[#4559ED] hover:bg-blue-50 p-1 rounded-full">
              <Plus size={20} />
            </button>
          )}
        </div>
        <hr className="border-gray-200 mb-6" />
        <div className="space-y-2.5">
          {categories.map((cat) => {
            const isSelected = cat.name === selectedCategory;

            return (
              <div key={cat.id} className="group relative">
                <div
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`
                    w-full flex items-center justify-between p-3.5 rounded-xl text-sm 
                    transition-all duration-200 font-medium cursor-pointer
                    ${isSelected
                      ? "bg-[#4559ED] text-white shadow-sm shadow-[#4559ED]/20"
                      : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                    }
                  `}
                >
                  <EditableText
                    html={cat.name}
                    editMode={editMode}
                    onChange={(val) => updateCategoryName(cat.id, val)}
                  />
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${isSelected ? "text-white translate-x-0.5" : "text-gray-400"
                      }`}
                  />
                </div>
                {editMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                    className="absolute -right-2 -top-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Plus size={12} className="rotate-45" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h4 className="font-bold mb-6 text-gray-900 text-lg">Recent Post</h4>
        <hr className="border-gray-200 mb-6" />
        <div className="space-y-6">
          {recentPosts.map((post: any) => (
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
              {editMode && (
                <button
                  onClick={() => toggleRecentPost(post.id)}
                  className="absolute -right-2 -top-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus size={10} className="rotate-45" />
                </button>
              )}
            </div>
          ))}
          {editMode && recentPosts.length === 0 && (
            <div className="text-xs text-gray-400 italic text-center py-4 border-2 border-dashed border-gray-100 rounded-xl">
              Go to blog listing to add posts to recent posts
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
