"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Edit, Save } from "lucide-react";

import BooksHero from "../../../components/books/BooksHero";
import BooksFilterBar from "../../../components/books/BooksFilterBar";
import BooksGrid from "../../../components/books/BooksGrid";
import Learning from "../../../components/books/Learning";
import { useDynamicPageData } from "../../../hooks/useDynamicPageData";
import { Course } from "../../../types/courses-page";

interface Props {
  params: Promise<{ category: string }>;
}

export default function BookCategoryPage({ params: paramsPromise }: Props) {
  const params = React.use(paramsPromise);
  const categorySlug = params.category;

  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  } = useDynamicPageData("books");

  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [format, setFormat] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Validate program/category
  const programData = data.programs.find(
    (p) => p.slug === categorySlug
  );

  if (!programData) notFound();

  // 1. Filter books (courses) for this program
  let filteredBooks = data.courses.filter(
    (book) => book.programSlug === categorySlug
  );

  // 2. Apply Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredBooks = filteredBooks.filter(b =>
      b.title.toLowerCase().includes(q) ||
      (b.author && b.author.toLowerCase().includes(q)) ||
      (b.courseCode && b.courseCode.toLowerCase().includes(q)) || // treating courseCode as ISBN
      b.overview.toLowerCase().includes(q)
    );
  }

  // 3. Apply Genre Filter (using genre field if present, or maybe programLabel?)
  if (genre) {
    filteredBooks = filteredBooks.filter(b => b.genre?.toLowerCase() === genre.toLowerCase());
  }

  // 4. Apply Format Filter
  if (format) {
    filteredBooks = filteredBooks.filter(b => b.format?.toLowerCase() === format.toLowerCase());
  }

  // 5. Apply Sort - ONLY if not in editMode
  if (!editMode) {
    filteredBooks.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      switch (sortOrder) {
        case 'newest':
          return dateB - dateA;
        case 'oldest': // Fallback or if added
          return dateA - dateB;
        case 'popular':
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'az':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }

  const handleEditClick = () => {
    setIsEditLoading(true);
    // Reset filters to show all for management
    setSearchQuery("");
    setGenre("");
    setFormat("");
    setEditMode(true);
    setIsEditLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Books saved successfully");
      } else {
        toast.error("❌ Failed to save books");
      }
      setIsSaving(false);
    }, 800);
  };

  const updateProgramInfo = (updatedInfo: any) => {
    const updatedPrograms = data.programs.map(p =>
      p.slug === categorySlug ? { ...p, ...updatedInfo } : p
    );
    updateSection("programs", updatedPrograms);
  };

  const handleAddBook = () => {
    setSearchQuery("");
    setGenre("");
    setFormat("");

    const newBook: Course = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      programSlug: categorySlug,
      slug: `new-book-${Date.now()}`,
      title: "New Book Title",
      author: "Author Name",
      courseCode: "ISBN XXX-XXX",
      overview: "Book overview description...",
      description: "Full description comes here.",
      descriptionParts: ["First paragraph."],
      rating: 0,
      reviewsCount: 0,
      image: "/books/hero.png",
      bannerImage: "/books/banner.jpg",
      skillLevel: "level1", // Default required field
      durationHours: 0, // Default required field
      createdAt: new Date().toISOString(),
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [],
        instructors: []
      },
      highlights: [],
      accordionItems: [],
      paymentDetails: {
        paypal: "",
        bankName: "",
        accountName: "",
        accountNo: "",
        type: "",
        ifsc: "",
        qrImage: ""
      },
      // Book specifics
      publisher: "Publisher",
      language: "English",
      format: "Hardcover",
      pageCount: 300,
      inStock: true
    };
    updateSection("courses", [...data.courses, newBook]);
    toast.success("✨ New book added!");
  };

  const handleUpdateBook = (id: number, updatedInfo: any) => {
    const updatedCourses = data.courses.map(c =>
      c.id === id ? { ...c, ...updatedInfo } : c
    );
    updateSection("courses", updatedCourses);
  };

  const handleDeleteBook = (id: number) => {
    const bookToDelete = data.courses.find(c => c.id === id);
    if (!bookToDelete) return;

    if (confirm(`Are you sure you want to delete "${bookToDelete.title}"?`)) {
      const updatedCourses = data.courses.filter(c => c.id !== id);
      updateSection("courses", updatedCourses);
      toast.success("🗑️ Book removed successfully");
    }
  };

  return (
    <main className="relative min-h-screen bg-white">
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

      <BooksHero
        program={programData}
        editMode={editMode}
        onUpdate={updateProgramInfo}
      />

      <BooksFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        genre={genre}
        onGenreChange={setGenre}
        format={format}
        onFormatChange={setFormat}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <BooksGrid
        books={editMode ? data.courses.filter(c => c.programSlug === categorySlug) : filteredBooks}
        editMode={editMode}
        onUpdateCourse={handleUpdateBook}
        onDeleteCourse={handleDeleteBook}
        onAddCourse={handleAddBook}
      />

      <Learning
        data={data.learning}
        editMode={editMode}
        onUpdate={(updatedInfo: any) => {
          updateSection("learning", { ...data.learning, ...updatedInfo });
        }}
      />
    </main>
  );
}