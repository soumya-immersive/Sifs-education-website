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

export default function TrainingProgramPage({ params: paramsPromise }: { params: Promise<{ program: string }> }) {
  const params = React.use(paramsPromise);
  const { program } = params;

  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  } = useDynamicPageData("training");

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

  // 1. Filter items for this program
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
        toast.success("✅ Training saved successfully");
      } else {
        toast.error("❌ Failed to save training");
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
    setSearchQuery("");
    setLevel("");
    setDuration("");

    const newItem = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      programSlug: program,
      slug: `new-training-${Date.now()}`,
      title: "New Training Title",
      courseCode: "TR-XXX",
      overview: "New training overview description here...",
      description: "Full description comes here.",
      descriptionParts: ["First paragraph of the new training description."],
      rating: 5.0,
      reviewsCount: 0,
      image: "/training/training.png",
      bannerImage: "/training/hero-bg.png",
      skillLevel: "level1",
      durationHours: 10,
      createdAt: new Date().toISOString(),
      aboutTitle: "About this Training",
      aboutSubtitle: "Information & Overview",
      editionLabel: "2025 Edition",
      programLabel: "Training Program",
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Duration", value: "2 Days", icon: "/course/icon4.png" },
          { label: "Access", value: "Lifetime", icon: "/course/icon2.png" }
        ],
        instructors: [
          { name: "Senior Analyst", role: "Specialist Trainer", image: "/course/ins2.png" }
        ]
      },
      highlights: [
        "In-depth forensic training",
        "Practical field scenarios",
        "Expert-led workshops"
      ],
      accordionItems: [
        { title: "Training Agenda", content: "Topics covered in the program." }
      ],
      paymentDetails: {
        paypal: "",
        bankName: "ICICI BANK",
        accountName: "SIFS INDIA PVT. LTD.",
        accountNo: "663055000006",
        type: "Current Account",
        ifsc: "ICIC0000160",
        qrImage: "/course/qr.png"
      }
    };
    updateSection("courses", [...data.courses, newItem]);
    toast.success("✨ New training added!");
  };

  const handleUpdateCourse = (id: number, updatedInfo: any) => {
    const updatedCourses = data.courses.map(c =>
      c.id === id ? { ...c, ...updatedInfo } : c
    );
    updateSection("courses", updatedCourses);
  };

  const handleDeleteCourse = (id: number) => {
    const itemToDelete = data.courses.find(c => c.id === id);
    if (!itemToDelete) return;

    if (confirm(`Are you sure you want to delete "${itemToDelete.title}"?`)) {
      const updatedCourses = data.courses.filter(c => c.id !== id);
      updateSection("courses", updatedCourses);
      toast.success("🗑️ Training removed successfully");
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
        realm="training"
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
