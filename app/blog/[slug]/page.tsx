"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import BlogHero from "../../../components/blog/BlogHero";
import BlogContent from "../../../components/blog/BlogContent";
import { useBlogPageData } from "../../../hooks/useBlogPageData";
import {
  Loader2,
  Save,
  Edit,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params: paramsPromise }: Props) {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  } = useBlogPageData();

  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  const posts = data.posts || [];
  const post = posts.find((p) => p.slug === slug);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#3E58EE] animate-spin" />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const handleEditClick = () => {
    setIsEditLoading(true);
    setTimeout(() => {
      setEditMode(true);
      setIsEditLoading(false);
    }, 600);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Post saved successfully");
      } else {
        toast.error("❌ Failed to save post");
      }
      setIsSaving(false);
    }, 800);
  };

  const updatePostData = (fields: any) => {
    const updatedPosts = posts.map(p => p.id === post.id ? { ...p, ...fields } : p);
    updateSection("posts", updatedPosts);
  };

  return (
    <main className="min-h-screen bg-white pb-20 mb-12 relative">
      <Toaster position="top-right" />

      {/* Admin Controls */}
      <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
        {!editMode ? (
          <button
            onClick={handleEditClick}
            disabled={isEditLoading}
            className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium ${isEditLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isEditLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Edit size={18} />
            )}
            {isEditLoading ? 'Loading...' : 'Edit Page'}
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium animate-in fade-in zoom-in ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <BlogHero
        post={post}
        editMode={editMode}
        onUpdate={updatePostData}
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
              editMode={editMode}
              onUpdate={updatePostData}
            />
          </article>
        </div>
      </div>
    </main>
  );
}
