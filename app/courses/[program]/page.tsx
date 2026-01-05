"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Edit, Save } from "lucide-react";

import CoursesHero from "../../../components/courses/CoursesHero";
import CoursesFilterBar from "../../../components/courses/CoursesFilterBar";
import CoursesGrid from "../../../components/courses/CoursesGrid";
import Learning from "../../../components/courses/Learning";

import { useDynamicPageData } from "../../../hooks/useDynamicPageData";

export default function CoursesPage({ params: paramsPromise }: { params: Promise<{ program: string }> }) {
  const params = React.use(paramsPromise);
  const { program } = params;

  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  } = useDynamicPageData("courses");

  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Validate program
  const programData = data.programs.find(
    (p) => p.slug === program
  );

  if (!programData) notFound();

  // 1. Filter courses for this program
  let filteredCourses = data.courses.filter(
    (course) => course.programSlug === program
  );

  // 2. Apply Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredCourses = filteredCourses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.courseCode.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q)
    );
  }

  // 3. Apply Level Filter
  if (level) {
    filteredCourses = filteredCourses.filter(c => c.skillLevel === level);
  }

  // 4. Apply Duration Filter
  if (duration) {
    const minHours = parseInt(duration);
    filteredCourses = filteredCourses.filter(c => (c.durationHours || 0) >= minHours);
  }

  // 5. Apply Sort - ONLY if not in editMode
  if (!editMode) {
    filteredCourses.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      } else {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
    });
  }

  const handleEditClick = () => {
    setIsEditLoading(true);
    // Reset filters to show all courses for management
    setSearchQuery("");
    setLevel("");
    setDuration("");
    setEditMode(true);
    setIsEditLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Programs saved successfully");
      } else {
        toast.error("❌ Failed to save programs");
      }
      setIsSaving(false);
    }, 800);
  };

  const updateProgramInfo = (updatedInfo: any) => {
    const updatedPrograms = data.programs.map(p =>
      p.slug === program ? { ...p, ...updatedInfo } : p
    );
    updateSection("programs", updatedPrograms);
  };

  const handleAddCourse = () => {
    // Reset filters to ensure the new course is visible
    setSearchQuery("");
    setLevel("");
    setDuration("");

    const newCourse = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      programSlug: program,
      slug: `new-course-${Date.now()}`,
      title: "New Course Title",
      courseCode: "FSP XXX",
      overview: "New course overview description here...",
      description: "Full description comes here.",
      descriptionParts: ["First paragraph of the new course description."],
      rating: 5.0,
      reviewsCount: 0,
      image: "/courses/course1.png",
      bannerImage: "/course/hero-bg.png",
      skillLevel: "level1",
      durationHours: 10,
      createdAt: new Date().toISOString(),
      aboutTitle: "About this Course",
      aboutSubtitle: "Information & Overview",
      editionLabel: "2025 Edition",
      programLabel: "Professional Program",
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Price", value: "$0.00", icon: "/course/icon1.png", highlight: true },
          { label: "Duration", value: "0 Hours", icon: "/course/icon4.png" },
          { label: "Access", value: "Lifetime", icon: "/course/icon2.png" },
          { label: "Certificate", value: "Available", icon: "/course/icon3.png" }
        ],
        instructors: [
          { name: "Expert Instructor", role: "Subject Specialist", image: "/course/ins1.png" }
        ]
      },
      highlights: [
        "Comprehensive industry-standard training",
        "Practical hands-on learning modules",
        "Expert-led interactive sessions",
        "Professional certification upon completion"
      ],
      accordionItems: [
        { title: "Module 1: Introduction", content: "Basics and historical context of the subject matter." },
        { title: "Module 2: Advanced Techniques", content: "In-depth exploration of core methodologies and practical applications." }
      ],
      paymentDetails: {
        paypal: "",
        bankName: "",
        accountName: "",
        accountNo: "",
        type: "",
        ifsc: "",
        qrImage: "/course/qr.png"
      }
    };
    updateSection("courses", [...data.courses, newCourse]);
    toast.success("✨ New course added!");
  };

  const handleUpdateCourse = (id: number, updatedInfo: any) => {
    const updatedCourses = data.courses.map(c =>
      c.id === id ? { ...c, ...updatedInfo } : c
    );
    updateSection("courses", updatedCourses);
  };

  const handleDeleteCourse = (id: number) => {
    const courseToDelete = data.courses.find(c => c.id === id);
    if (!courseToDelete) return;

    if (confirm(`Are you sure you want to delete "${courseToDelete.title}"?`)) {
      const updatedCourses = data.courses.filter(c => c.id !== id);
      updateSection("courses", updatedCourses);
      toast.success("🗑️ Course removed successfully");
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F7F9FC]">
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

      <CoursesHero
        program={programData}
        editMode={editMode}
        onUpdate={updateProgramInfo}
      />

      <CoursesFilterBar
        editMode={editMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        level={level}
        onLevelChange={setLevel}
        duration={duration}
        onDurationChange={setDuration}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <CoursesGrid
        courses={editMode ? data.courses.filter(c => c.programSlug === program) : filteredCourses}
        editMode={editMode}
        onUpdateCourse={handleUpdateCourse}
        onDeleteCourse={handleDeleteCourse}
        onAddCourse={handleAddCourse}
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
