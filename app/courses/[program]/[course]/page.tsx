"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Edit, Save } from "lucide-react";

import CourseHero from "../../../../components/course/CourseHero";
import CourseSidebar from "../../../../components/course/CourseSidebar";
import CourseInfo from "../../../../components/course/CourseInfo";
import CourseHighlights from "../../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../../components/course/EnquiriesSection";

import { useDynamicPageData } from "../../../../hooks/useDynamicPageData";

interface PageProps {
  params: Promise<{
    program: string;
    course: string;
  }>;
}

export default function CourseDetailsPage({ params: paramsPromise }: PageProps) {
  const params = React.use(paramsPromise);
  const { program, course: courseSlug } = params;

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

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const courseIndex = data.courses.findIndex(
    (c) => c.programSlug === program && c.slug === courseSlug
  );

  const course = data.courses[courseIndex];

  if (!course) notFound();

  const handleEditClick = () => {
    setIsEditLoading(true);
    setEditMode(true);
    setIsEditLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Course updated successfully");
      } else {
        toast.error("❌ Failed to save course changes");
      }
      setIsSaving(false);
    }, 800);
  };

  const updateCourse = (updatedInfo: any) => {
    const updatedCourses = [...data.courses];
    updatedCourses[courseIndex] = { ...course, ...updatedInfo };
    updateSection("courses", updatedCourses);
  };

  return (
    <main className="relative bg-white min-h-screen">
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

      <CourseHero
        course={course}
        editMode={editMode}
        onUpdate={updateCourse}
      />

      <div className="max-w-7xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
        <div className="lg:col-span-2 space-y-12">
          <CourseInfo
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
          <CourseHighlights
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
          <AccordionBlocks
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
          <PaymentDetails
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
        </div>

        <div className="lg:-mt-48 relative z-20">
          <CourseSidebar
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
        </div>
      </div>

      <EnquiriesSection
        data={data.enquiries}
        editMode={editMode}
        onUpdate={(updatedInfo: any) => {
          updateSection("enquiries", { ...data.enquiries, ...updatedInfo });
        }}
      />
    </main>
  );
}